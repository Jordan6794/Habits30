import * as api from '../api/index'
import { FormData } from '../components/Auth/formData.model'

export const signup = async (formData: FormData) => {
        const { data } = await api.signUp(formData)
        return data
}

export const signin = async (formData: FormData) => {
    const { data } = await api.signIn(formData)
    return data
}