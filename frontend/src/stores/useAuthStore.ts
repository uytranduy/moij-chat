import { create } from 'zustand'
import { authSerVices } from '@/services/auth.services'
import type { IAuthState } from '@/types/stores/auth.store'
import { toast } from 'sonner'
const useAuthStore = create<IAuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    clearState: () => {
        set({
            accessToken: null,
            user: null,
            loading: false
        })
    },
    setAccessToken: (newToken) => {
        set({ accessToken: newToken })
    },

    signUp: async (lastName, firstName, username, email, password, confirmPassword) => {
        try {
            set({ loading: true })
            const res = await authSerVices.signUp(lastName, firstName, username, email, password, confirmPassword)
            return res
        } catch (error) {
            console.error(error)
            throw {
                error
            }

        } finally {
            set({ loading: false })
        }
    },
    signIn: async (username, password) => {
        try {
            set({ loading: true })
            const res = await authSerVices.signIn(username, password)
            set({ accessToken: res.token })
            await get().fetchMe()
            return res
        } catch (error) {
            console.error(error)
            throw {
                error
            }
        } finally {
            set({ loading: false })
        }
    },
    signOut: async () => {
        try {
            set({ loading: true })

        } catch (error) {
            console.error(error)
        } finally {
            set({ loading: false })
        }
    },
    fetchMe: async () => {
        try {
            set({ loading: true })
            const res = await authSerVices.fetchMe()
            set({ user: res.data })
        } catch (error) {
            console.error(error)
        } finally {
            set({ loading: false })
        }
    },
    refresh: async () => {
        try {

            set({ loading: true })
            const { user, fetchMe } = get()
            const res = await authSerVices.refresh()
            get().setAccessToken(res.data)

            if (!user) {
                await fetchMe()
            }
        } catch (error) {
            console.log(error)
            get().clearState()

        } finally {
            set({ loading: false })
        }
    }
}))

export default useAuthStore