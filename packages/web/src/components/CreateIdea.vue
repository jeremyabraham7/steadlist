<script setup>
import { reactive, markRaw, computed } from 'vue'
import { useUserStore } from '@/stores/user'

import gql from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'

import { Categories } from '@/data/categories__topics-rev1.js'
import { randomArray } from '@/lib/utils'
import { string, array } from 'yup'

// Components
import { Field, Form, ErrorMessage } from 'vee-validate'

const user = useUserStore()
const emit = defineEmits(['ideas'])

// Computed loading state
const loadingState = computed(() => (state.loading || loading))
const state = reactive({
    topic: '',
    categories: [],

    ideas: [],
    loading: false,
})
const cats = markRaw(Categories.map(cat => {
    cat.children = cat.subcats
    return cat
}))

// Filtering category selector
const filterMethod = (node, keyword) => {
    // baseline text to lowercase
    const check = (text, search) => text.toLowerCase().includes(search.toLowerCase())

    // Basic check
    if (check(node.text, keyword)) return true

    // Looser check -- check words individualy
    return keyword.trim().split(' ').some(t => check(node.text, t))

}

const examplePrompts = [
    'tiktok ads for ecommerce brands',
    'coral reef photography for beginner divers',
    'protein crepe recipes for vegans',
    'building a gaming computer',
    'competitive ultimate frisbee',
    'at home chocolate making',
    'creative activities for toddlers'
]

const createIdea = async () => {
    // Make sure user is setup prior to creating ideas
    state.loading = true
    await user.setup()

    // Run mutation
    runIdeaCreate({
        userId: user.userId,
        topic: state.topic,
        category: state.categories[0],
        subcategory: state.categories[1]
    })
    state.loading = false
}

const { mutate: runIdeaCreate, loading, error, onDone } = useMutation(gql`
    mutation createIdea ($userId: String!, $topic: String!, $category: String!, $subcategory: String!) {
        createIdea (data: { userId: $userId, topic: $topic, category: $category, subcategory: $subcategory }) {
        items {
            id
            text
            category
            subcategory
            modality
        }
        }
    }
`)

// When mutation done, emit data
onDone(result => emit('ideas', result.data?.createIdea?.items || []))

// Validations
const schema = {
    topic: string().required().min(5).max(100),
    category: array().required().min(1)
}
</script>
<template>
    <Form :validation-schema="schema" v-slot="{ handleSubmit }">
        <div class="grid grid-cols-1 gap-4">
            <div>
                <label for="topic" class="sr-only">Topic</label>
                <Field v-model="state.topic" type="text" name="topic" id="topic"
                    class="block w-full rounded-md p-3 dark:bg-slate-700 border-gray-300 dark:border-slate-700 shadow-sm sm:text-sm"
                    :placeholder="randomArray(examplePrompts)" />
                <ErrorMessage class="field-error" name="topic" />
            </div>

            <div>
                <Field v-model="state.categories" name="category" v-slot="{ handleChange, handleBlur, value }">
                    <el-cascader :model-value="value" @change="handleChange" @blur="handleBlur" :options="cats" placeholder="Select category" filterable
                        :filter-method="filterMethod" />
                </Field>
                <ErrorMessage class="field-error" name="category" />
            </div>
            <div>
                <!-- IDEA: Tags for more refinement? -->
                <button @click.prevent="handleSubmit($event, createIdea)" type="submit" :disabled="loadingState.value"
                    :class="{ 'opacity-50' : loadingState.value }"
                    class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <template v-if="loadingState.value">Brainstorming...</template>
                    <template v-else>Create Ideas</template>
                </button>
            </div>
        </div>
    </Form>
</template>