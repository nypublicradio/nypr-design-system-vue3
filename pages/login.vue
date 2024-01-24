<script setup>
import VFlexibleLink from "~/v2/src/components/VFlexibleLink.vue"
import VLoginWithEmail from "~/v2/src/components/supabase/VLoginWithEmail.vue"
import VLoginWithProvider from "~/v2/src/components/supabase/VLoginWithProvider.vue"
import { useRouter } from "vue-router"
const router = useRouter()
</script>

<template>
  <div>
    <section class="login">
      <VLoginWithProvider
        :client="useSupabaseClient()"
        :config="useRuntimeConfig()"
        provider="google"
        label="Log in with Google"
        severity="secondary"
        class="center my-3"
      />
      <VLoginWithEmail
        label="Log in"
        :client="useSupabaseClient()"
        :config="useRuntimeConfig()"
      >
        <template #belowSubmit>
          <div class="mt-4">
            <p class="text-center">
              <VFlexibleLink to="/forgot-password">Forgot password?</VFlexibleLink>
            </p>
          </div>
          <div class="mt-6">
            <p class="my-2 text-center">Don't have an account yet?</p>
            <Button
              class="w-full"
              rounded
              label="Sign up"
              severity="secondary"
              @click="
                () => {
                  router.push('/signup')
                }
              "
            />
          </div>
        </template>
      </VLoginWithEmail>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.login {
  background: var(--background2);
  padding: 3rem 1.25rem;
}
</style>
