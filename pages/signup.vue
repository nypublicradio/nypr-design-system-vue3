<script setup>
import VFlexibleLink from '~/v2/src/components/VFlexibleLink.vue'
import VSignupWithEmail from '~/v2/src/components/supabase/VSignupWithEmail.vue'
</script>

<template>
  <div>
    <div class="signup">
      <VSignupWithEmail
        label="Sign up"
        slug="/nuxt"
        :client="useSupabaseClient()"
        :config="useRuntimeConfig()"
      >
        <template #aboveSubmit>
          <p class="font-meta">
            By proceeding to create your account, you are agreeing to New York
            Public Radio’s
            <VFlexibleLink to="/terms" style="color: inherit"
              >Terms of Service</VFlexibleLink
            >
            and
            <VFlexibleLink to="/privacy" style="color: inherit"
              >Privacy Policy</VFlexibleLink
            >
          </p>
        </template>
        <template #belowSubmit>
          <div class="mt-6">
            <p class="my-2 text-center">Already have an account yet?</p>
            <Button
              class="w-full"
              rounded
              label="Login"
              severity="secondary"
              @click="
                () => {
                  navigateTo('/login')
                }
              "
            />
          </div>
        </template>
      </VSignupWithEmail>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.signup {
  background: var(--background2);
  padding: 3rem 1.25rem;
}
</style>
