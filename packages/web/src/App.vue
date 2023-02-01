<script setup>
import { RouterView } from 'vue-router'
import AppLayout from '@/components/Layout.vue'
// import { useUserStore } from '@/stores/user'

// Setup user
// const user = useUserStore()
// user.setup()
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<style scoped>

</style>
