
import {
    useCurrentUser,
    useCurrentUserProfile
} from '~/composables/states'

export default defineNuxtRouteMiddleware(async () => {
    const currentUser = useCurrentUser()
    const currentUserProfile = useCurrentUserProfile()
    const config = useRuntimeConfig()
    const client = useSupabaseClient()
    const user = await client.auth.getSession()

    // function that gets a user profile
    const getProfile = async () => {
        const {
            data,
            error
        } = await client
            .from('profiles')
            .select('*')
            .eq('id', currentUser.value.id)
            .single()
        if (error) {
            console.error(error)
        } else if (data) {
            currentUserProfile.value = data
        }
    }


    // check local storage for the auth token
    // check supabase session for logged in user
    if (user?.data?.session?.user) {
        currentUser.value = user?.data?.session?.user
        // if the user is not authorized, redirect them to the login page
        // if they are, get their profile data
        if (!currentUser.value) {
            return navigateTo('/nuxt')
        } else if (!currentUserProfile.value) {
            getProfile()
        }
    } else {
        if (process.client) {
            const supabaseAuthToken = JSON.parse(
                localStorage.getItem(config.supabaseAuthTokenName)
            )
            if (supabaseAuthToken) {
                currentUser.value = supabaseAuthToken.user
            }
            // if the user is not authorized, redirect them to the login page
            // if they are, get their profile data
            if (!currentUser.value) {
                return navigateTo('/nuxt')
            } else if (!currentUserProfile.value) {
                getProfile()
            }
        }
    }
})
