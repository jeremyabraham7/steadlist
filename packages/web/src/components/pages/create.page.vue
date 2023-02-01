<script setup>
// import { useUserStore } from '@/stores/user'
import CreateIdea from '@/components/CreateIdea.vue'
import Idea from '@/components/Idea.vue'
import { reactive } from 'vue'

const state = reactive({
    newIdeas: []
})

const updateVoteState = idea => {
    let index = state.newIdeas.findIndex(i => i.id == idea.id)
    state.newIdeas[index] = { ...state.newIdeas[index], ...idea }
}

// const user = useUserStore()
// user.setup()
</script>
<template>
    <PageHeader>✨ New Idea</PageHeader>
    <main class="px-4">
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-2 gap-4">
                <div>
                    <CreateIdea @ideas="val => state.newIdeas.unshift(...val)" />
                </div>
                <div>
                    <Idea v-for="idea in state.newIdeas" :key="idea.id" :idea="idea" @vote="idea => updateVoteState(idea)" />
                </div>
            </div>
        </div>
    </main>

</template>