import * as api from '../api/index'
import { FormData } from '../components/NavBar/formData.model'

export const signup = async (formData: FormData) => {
    try {
        const { data } = await api.signUp(formData)
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const signin = async (formData: FormData) => {
    try {
        const { data } = await api.signIn(formData)
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}