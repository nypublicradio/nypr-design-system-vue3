<script setup>
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, required } from '@vuelidate/validators'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import { computed, reactive, ref } from 'vue'
const props = defineProps({
  client: {
    default: null,
    type: Object,
  },
  config: {
    default: null,
    type: Object,
  },
  error: {
    default:
      'Sorry, there was a problem creating your magic link. Please try again! Error message:',
    type: String,
  },
  label: {
    default: 'Send magic link',
    type: String,
  },
  success: {
    default:
      'Success! If you created an account with that email address, you will get an email to with a magic link to login.<br>If you created your account with Google or Apple, please log in with those options.',
    type: String,
  },
})

const emit = defineEmits(['submit-click', 'submit-error', 'submit-success'])

const innerClient = ref(props.client)
const innerConfig = ref(props.config)

// fallback incase the parent component doesn't pass in the client and config
if (!props.client && !props.config) {
  innerClient.value = useSupabaseClient()
  innerConfig.value = useRuntimeConfig()
}

const formData = reactive({
  email: '',
  password: '',
})

const sbErrorMsg = ref('')
const sbSuccessMsg = ref('')

const rules = computed(() => {
  return {
    email: {
      email: helpers.withMessage('Invalid email format', email),
      required: helpers.withMessage('The email field is required', required),
    },
  }
})

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  // clear the error & success message so the message re-animates on each submit
  sbErrorMsg.value = ''
  sbSuccessMsg.value = ''
  emit('submit-click')
  v$.value.$validate()
  if (!v$.value.$error) {
    //success with Vuelidate
    const sbError = await innerClient.value.auth.signInWithOtp(
      { email: formData.email },
      { redirectTo: innerConfig.value.supabaseAuthSignInRedirectTo }
    )
    if (!sbError.error) {
      //success with Supabase
      emit('submit-success')
      sbSuccessMsg.value = props.success
    } else {
      // error with Supabase
      emit('submit-error', sbError?.error?.message)
      sbErrorMsg.value = `${props.error} ${sbError?.error?.message}`
    }
  }
}
</script>

<template>
  <div>
    <template v-if="sbErrorMsg">
      <Message class="mb-4" severity="error" :closable="false">
        <span v-html="sbErrorMsg"></span>
      </Message>
    </template>
    <template v-if="sbSuccessMsg">
      <Message class="mb-4" severity="success" :closable="false">
        <span v-html="sbSuccessMsg"></span>
      </Message>
    </template>
    <form
      v-if="formData && !sbSuccessMsg"
      novalidate
      @submit.prevent="submitForm"
    >
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
            {{ err.$message }} <br />
          </span>
        </small>
      </div>
      <Button
        class="w-full"
        :label="props.label"
        v-bind="{ ...$attrs }"
        :aria-label="`${props.label} button`"
        type="submit"
      >
        <template #icon>
          <slot name="icon"></slot>
        </template>
      </Button>
    </form>
  </div>
</template>
