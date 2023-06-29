<script setup>
import Button from 'primevue/button'
import Message from 'primevue/message'
import { defineProps, ref } from 'vue'
const client = useSupabaseClient()
const config = useRuntimeConfig()

const errorMessage = ref('')

const props = defineProps({
  error: {
    default: null,
    type: String,
  },
  label: {
    default: null,
    type: String,
  },
  provider: {
    default: null,
    required: true,
    type: String,
  },
})

const login = async () => {
  const error = await client.auth.signInWithOAuth(
    { provider: props.provider },
    { redirectTo: config.supabaseAuthSignInRedirectTo }
  )
  if (error.value) {
    console.log(error)
    errorMessage.value = props.error
      ? `${props.error}: ${error}`
      : `Sorry, there was a problem creating this account. Please try again! Error message: ${error}`
  }
}

const capFirstChar = (str) => {
  return str[0].toUpperCase() + str.slice(1)
}
</script>

<template>
  <div>
    <template v-if="errorMessage">
      <Message class="mb-4" severity="error">
        Sorry, there was a problem logging in to your
        {{ capFirstChar(props.provider) }} account:
        {{ errorMessage }}
      </Message>
    </template>
    <Button
      class="w-full"
      :label="props.label || `Sign in with ${capFirstChar(props.provider)}`"
      v-bind="{ ...$attrs }"
      :aria-label="`${props.provider} login button`"
      @click="login"
    >
      <template #icon>
        <slot name="icon">
          <i :class="`pi pi-${props.provider}`"></i>
        </slot>
      </template>
    </Button>
  </div>
</template>
