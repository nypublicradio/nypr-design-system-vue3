<script setup>
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, minLength, required } from '@vuelidate/validators'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import { computed, reactive, ref } from 'vue'

const props = defineProps({
  currentEmail: {
    default: null,
    type: String,
  },
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

const formData = reactive({
  email: props.currentEmail ?? '',
  password: '',
})

const sbErrorMsg = ref('')

const rules = computed(() => {
  return {
    email: {
      email: helpers.withMessage('Invalid email format', email),
      required: helpers.withMessage('The email field is required', required),
    },
    password: {
      minLength: minLength(8),
      required: helpers.withMessage('The password field is required', required),
    },
  }
})

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  // clear the error message so the message re-animates on each submit
  sbErrorMsg.value = ''
  emit('submit-click')
  v$.value.$validate()
  if (!v$.value.$error) {
    //success with Vuelidate
    const sbError = await client.auth.signInWithPassword(
      { email: formData.email, password: formData.password },
      { redirectTo: config.supabaseAuthSignInRedirectTo }
    )
    if (!sbError.error) {
      //success with Supabase
      emit('submit-success', props.slug)
      navigateTo(`${props.slug}`)
    } else {
      // error with Supabase
      emit('submit-error', sbError?.error?.message)
      if (sbError?.error?.message?.includes('Invalid login credentials')) {
        sbErrorMsg.value = props.error
      } else {
        sbErrorMsg.value = sbError?.error?.message
      }
    }
  }
}
</script>

<template>
  <div>
    <form v-if="formData" novalidate @submit.prevent="submitForm">
      <template v-if="sbErrorMsg">
        <Message class="mb-4" severity="error">
          <span v-html="sbErrorMsg"></span>
        </Message>
      </template>
      <div class="mb-2">
        <InputText
          v-model="formData.email"
          type="text"
          name="email"
          class="w-full"
          :class="{ 'p-invalid': v$.email.$error && v$.email.$invalid }"
          placeholder="Your email"
          required
          @update="v$.email.$touch"
        />
        <small class="p-error">
          <span v-for="err of v$.email.$errors" :key="err.$uid">
            {{ err.$message }}
          </span>
        </small>
      </div>
      <div class="mb-2">
        <InputText
          v-model="formData.password"
          type="password"
          class="w-full"
          :class="{ 'p-invalid': v$.password.$error && v$.password.$invalid }"
          placeholder="Your password"
          required
          :autofocus="props.currentEmail"
          @update="v$.password.$touch"
        />
        <small class="p-error">
          <span v-for="err of v$.password.$errors" :key="err.$uid">
            {{ err.$message }}
          </span>
        </small>
      </div>
      <Button
        :label="props.label"
        v-bind="{ ...$attrs }"
        class="w-full"
        :aria-label="`${props.label} button`"
        type="submit"
      >
        <template #icon> <slot name="icon"></slot> </template>
      </Button>
    </form>
  </div>
</template>
