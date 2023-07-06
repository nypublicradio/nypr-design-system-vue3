<script setup>
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
import { ref } from 'vue'

const props = defineProps({
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
  confirmPassword: null,
  email: '',
  password: '',
})

const sbErrorMsg = ref('')

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

const submitForm = async () => {
  emit('submit-click')
  v$.value.$validate()
  const sbError = await client.auth.signInWithPassword(
    { email: formData.email, password: formData.password },
    { redirectTo: config.supabaseAuthSignInRedirectTo }
  )
  if (!v$.value.$error && !sbError.error) {
    //    Some code
    emit('submit-success', props.slug)
    navigateTo(`${props.slug}`)
  } else {
    emit('submit-error', sbError?.error?.message)
    if (sbError?.error?.message?.includes('Invalid login credentials')) {
      sbErrorMsg.value = sbError?.error?.message
    } else {
      sbErrorMsg.value = sbError?.error?.message
    }
  }
}

// const email = ref('')
// const password = ref('')
// const errorMsg = ref('')

// const login = async () => {
//   emit('submit-click')
//   const error = await client.auth.signInWithPassword(
//     { email: email.value, password: password.value },
//     { redirectTo: config.supabaseAuthSignInRedirectTo }
//   )
//   if (error.error) {
//     //console.log(error)
//     emit('submit-error', error)
//     if (error?.error?.message?.includes('Invalid login credentials')) {
//       errorMsg.value = error
//     } else {
//       errorMsg.value = error
//     }
//   } else {
//     emit('submit-success', props.slug)
//     navigateTo(`${props.slug}`)
//   }
// }
</script>

<template>
  <!--   <div>
    <template v-if="errorMsg">
      <Message class="mb-4" severity="error">
        Sorry, there was a problem logging in to your account:
        {{ errorMsg }}
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
      <InputText
        v-model="password"
        type="password"
        class="w-full mb-2"
        placeholder="Your password"
        required
      />
      <Button :label="props.label" class="w-full" type="submit">
        <template #icon> <slot name="icon"></slot> </template>
      </Button>
    </form>
  </div> -->
  <div>
    <form novalidate @submit.prevent="submitForm">
      <template v-if="sbErrorMsg">
        <Message class="mb-4" severity="error">
          Sorry, there was a problem logging in to your account:
          {{ sbErrorMsg }}
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
      <Button :label="props.label" class="w-full" type="submit">
        <template #icon> <slot name="icon"></slot> </template>
      </Button>
    </form>
  </div>
</template>
