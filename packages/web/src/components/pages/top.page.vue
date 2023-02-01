<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import Idea from '@/components/Idea.vue'

const user = useUserStore()
const queryVars = reactive({
    userId: user.userId,
    orderBy: 'top',
    createdAt: null
})

const { result, loading, error } = useQuery(gql`
  query Ideas ($userId: String, $orderBy: String, $createdAt: [Int!]) {
    ideas (userId: $userId, orderBy: $orderBy, createdAt: $createdAt) {
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
  }`, queryVars, { fetchPolicy: 'network-only' })
</script>
<template>
  <PageHeader>
    <template #title>
      <div class="flex gap-4">
        <div class="flex-grow">
          <h1 class="text-2xl font-semibold leading-6 text-gray-900 dark:text-gray-200">
            👑 Top Ideas
          </h1>
        </div>
        <div>
          <a href="#" @click.prevent="queryVars.createdAt = null"
            :class="[queryVars.createdAt == null ? 'bg-gray-900 dark:bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-700 hover:text-white', 'px-2 py-1 mr-1 rounded-md text-sm']">
            All
          </a>
          <a href="#" @click.prevent="queryVars.createdAt = [30,0]"
            :class="[queryVars.createdAt?.toString() == [30,0].toString() ? 'bg-gray-900 dark:bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-700 hover:text-white', 'px-2 py-1 mr-1 rounded-md text-sm']">
            Month
          </a>
          <a href="#" @click.prevent="queryVars.createdAt = [7,0]"
            :class="[queryVars.createdAt?.toString() == [7,0].toString() ? 'bg-gray-900 dark:bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-700 hover:text-white', 'px-2 py-1 mr-1 rounded-md text-sm']">
            Week
          </a>
        </div>
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