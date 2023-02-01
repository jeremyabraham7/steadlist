<template>
    <header class="bg-white shadow-sm dark:bg-gray-900 dark:shadow-none">
    <div class="mx-auto max-w-7xl py-4 mt-2 px-4 sm:px-6 lg:px-8">
      <slot name="title">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900 dark:text-gray-200">
            <slot />
        </h1>
      </slot>
    </div>
  </header>
</template>