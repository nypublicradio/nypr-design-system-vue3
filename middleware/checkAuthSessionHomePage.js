import {
    useCurrentUser
} from '~/composables/states'

export default defineNuxtRouteMiddleware(async () => {
    const currentUser = useCurrentUser()
    const config = useRuntimeConfig()
    const client = useSupabaseClient()
    const dashboardSlug = "/dashboard"
    const user = await client.auth.getSession()

    // check local storage for the auth token
    if (process.client) {
        const supabaseAuthToken = JSON.parse(
            localStorage.getItem(config.supabaseAuthTokenName)
        )
        if (supabaseAuthToken) {
            currentUser.value = supabaseAuthToken.user
        }

        // check supabase session for logged in user
        if (user?.data?.session?.user) {
            currentUser.value = user?.data?.session?.user
        }

        // redirect to dashboard if the user is logged in
        if (currentUser.value) {
            await navigateTo(dashboardSlug)
        }
    }

    // check if the user is logged in
    if (user?.data?.session?.user) {
        currentUser.value = user?.data?.session?.user
    }
    // redirect to dashboard if the user is logged in
    if (currentUser.value) {
        return navigateTo(dashboardSlug)
    }
})
