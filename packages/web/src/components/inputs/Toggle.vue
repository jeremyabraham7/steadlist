<script setup>
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ref, watch } from 'vue'
import { Switch } from '@headlessui/vue'
const emit = defineEmits(['change'])

const enabled = ref(false)
watch(enabled, val => emit('change', val))
</script>
<template>
    <Switch v-model="enabled"

        :class="[enabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
        <span class="sr-only">Use setting</span>
        <span
            :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']">
            <span
                :class="[enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']"
                aria-hidden="true">
                <span class="h-3 w-3 text-gray-400">
                    <slot name="inactiveIcon" />
                </span>
            </span>
            <span
                :class="[enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']"
                aria-hidden="true">
                <span class="h-3 w-3 text-indigo-600">
                    <slot name="activeIcon" />
                </span>
            </span>
        </span>
    </Switch>
</template>