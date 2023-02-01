import { ref } from 'vue'
import { defineStore } from 'pinia'
import cookies from 'js-cookie'
import { apolloClient } from '@/plugins/apollo'
import gql from 'graphql-tag'

export const useUserStore = defineStore('user', () => {
    const userId = ref(cookies.get('upsellai_uid'))
    const categoryFilter = ref([])

    const setup = async () => {
        console.info('[INFO] ', 'User Setup')
        if (!userId.value) {
            let res = await generate()
            console.log(res.data.generateUser.id)
            userId.value = res.data.generateUser.id
        }
        cookies.set('upsellai_uid', userId.value, { expires: 700, path: '' })
        console.info('[INFO] ', 'User: ', userId.value)
        return userId.value
    }

    const generate = async () => {
        return await apolloClient.mutate({
            mutation: gql`
              mutation generateUser {
                generateUser (data: {}) { id }
              }`
        })
    }
    // Run context setup
    // setupUserContext()

    return { userId, categoryFilter, setup }
})
