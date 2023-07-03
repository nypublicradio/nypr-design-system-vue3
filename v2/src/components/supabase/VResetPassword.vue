<script setup>
import { useCurrentUser } from '~/composables/states'
import InputText from 'primevue/inputtext'

const props = defineProps({
  error: {
    default: 'Error message:',
    type: String,
  },
  label: {
    default: 'Save New Password',
    type: String,
  },
  slug: {
    default: '/dashboard',
    type: String,
  },
  success: {
    default: 'Success! Your password has been updated.',
    type: String,
  },
})

const currentUser = useCurrentUser()

const client = useSupabaseClient()

const password = ref('')
const errorMessage = ref('')
const successMessage = ref(null)
const pending = ref(false)

const resetPassword = async () => {
  pending.value = true
  const { error } = await client.auth.updateUser({
    email: currentUser.value.email,
    password: password.value,
  })
  pending.value = false
  if (error) {
    console.log(error)
    if (error.toString().includes('8 characters')) {
      errorMessage.value = 'Password should be at least 8 characters.'
    } else {
      errorMessage.value = `${props.error} ${error}`
    }
  } else {
    successMessage.value = props.success
  }
}
</script>

<template>
  <div>
    <form class="password-reset" @submit.prevent="resetPassword">
      <p class="mb-2">
        Email Address: <strong>{{ currentUser?.email }}</strong>
      </p>
      <InputText
        v-if="!successMessage"
        v-model="password"
        type="password"
        placeholder="New Password"
        required
        class="w-4"
      />
      <Button v-if="!successMessage" :loading="pending" type="submit">
        {{ props.label }}
      </Button>
      <template v-if="errorMessage">
        <Message :sticky="false" :life="5000" class="mt-4" severity="error">
          Sorry, there was an error updating your password: {{ errorMessage }}
        </Message>
      </template>
      <template v-if="successMessage">
        <Message :sticky="true" :life="5000" class="mt-4" severity="success">
          {{ successMessage }}
        </Message>
        <p class="mb-2 text-center">
          <VFlexibleLink :to="`${props.slug}`"
            >Return to your dashboard</VFlexibleLink
          >
        </p>
      </template>
    </form>
  </div>
</template>
