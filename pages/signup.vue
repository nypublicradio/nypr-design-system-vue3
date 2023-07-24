<script setup>
import VFlexibleLink from '~/v2/src/components/VFlexibleLink.vue'
import VSignupWithEmail from '~/v2/src/components/supabase/VSignupWithEmail.vue'
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
    <div class="signup">
      <VSignupWithEmail
        label="Sign up"
        slug="/nuxt"
        :client="useSupabaseClient()"
        :config="useRuntimeConfig()"
      >
        <template #aboveSubmit></template>
        <template #belowSubmit>
          <div class="mt-6">
            <p class="my-2 text-center">Already have an account yet?</p>
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
      </VSignupWithEmail>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.signup {
}
</style>
