<script setup>
import { reactive } from 'vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { ArrowSmallRightIcon } from '@heroicons/vue/20/solid'
import { useUserStore } from '@/stores/user'

import gql from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'
import { string } from 'yup'

const user = useUserStore()
const data = reactive({
    email: '',
    password: '',
    passwordConfirm: '',

    loading: false,
})


// Registration Mutation
const { mutate: login, loading, error, onDone } = useMutation(gql`
        mutation login ($email: String!, $password: String!) {
            login (data: { email: $email, password: $password }) {
                user {
                    id
                    email
                    firstName
                    lastName
                    role
                }
                token
                refreshToken
            }
        }
    `)

const submit = async () => {
    // Make sure user is setup prior to creating ideas
    data.loading = true

    // Run mutation
    await login(data)
        .finally(() => data.loading = false)
}

// Validations
const schema = {
    email: string().required().email(),
    password: string().required().min(8)
}
</script>
<template>
    <!-- <PageHeader>🌮 Register</PageHeader> -->
    <main class="flex items-center justify-center md:h-[500px] lg:h-[700px]">
        <div class="w-[450px] p-5 mt-10">
            <Form :validation-schema="schema" v-slot="{ handleSubmit }">
                <div class="grid grid-cols-1 gap-4">
                    <div v-if="error" class="form-error">{{ error }}</div>
                    <div>
                        <label for="email" class="sr-only">Email</label>
                        <Field v-model="data.email" type="email" name="email" id="email"
                            class="block w-full rounded-md p-3 dark:bg-slate-700 border-gray-300 dark:border-slate-700 shadow-sm sm:text-sm"
                            placeholder="email" />
                        <ErrorMessage class="field-error" name="email" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <Field v-model="data.password" type="password" name="password" id="password"
                            class="block w-full rounded-md p-3 dark:bg-slate-700 border-gray-300 dark:border-slate-700 shadow-sm sm:text-sm"
                            placeholder="password" />
                        <ErrorMessage class="field-error" name="password" />
                    </div>
                    <div>
                        <button @click.prevent="handleSubmit($event, submit)" type="submit" :disabled="data.loading"
                            :class="{ 'opacity-50' : data.loading }"
                            class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <template v-if="data.loading">Logging In...</template>
                            <template v-else>
                                Log In
                                <ArrowSmallRightIcon class="block h-4 w-4 ml-1"></ArrowSmallRightIcon>
                            </template>
                        </button>
                    </div>
                </div>
            </Form>
            <div class="pt-8 text-sm dark:text-slate-500">
                <RouterLink to="/forgot" class="inline-block mb-2">Forgot password?</RouterLink><br>
                <RouterLink to="/register" class="inline-block mb-2">Don't have an account? <b>Register</b>
                </RouterLink>
            </div>
        </div>
    </main>
</template>
<style scoped>

</style>