<script setup>
import { reactive } from 'vue'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import Idea from '@/components/Idea.vue'

const app = useAppStore()
const user = useUserStore()
const queryVars = reactive({
    userId: user.userId,
    orderBy: 'new',
})

const { result, loading, error } = useQuery(gql`
  query Ideas ($userId: String, $orderBy: String) {
    ideas (userId: $userId, orderBy: $orderBy) {
      items {
        id
        text
        userInput
        category
        subcategory
        lulvotes
        upvotes
        downvotes
        net_votes
        total_votes
        user_vote {
          id
          type
        }
      }
    }
  }`, queryVars)
</script>
<template>
  <PageHeader>
    <template #title>
      <div class="flex">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900 dark:text-gray-200 flex-grow">
          👶 New Ideas
          <span v-if="app.stats?.todayCount" class="text-sm align-middle dark:text-slate-300/60 ml-1">
            {{ (app.stats?.todayCount)?.toLocaleString() }} today
          </span>
        </h1>
        <div class=" py-2"></div>
      </div>
    </template>
  </PageHeader>
  <main class="px-4">
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <p v-if="error">Something went wrong...</p>
      <p v-if="loading">Loading...</p>
      <div v-else class="grid md:grid-cols-3 gap-5">
        <div v-for="idea in result?.ideas?.items" :key="idea.id">
          <Idea :idea="idea" />
        </div>
      </div>
    </div>

    <!-- <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <p v-if="error">Something went wrong...</p>
      <p v-if="loading">Loading...</p>
      <div v-else class="grid md:grid-cols-3 gap-5">
        <div v-for="idea in result?.ideas?.items" :key="idea.id">
          <Idea :idea="idea" />
        </div>
      </div>
    </div> -->
  </main>

</template>