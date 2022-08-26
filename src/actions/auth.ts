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

export const onboard = async () => {
    try {
        const { data } = await api.onboard()
        return data
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message)
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error')
        }
    }
}