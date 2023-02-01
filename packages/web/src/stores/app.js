import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apolloClient } from '@/plugins/apollo'
import gql from 'graphql-tag'

export const useAppStore = defineStore('app', () => {
    let stats = ref()

    const fetchStats = async () => {
        const res = await apolloClient.query({
            query: gql`
              query ideaStats {
                ideaStats { totalCount todayCount }
              }`
        })
        // console.log(res.data.ideaStats)
        stats.value = res.data.ideaStats
    }

    // Get app stats
    fetchStats()

    return { stats }
})
