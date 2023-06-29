// global state for the current authorized user
let currentUser = null
export const useCurrentUser = () => useState( 'useCurrentUser', () => currentUser )

// global state for the current authorized user's profile
let currentUserProfile = null
export const useCurrentUserProfile = () => useState( 'useCurrentUserProfile', () => currentUserProfile )