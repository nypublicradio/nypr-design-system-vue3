<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import { ref } from 'vue'
const props = defineProps({
  error: {
    default: null,
    type: String,
  },
  label: {
    default: 'Sign in with Magic Link',
    type: String,
  },
  success: {
    default:
      'Success! If you created an account with that email address, you will get an email to with a magic link to login.<br>If you created your account with Google or Apple, please log in with those options.',
    type: String,
  },
})
const client = useSupabaseClient()
const config = useRuntimeConfig()

const email = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const login = async () => {
  const { data, error } = await client.auth.signInWithOtp(
    {
      email: email.value,
    },
    {
      redirectTo: config.supabaseAuthSignInRedirectTo,
    }
  )
  if (error) {
    //console.log(error)
    errorMessage.value = props.error
      ? `${props.error}: ${error}`
      : `Sorry, there was a problem logging with your magic link. Please try again! Error message: ${error}`
  } else {
    successMessage.value = props.success
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
    <template v-if="successMessage">
      <Message class="mb-4" severity="success">
        {{ successMessage }}
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
      <Button
        class="w-full"
        :label="label"
        v-bind="{ ...$attrs }"
        aria-label="sign in with magic link button"
        type="submit"
      >
        <template #icon>
          <slot name="icon"> </slot>
        </template>
      </Button>
    </form>
  </div>
</template>
