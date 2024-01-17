<script setup>
import { Browser } from "@capacitor/browser"
import Button from "primevue/button"
import Message from "primevue/message"
import { ref } from "vue"

const errorMessage = ref("")

const props = defineProps({
  client: {
    default: null,
    type: Object,
  },
  config: {
    default: null,
    type: Object,
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
  redirectUrl: {
    default: "http://localhost:3000",
    type: String,
  },
})
const innerClient = ref(props.client)
const innerConfig = ref(props.config)

// fallback incase the parent component doesn't pass in the client and config
if (!props.client && !props.config) {
  innerClient.value = useSupabaseClient()
  innerConfig.value = useRuntimeConfig()
}

const emit = defineEmits(["submit-click", "submit-error", "submit-success"])
// method triggered by the form submit to handle supabase login logic
const login = async () => {
  emit("submit-click")
  const res = await innerClient.value.auth.signInWithOAuth({
    options: {
      redirectTo: props.redirectUrl,
    },
    provider: props.provider,
  })
  if (res.error) {
    emit("submit-error", res.error)
    errorMessage.value = res.error
  } else {
    emit("submit-success")
  }
}
// capitalise the first letter of a string
const capFirstChar = (str) => {
  return str[0].toUpperCase() + str.slice(1)
}
</script>

<template>
  <div>
    <template v-if="errorMessage">
      <Message class="mb-4" severity="error" :closable="false">
        Sorry, there was a problem logging in to your
        {{ capFirstChar(props.provider) }} account:
        {{ errorMessage }}
      </Message>
    </template>
    <Button
      class="w-full"
      :label="props.label ?? `Log in with ${capFirstChar(props.provider)}`"
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
