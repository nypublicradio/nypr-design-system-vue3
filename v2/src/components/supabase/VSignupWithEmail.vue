<script setup>
import VLoginWithEmail from '~/v2/src/components/supabase/VLoginWithEmail.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import { ref } from 'vue'

const props = defineProps({
  error: {
    default:
      'Sorry, there was a problem creating this account. Please try signing up again! Error message:',
    type: String,
  },
  errorAlreadyRegistered: {
    default:
      'Looks like you already have an account! If you do not remember your password, you can retrieve it by clicking the "Forgot Password" link below.',
    type: String,
  },
  label: {
    default: 'Create Account With Email & Password',
    type: String,
  },
  slug: {
    default: 'dashboard',
    type: String,
  },
  success: {
    default: 'Success! You may now sign in now with your email and password.',
    type: String,
  },
})

const emit = defineEmits(['submit-click', 'submit-error', 'submit-success'])

const client = useSupabaseClient()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const login = async () => {
  emit('submit-click')
  clearError(0)
  const { error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  })
  successMessage.value = props.success
  if (error) {
    //console.log(error)
    emit('submit-error', error)
    if (error.toString().includes('already registered')) {
      errorMessage.value = props.errorAlreadyRegistered
    } else {
      errorMessage.value = `${props.error} ${error}`
    }
  } else {
    emit('submit-success')
    successMessage.value = props.success
  }
}

const clearError = (delay = 500) => {
  setTimeout(() => {
    errorMessage.value = ''
  }, delay)
}
</script>

<template>
  <div>
    <template v-if="errorMessage">
      <Message class="mb-4" severity="error" @close="clearError()">
        {{ errorMessage }}
      </Message>
    </template>

    <Transition name="fade" mode="out-in">
      <div v-if="successMessage" key="1">
        <div>
          <Message class="mb-4" severity="success">
            {{ successMessage }}
          </Message>
          <slot name="success">
            <VLoginWithEmail :slug="props.slug" />
          </slot>
        </div>
      </div>
      <div v-else key="2">
        <form @submit.prevent="login">
          <InputText
            v-model="email"
            class="w-full mb-2"
            type="email"
            placeholder="Your email"
            required
          />
          <InputText
            v-model="password"
            class="w-full mb-2"
            type="password"
            placeholder="Your password"
            required
          />
          <Button :label="props.label" class="w-full" type="submit">
            <template #icon> <slot name="icon"></slot> </template>
          </Button>
        </form>
      </div>
    </Transition>
  </div>
</template>
