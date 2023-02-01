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
const { mutate: register, loading, error, onDone } = useMutation(gql`
    mutation register ($userId: String, $email: String!, $password: String!) {
        register (data: { id: $userId, email: $email, password: $password }) {
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
    await user.setup()

    // Run mutation
    await register({
        userId: user.userId,
        ...data,
    })
        .finally(() => data.loading = false)
}

// Validations
const schema = {
    email: string().required().email(),
    password: string().required().min(8),
    passwordConfirm: string().required().test('passwords-match', 'passwords must match', (val) => val === data.password),
}
</script>
<template>
    <PageHeader>🌮 Register</PageHeader>
    <main class="px-4">
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-2 gap-4">
                <div>
                    <Form :validation-schema="schema" v-slot="{ handleSubmit }">
                        <div class="grid grid-cols-1 gap-4">
                            <div v-if="error" class="form-error">{{ error }}</div>
                            <div>
                                <label for="email" class="sr-only">Email</label>
                                <Field v-model="data.email" type="email" name="email" id="email"
                                    class="block w-full rounded-md p-3 dark:bg-slate-700 border-gray-300 dark:border-slate-700 shadow-sm sm:text-sm"
                                    placeholder="your email" />
                                <ErrorMessage class="field-error" name="email" />
                            </div>
                            <div>
                                <label for="password" class="sr-only">Password</label>
                                <Field v-model="data.password" type="password" name="password" id="password"
                                    class="block w-full rounded-md p-3 dark:bg-slate-700 border-gray-300 dark:border-slate-700 shadow-sm sm:text-sm"
                                    placeholder="your super secret password" />
                                <ErrorMessage class="field-error" name="password" />
                            </div>
                            <div>
                                <label for="passwordConfirm" class="sr-only">Confirm Password</label>
                                <Field v-model="data.passwordConfirm" type="password" name="passwordConfirm" id="passwordConfirm"
                                    class="block w-full rounded-md p-3 dark:bg-slate-700 border-gray-300 dark:border-slate-700 shadow-sm sm:text-sm"
                                    placeholder="your super secret password... again" />
                                <ErrorMessage class="field-error" name="passwordConfirm" />
                            </div>

                            <div>
                                <button @click.prevent="handleSubmit($event, submit)" type="submit"
                                    :disabled="data.loading" :class="{ 'opacity-50' : data.loading }"
                                    class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <template v-if="data.loading">Registering...</template>
                                    <template v-else>
                                        Register 
                                        <ArrowSmallRightIcon  class="block h-4 w-4 ml-1"></ArrowSmallRightIcon>
                                    </template>
                                </button>
                            </div>
                        </div>
                    </Form>
                    <div class="pt-8 text-sm dark:text-slate-500">
                        <RouterLink to="/login" class="inline-block mb-2">Already have an account? <b>Log in</b></RouterLink>
                    </div>
                </div>
                <div class="md:pl-7">
                    <!-- <h2 class="pb-2 font-bold">More brainpower...</h2> -->
                    <div class="feature">🔮 Create your own ideas</div>
                    <div class="feature">💾 Save your liked ideas</div>

                    <div class="feature">✉️ Subscribe to new ideas digests <span class="soon">soon</span></div>
                    <div class="feature">🔭 Idea variations explorer <span class="soon">soon</span></div>
                    <!-- <div class="feature">🎙 Content ideas<span class="soon">soon</span></div> -->
                </div>

            </div>
        </div>
    </main>
</template>
<style scoped>
    .feature {
        @apply pb-2;
    }
    .soon {
        @apply text-sm font-bold inline-block ml-1 dark:text-purple-400;
    }
</style>