<script setup>
import { useVuelidate } from "@vuelidate/core"
import { email, helpers, minLength, required } from "@vuelidate/validators"
import Button from "primevue/button"
import InputText from "primevue/inputtext"
import Message from "primevue/message"
import Password from "primevue/password"
import { computed, reactive, ref } from "vue"
import { useRouter } from "vue-router"

const props = defineProps({
  client: {
    default: null,
    type: Object,
  },
  config: {
    default: null,
    type: Object,
  },
  currentEmail: {
    default: null,
    type: String,
  },
  error: {
    default: "There was an error logging in",
    type: String,
  },
  label: {
    default: "Log in with email",
    type: String,
  },
  slug: {
    default: "/confirm",
    type: String,
  },
})
const emit = defineEmits(["submit-click", "submit-error", "submit-success"])

const router = useRouter()
const innerClient = ref(props.client)
const innerConfig = ref(props.config)

// fallback incase the parent component doesn't pass in the client and config
if (!props.client && !props.config) {
  innerClient.value = useSupabaseClient()
  innerConfig.value = useRuntimeConfig()
}

const formData = reactive({
  email: props.currentEmail ?? "",
  password: "",
})

const sbErrorMsg = ref("")

const rules = computed(() => {
  return {
    email: {
      email: helpers.withMessage("Invalid email format", email),
      required: helpers.withMessage("This field is required", required),
    },
    password: {
      minLength: minLength(8),
      required: helpers.withMessage("This field is required", required),
    },
  }
})

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  // clear the error message so the message re-animates on each submit
  sbErrorMsg.value = ""
  emit("submit-click")
  v$.value.$validate()
  if (!v$.value.$error) {
    //success with Vuelidate
    const sbError = await innerClient.value.auth.signInWithPassword(
      { email: formData.email, password: formData.password }
      //{ redirectTo: innerConfig.value.supabaseAuthSignInRedirectTo }
    )
    if (!sbError.error) {
      //success with Supabase
      emit("submit-success", props.slug)
      router.push(`${props.slug}`)
    } else {
      // error with Supabase
      emit("submit-error", sbError?.error?.message)
      if (sbError?.error?.message?.includes("Invalid login credentials")) {
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
      <div class="flex flex-column gap-2 mb-4">
        <label for="email">Email</label>
        <InputText
          v-model="formData.email"
          type="email"
          name="email"
          class="w-full"
          :class="{ 'p-invalid': v$.email.$error && v$.email.$invalid }"
          placeholder="you@email.com"
          required
          @update="v$.email.$touch"
        />
        <small class="p-error">
          <span v-for="err of v$.email.$errors" :key="err.$uid">
            {{ err.$message }} <br />
          </span>
        </small>
      </div>
      <div class="flex flex-column gap-2 mb-5">
        <label for="password">Password</label>
        <Password
          v-model="formData.password"
          type="password"
          name="password"
          class="w-full"
          :class="{ 'p-invalid': v$.password.$error && v$.password.$invalid }"
          placeholder="Enter your password"
          required
          toggle-mask
          :feedback="false"
          :autofocus="props.currentEmail"
          @update="v$.password.$touch"
        />
        <small class="p-error">
          <span v-for="err of v$.password.$errors" :key="err.$uid">
            {{ err.$message }} <br />
          </span>
        </small>
      </div>
      <template v-if="sbErrorMsg">
        <Message severity="error" :sticky="false" :closable="false">
          <span v-html="sbErrorMsg"></span>
        </Message>
      </template>
      <Button
        :label="props.label"
        v-bind="{ ...$attrs }"
        class="w-full"
        :aria-label="`${props.label} button`"
        type="submit"
      >
        <template #icon> <slot name="icon"></slot> </template>
      </Button>
      <slot name="belowSubmit"></slot>
    </form>
  </div>
</template>
