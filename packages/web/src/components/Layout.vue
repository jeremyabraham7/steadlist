<template>
    <component :is="layout">
        <slot />
    </component>
</template>

<script>
import AppLayoutDefault from '@/components/layouts/default.layout.vue'
import { ref, markRaw, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
    name: 'AppLayout',
    setup() {
        const layout = ref()
        const route = useRoute()
        watch(
            () => route.meta?.layout,
            async metaLayout => {
                try {
                    const component = metaLayout && await import(`@/components/layouts/${metaLayout}.layout.vue`)
                    layout.value = markRaw(component?.default || AppLayoutDefault)
                } catch (e) {
                    layout.value = markRaw(AppLayoutDefault)
                }
            },
            { immediate: true }
        )
        return { layout }
    }
}
</script>