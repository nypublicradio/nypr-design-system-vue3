<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import { ref } from 'vue'

const props = defineProps({
  error: {
    default:
      'The email and password combination you entered is incorrect. Please try again!',
    type: String,
  },
  label: {
    default: 'Sign In With Email & Password',
    type: String,
  },
  slug: {
    default: '/dashboard',
    type: String,
  },
})

const emit = defineEmits(['submit-click', 'submit-error', 'submit-success'])

const client = useSupabaseClient()
const config = useRuntimeConfig()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const login = async () => {
  emit('submit-click')
  const error = await client.auth.signInWithPassword(
    { email: email.value, password: password.value },
    { redirectTo: config.supabaseAuthSignInRedirectTo }
  )
  if (error.error) {
    //console.log(error)
    emit('submit-error', error)
    if (error?.error?.message?.includes('Invalid login credentials')) {
      errorMessage.value = error
    } else {
      errorMessage.value = error
    }
  } else {
    emit('submit-success', props.slug)
    navigateTo(`${props.slug}`)
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
      <Button :label="props.label" class="w-full" type="submit">
        <template #icon> <slot name="icon"></slot> </template>
      </Button>
    </form>
  </div>
</template>
