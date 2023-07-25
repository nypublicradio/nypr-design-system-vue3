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
import Password from 'primevue/password'
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

const innerClient = ref(props.client)
const innerConfig = ref(props.config)
// fallback incase the parent component doesn't pass in the client and config
if (!props.client && !props.config) {
  innerClient.value = useSupabaseClient()
  innerConfig.value = useRuntimeConfig()
}

const formData = reactive({
  confirmEmail: null,
  email: '',
  firstname: '',
  lastname: '',
  password: '',
})

const sbErrorMsg = ref('')
const sbSuccessMsg = ref('')

const hasAtleastOneNumber = helpers.withMessage(
  'Must contain at least one number',
  (value) => /\d/.test(value)
)

const rules = computed(() => {
  return {
    confirmEmail: {
      required: helpers.withMessage(
        'The email confirmation field is required ',
        required
      ),
      sameAs: helpers.withMessage(
        "Email addresses don't match",
        sameAs(formData.email)
      ),
    },
    email: {
      email: helpers.withMessage('Invalid email format', email),
      required: helpers.withMessage('The email field is required', required),
    },
    firstname: {
      required: helpers.withMessage('Please add your first name', required),
    },
    lastname: {
      required: helpers.withMessage('Please add your last name', required),
    },
    password: {
      hasAtleastOneNumber,
      minLength: minLength(8),
      required: helpers.withMessage(
        'This password field is required',
        required
      ),
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
    const sbError = await innerClient.value.auth.signUp({
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
      <Message class="mb-3" severity="warning" @close="clearMsg()">
        <span v-html="sbErrorMsg"></span>
      </Message>
    </template>

    <Transition name="fade" mode="out-in">
      <div v-if="sbSuccessMsg" key="1">
        <div>
          <Message class="mb-3" severity="success">
            <span v-html="sbSuccessMsg"></span>
          </Message>
          <slot name="success">
            <VLoginWithEmail
              :slug="props.slug"
              :current-email="formData.email"
              :client="innerClient"
              :config="innerConfig"
            />
          </slot>
        </div>
      </div>
      <div v-else key="2">
        <form v-if="formData" novalidate @submit.prevent="submitForm">
          <div class="grid mb-2">
            <div class="flex flex-column gap-2 col-6">
              <label for="first_name">First name</label>
              <InputText
                v-model="formData.firstname"
                type="text"
                name="first_name"
                class="w-full"
                :class="{
                  'p-invalid': v$.firstname.$error && v$.firstname.$invalid,
                }"
                placeholder="Your first name"
                required
                @update="v$.firstname.$touch"
              />
              <small class="p-error">
                <span v-for="err of v$.firstname.$errors" :key="err.$uid">
                  {{ err.$message }} <br />
                </span>
              </small>
            </div>
            <div class="flex flex-column gap-2 col-6">
              <label for="last_name">Last name</label>
              <InputText
                v-model="formData.lastname"
                type="text"
                name="last_name"
                class="w-full"
                :class="{
                  'p-invalid': v$.lastname.$error && v$.lastname.$invalid,
                }"
                placeholder="Your last name"
                required
                @update="v$.lastname.$touch"
              />
              <small class="p-error">
                <span v-for="err of v$.lastname.$errors" :key="err.$uid">
                  {{ err.$message }} <br />
                </span>
              </small>
            </div>
          </div>
          <div class="grid mb-2">
            <div class="flex flex-column gap-2 col-12 md:col-6">
              <label for="email">Emial</label>
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
            <div class="flex flex-column gap-2 col-12 md:col-6">
              <label for="confirm_email">Confirm email</label>
              <InputText
                v-model="formData.confirmEmail"
                type="email"
                name="confirm_email"
                class="w-full"
                :class="{
                  'p-invalid':
                    v$.confirmEmail.$error && v$.confirmEmail.$invalid,
                }"
                placeholder="Confirm your email"
                required
              />
              <small class="p-error">
                <span v-for="err of v$.confirmEmail.$errors" :key="err.$uid">
                  {{ err.$message }} <br />
                </span>
              </small>
            </div>
          </div>
          <div class="grid mb-2">
            <div class="flex flex-column gap-2 col-12 md:col-6">
              <label for="password">Password</label>
              <Password
                v-model="formData.password"
                type="password"
                name="password"
                input-style="width: 100%"
                :class="{
                  'p-invalid': v$.password.$error && v$.password.$invalid,
                }"
                placeholder="Your password"
                required
                toggle-mask
                :feedback="false"
                @update="v$.password.$touch"
              />
              <small class="p-error">
                <span v-for="err of v$.password.$errors" :key="err.$uid">
                  {{ err.$message }}<br />
                </span>
              </small>
            </div>
          </div>
          <slot name="aboveSubmit" />
          <Button
            :label="props.label"
            v-bind="{ ...$attrs }"
            class="w-full mt-3"
            :aria-label="`${props.label} button`"
            type="submit"
          >
            <template #icon> <slot name="icon"></slot> </template>
          </Button>
          <slot name="belowSubmit" />
        </form>
      </div>
    </Transition>
  </div>
</template>
