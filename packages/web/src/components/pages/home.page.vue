<script setup>
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import Idea from '@/components/Idea.vue'

const app = useAppStore()
const user = useUserStore()

const { result, loading, error, refetch } = useQuery(gql`
  query randomIdea ($userId: String, $category: String, $subcategory: String) {
    randomIdea (data: { userId: $userId, category: $category, subcategory: $subcategory }) {
        id
        text
        category
        subcategory
        userInput
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
  }`, () => ({
    userId: user.userId,
    category: user.categoryFilter[0],
    subcategory: user.categoryFilter[1],
}))

// const AUTO_FETCH_SECONDS = 15
// let autoFetch = setInterval(refetch, AUTO_FETCH_SECONDS * 1000)
const next = () => {
    // Reset interval so we dont catch an early refetch
    // clearInterval(autoFetch)
    refetch ()
    // Re-setup interval
    // autoFetch = setInterval(refetch, AUTO_FETCH_SECONDS * 1000)
}
</script>
<template>
    <!-- <header class="bg-white shadow-sm">
        <div class="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
            <h1 class="text-lg font-semibold leading-6 text-gray-900">👑 Top Ideas</h1>
        </div>
    </header> -->
    <main>
        <div class="mt-10 lg:mt-28">
            <div class="mx-auto max-w-3xl sm:px-6 sm:py-3 lg:px-8 lg:mt-5 text-center">
                <h1 class="font-medium text-3xl dark:text-slate-100">Explore <span class="dark:text-indigo-500">{{ (app.stats?.totalCount)?.toLocaleString() }}</span> AI generated digital product ideas.</h1>
                <!-- <p class="px-4 dark:text-slate-300/60 ml-1 text-lg">Brainstorm new product ideas 24/7 with AI. {{ (app.stats?.todayCount)?.toLocaleString() }} added today</p> -->
            </div>
            <div class="m-auto max-w-lg py-6 px-4 sm:px-6 lg:px-8 lg:mt-5">
                <!-- <CategoryFilter></CategoryFilter> -->

                <p v-if="error">Something went wrong...</p>
                <p v-if="loading && !result">Loading...</p>
                <p v-else-if="result?.randomIdea == null">No ideas here yet!</p>
                <div v-else>
                    <Idea :idea="result?.randomIdea" @vote="next()" />

                    <!-- <a @click.prevent="refetch()" href="#" class="p-2">shuffle</a> -->
                </div>
            </div>
        </div>
    </main>

</template>