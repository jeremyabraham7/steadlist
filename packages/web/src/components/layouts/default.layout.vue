<script setup>
import { RouterLink } from 'vue-router'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { randomArray } from '@/lib/utils'


// const user = {
//     name: 'Tom Cook',
//     email: 'tom@example.com',
//     imageUrl:
//         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }
const aiMessage = randomArray([
    "No humans were injured in the creation of these ideas.",
    "Save your organic brainpower and get new product ideas 24/7 with AI.",
    "Get back to Taco Tuesday, I got this...",
    "I'm an AI and I approve these ideas.",
    "I'm sorry, did you want to come up with an idea or shall I?",
    "I'm not just a pretty face, I have pretty good ideas too.",
    "You're welcome, humanity.",
    "With me on your side, you'll be swimming in new product ideas in no time.",
    "Let the me do all the work so you can take all the credit.",
])

const navigation = [
    { name: '✨ Shuffle', href: '/' },
    { name: '👑 Top', href: '/top' },
    { name: '👶 New', href: '/new' },
    // { name: '⚡️ Create', href: '/create' },
    
    // { name: 'Team', href: '#', current: false },
    // { name: 'Projects', href: '#', current: false },
    // { name: 'Calendar', href: '#', current: false },
    // { name: 'Reports', href: '#', current: false },
]
// const userNavigation = [
//     { name: 'Your Profile', href: '#' },
//     { name: 'Settings', href: '#' },
//     { name: 'Sign out', href: '#' },
// ]

const toggleDarkMode = () => {
    const el = document.querySelector('html')
    el.classList.toggle('dark')
}
</script>
<template>
    <!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-gray-100">
      <body class="h-full">
      ```
    -->
    <div class="min-h-full">
        <Disclosure ref="menu" as="nav" class="bg-gray-800 dark:bg-gray-800" v-slot="{ open, close }">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <RouterLink to="/">
                                <div class="logo relative">
                                    <span class=" text-white font-bold px-2 py-1 dark:bg-indigo-600 transform duration-200 dark:hover:bg-indigo-800 rounded-lg">P</span>
                                    <span class="absolute font-bold dark:bg-slate-900 dark:text-indigo-100 rounded-full px-1" style="font-size: 8px; top:-4px; right:-8px;">AI</span>
                                </div>
                                <!-- <img class="h-8 w-8"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                    alt="UpsellAI" /> -->
                            </RouterLink>
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <RouterLink v-for="item in navigation" :key="item.name" :to="item.href"
                                    :class="[item.href == $route.path ? 'bg-gray-900 dark:bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-900 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']"
                                    :aria-current="item.href == $route.path ? 'page' : undefined">{{ item.name }}
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <!-- <Toggle @change="toggleDarkMode()">
                                <template #activeIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-3 h-3">
                                        <path fill-rule="evenodd"
                                            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </template>
                                <template #inactiveIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-3 h-3 text-yellow-300">
                                        <path
                                            d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                                    </svg>
                                </template>
                            </Toggle> -->

                            <!-- <button type="button"
                                class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span class="sr-only">View notifications</span>
                                <BellIcon class="h-6 w-6" aria-hidden="true" />
                            </button>


                            <Menu as="div" class="relative ml-3">
                                <div>
                                    <MenuButton
                                        class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span class="sr-only">Open user menu</span>
                                        <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
                                    </MenuButton>
                                </div>
                                <transition enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems
                                        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                                        <a :href="item.href"
                                            :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{
                                            item.name }}</a>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu> -->
                        </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <!-- Mobile menu button -->
                        <DisclosureButton
                            class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel class="md:hidden">
                <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                    <RouterLink v-for="item in navigation" :key="item.name" :to="item.href" @click="close()"
                        :class="[item.href == $route.path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']"
                        :aria-current="item.href == $route.path ? 'page' : undefined">{{ item.name }}</RouterLink>
                </div>
                <!-- <div class="border-t border-gray-700 pt-4 pb-3">
                    <div class="flex items-center px-5">
                        <div class="flex-shrink-0">
                            <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
                        </div>
                        <div class="ml-3">
                            <div class="text-base font-medium text-white">{{ user.name }}</div>
                            <div class="text-sm font-medium text-gray-400">{{ user.email }}</div>
                        </div>
                        <button type="button"
                            class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span class="sr-only">View notifications</span>
                            <BellIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div class="mt-3 space-y-1 px-2">
                        <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" :href="item.href"
                            class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                            {{ item.name }}</DisclosureButton>
                    </div>
                </div> -->
            </DisclosurePanel>
        </Disclosure>

        <slot />
    </div>
    <footer class="mt-32 hidden">
        <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
            <div class="flex justify-center space-x-6 md:order-2">
                <!-- <a v-for="item in navigation" :key="item.name" :href="item.href"
                    class="text-gray-400 hover:text-gray-500">
                    <span class="sr-only">{{ item.name }}</span>
                    <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                </a> -->
            </div>
            <div class="mt-8 md:order-1 md:mt-0">
                <p class="text-center text-base text-gray-700">{{ aiMessage }}</p>
            </div>
        </div>
    </footer>
</template>
