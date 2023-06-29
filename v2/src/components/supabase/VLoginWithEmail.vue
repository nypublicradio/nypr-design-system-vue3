<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import { ref } from 'vue'
const client = useSupabaseClient()
const config = useRuntimeConfig()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const login = async () => {
  const error = await client.auth.signInWithPassword(
    { email: email.value, password: password.value },
    { redirectTo: config.supabaseAuthSignInRedirectTo }
  )
  if (error.error) {
    console.log(error)
    if (error?.error?.message?.includes('Invalid login credentials')) {
      errorMessage.value =
        'The email and password combination you entered is incorrect. Please try again!'
    } else {
      errorMessage.value = error
    }
  } else {
    navigateTo('/dashboard')
  }
}
</script>

<template>
  <div>
    <template v-if="errorMessage">
      <Message class="mb-4" severity="error">
        Sorry, there was a problem logging in to your account:
        {{ errorMessage }}
      </Message>
    </template>
    <form @submit.prevent="login">
      <InputText
        v-model="email"
        type="email"
        class="w-full mb-2"
        placeholder="Your email"
        required
      />
      <InputText
        v-model="password"
        type="password"
        class="w-full mb-2"
        placeholder="Your password"
        required
      />
      <Button
        label="Sign In With Email & Password"
        class="w-full"
        type="submit"
      />
    </form>
  </div>
</template>