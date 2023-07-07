import { useCurrentUser, useCurrentUserProfile } from '~/composables/states'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const currentUser = useCurrentUser()
    const client = useSupabaseClient()

    // sign out from supabase
    const { error } = await client.auth.signOut()
    // if (error) {
    //     console.log('error')
    // }

    // set the currentUser composable to null
    currentUser.value = null

    // set the currentUserProfile composable to null
    const currentUserProfile = useCurrentUserProfile()
    currentUserProfile.value = null

    // clear localStorage
    localStorage.clear()
})