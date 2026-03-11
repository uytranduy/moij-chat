import type { IUser } from "../user";

export interface IAuthState {
    accessToken: string | null,
    user: IUser | null,
    loading: boolean,

    signUp: (
        lastName: string,
        firstName: string,
        username: string,
        email: string,
        password: string,
        confirmPassword: string

    ) => Promise<void>,

    signIn: (
        username: string,
        password: string,
    ) => Promise<void>,

    fetchMe: () => Promise<void>,
    signOut: () => Promise<void>,
    clearState: () => void,
    refresh: () => Promise<void>,
    setAccessToken: (newToken: string) => void
}