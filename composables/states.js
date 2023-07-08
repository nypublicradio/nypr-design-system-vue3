// global state for the current authorized user
const currentUser = null
export const useCurrentUser = () => useState('useCurrentUser', () => currentUser)

// global state for the current authorized user's profile
const currentUserProfile = null
export const useCurrentUserProfile = () => useState('useCurrentUserProfile', () => currentUserProfile)