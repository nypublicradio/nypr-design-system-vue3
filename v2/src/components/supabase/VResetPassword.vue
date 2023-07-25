<script setup>
import VFlexibleLink from '../VFlexibleLink.vue'
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, minLength, required } from '@vuelidate/validators'
import { useCurrentUser } from '~/composables/states'
import InputText from 'primevue/inputtext'

const props = defineProps({
  client: {
    default: null,
    type: Object,
  },
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

const emit = defineEmits(['submit-click', 'submit-error', 'submit-success'])

const currentUser = useCurrentUser()

const innerClient = ref(props.client)

// fallback incase the parent component doesn't pass in the client and config
if (!props.client) {
  innerClient.value = useSupabaseClient()
}

const formData = reactive({
  password: '',
})

const sbErrorMsg = ref('')
const sbSuccessMsg = ref('')

const rules = computed(() => {
  return {
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
    const sbError = await innerClient.value.auth.updateUser({
      email: currentUser.value.email,
      password: formData.password,
    })
    if (!sbError.error) {
      //success with Supabase
      emit('submit-success')
      sbSuccessMsg.value = props.success
    } else {
      // error with Supabase
      emit('submit-error', sbError?.error?.message)
      if (sbError?.error?.message?.includes('8 characters')) {
        sbErrorMsg.value = 'Password should be at least 8 characters.'
      } else {
        sbErrorMsg.value = sbError?.error?.message
      }
    }
  }
}

const pending = ref(false)
</script>

<template>
  <div>
    <form
      v-if="formData"
      novalidate
      class="password-reset"
      @submit.prevent="submitForm"
    >
      <p class="mb-2">
        Email Address: <strong>{{ currentUser?.email }}</strong>
      </p>
      <div v-if="!sbSuccessMsg">
        <div class="w-full mb-2">
          <InputText
            v-model="formData.password"
            type="password"
            class="w-full"
            :class="{
              'p-invalid': v$.password.$error && v$.password.$invalid,
            }"
            placeholder="Your password"
            required
            @update="v$.password.$touch"
          />
          <small class="p-error">
            <span v-for="err of v$.password.$errors" :key="err.$uid">
              {{ err.$message }} <br />
            </span>
          </small>
        </div>

        <Button
          :loading="pending"
          type="submit"
          v-bind="{ ...$attrs }"
          :aria-label="`${props.label} button`"
        >
          {{ props.label }}
        </Button>
      </div>
      <template v-if="sbErrorMsg">
        <Message :sticky="false" :life="5000" class="mt-4" severity="error">
          Sorry, there was an error updating your password: {{ sbErrorMsg }}
        </Message>
      </template>
      <template v-if="sbSuccessMsg">
        <Message :sticky="true" :life="5000" class="mt-4" severity="success">
          {{ sbSuccessMsg }}
        </Message>
        <p class="mb-2 text-center">
          <VFlexibleLink :to="`${props.slug}`"
            >Return to your dashboard
          </VFlexibleLink>
        </p>
      </template>
    </form>
  </div>
</template>
