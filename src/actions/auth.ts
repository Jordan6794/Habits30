import * as api from '../api/index'
import { FormData, GoogleAuthData } from '../components/Auth/formData.model'

export const signup = async (formData: FormData) => {
        const { data } = await api.signUp(formData)
        return data
}

export const signin = async (formData: FormData) => {
    const { data } = await api.signIn(formData)
    return data
}

export const googleAuth = async (authData: GoogleAuthData) => {
    const { data } = await api.googleAuth(authData)
    return data
}