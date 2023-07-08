<script setup>
import VLoginWithEmail from './VLoginWithEmail.vue'
import { useVuelidate } from '@vuelidate/core'
import {
  email,
  helpers,
  minLength,
  required,
  sameAs,
} from '@vuelidate/validators'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import { computed, reactive, ref } from 'vue'

const props = defineProps({
  error: {
    default: '',
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
    default: '/dashboard',
    type: String,
  },
  success: {
    default: 'Success! You may now sign in now with your email and password.',
    type: String,
  },
})

const emit = defineEmits(['submit-click', 'submit-error', 'submit-success'])

const client = useSupabaseClient()

const formData = reactive({
  confirmPassword: null,
  email: '',
  password: '',
})

const sbErrorMsg = ref('')
const sbSuccessMsg = ref('')

const rules = computed(() => {
  return {
    confirmPassword: {
      required: helpers.withMessage(
        'The password confirmation field is required',
        required
      ),
      sameAs: helpers.withMessage(
        "Passwords don't match",
        sameAs(formData.password)
      ),
    },
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
// clears out the error messages after a delay
const clearMsg = (delay = 500) => {
  setTimeout(() => {
    sbErrorMsg.value = ''
    sbSuccessMsg.value = ''
  }, delay)
}

const submitForm = async () => {
  // clear the error message so the message re-animates on each submit
  clearMsg(0)
  emit('submit-click')
  v$.value.$validate()
  if (!v$.value.$error) {
    //success with Vuelidate
    const sbError = await client.auth.signUp({
      email: formData.email,
      password: formData.password,
    })
    if (!sbError.error) {
      //success with Supabase
      emit('submit-success')
      sbSuccessMsg.value = props.success
    } else {
      // error with Supabase
      emit('submit-error', sbError?.error?.message)
      if (sbError?.error?.message.toString().includes('already registered')) {
        sbErrorMsg.value = props.errorAlreadyRegistered
      } else {
        sbErrorMsg.value = `${props.error} ${sbError?.error?.message}`
      }
    }
  }
}
</script>

<template>
  <div>
    <template v-if="sbErrorMsg && sbErrorMsg !== undefined">
      <Message class="mb-4" severity="error" @close="clearMsg()">
        <span v-html="sbErrorMsg"></span>
      </Message>
    </template>

    <Transition name="fade" mode="out-in">
      <div v-if="sbSuccessMsg" key="1">
        <div>
          <Message class="mb-4" severity="success">
            <span v-html="sbSuccessMsg"></span>
          </Message>
          <slot name="success">
            <VLoginWithEmail
              :slug="props.slug"
              :current-email="formData.email"
            />
          </slot>
        </div>
      </div>
      <div v-else key="2">
        <form v-if="formData" novalidate @submit.prevent="submitForm">
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
              :class="{
                'p-invalid': v$.password.$error && v$.password.$invalid,
              }"
              placeholder="Your password"
              required
              @update="v$.password.$touch"
            />
            <small class="p-error">
              <span v-for="err of v$.password.$errors" :key="err.$uid">
                {{ err.$message }}
              </span>
            </small>
          </div>
          <div class="mb-2">
            <InputText
              v-model="formData.confirmPassword"
              type="password"
              class="w-full"
              :class="{
                'p-invalid':
                  v$.confirmPassword.$error && v$.confirmPassword.$invalid,
              }"
              placeholder="Confirm your password"
              required
            />
            <small class="p-error">
              <span v-for="err of v$.confirmPassword.$errors" :key="err.$uid">
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
    </Transition>
  </div>
</template>
