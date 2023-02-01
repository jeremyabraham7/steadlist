<script setup>
import { useUserStore } from '@/stores/user'
import { Categories } from '@/data/categories__topics-rev1'
import { markRaw } from 'vue'

const user = useUserStore()
const props = defineProps({
    panel: Boolean,
})
const cats = markRaw(Categories
    .map(cat => {
        cat.children = cat.subcats
        return cat
    })
)

// Filtering category selector
const filterMethod = (node, keyword) => {
    // baseline text to lowercase
    const check = (text, search) => text.toLowerCase().includes(search.toLowerCase())

    // Basic check
    if (check(node.text, keyword)) return true

    // Looser check -- check words individualy
    return keyword.trim().split(' ').some(t => check(node.text, t))

}
</script>
<template>
    <el-cascader-panel v-if="panel" v-model="user.categoryFilter" :options="cats" filterable
        :filter-method="filterMethod" class="category-filter" />
    <el-cascader v-else v-model="user.categoryFilter" :options="cats" filterable :filter-method="filterMethod"
        class="category-filter" />
</template>