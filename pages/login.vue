<script setup>
import VFlexibleLink from '~/v2/src/components/VFlexibleLink.vue'
import VLoginWithEmail from '~/v2/src/components/supabase/VLoginWithEmail.vue'
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  //   propVar: {
  //     type: Boolean,
  //     default: false,
  //   },
})

//const emit = defineEmits(["change", "click"]);

// lifecycle hooks
onMounted(() => {})
</script>

<template>
  <div>
    <section class="login">
      <VLoginWithEmail
        label="Log in"
        :client="useSupabaseClient()"
        :config="useRuntimeConfig()"
      >
        <template #belowSubmit>
          <div class="mt-4">
            <p class="text-center">
              <VFlexibleLink to="/forgot-password"
                >Forgot password?</VFlexibleLink
              >
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
                  navigateTo('/signup')
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
