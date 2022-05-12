import * as api from '../api/index'

export const signup = async (formData) => {
    try {
        const { data } = await api.signUp(formData)
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const signin = async (formData) => {
    try {
        const { data } = await api.signIn(formData)
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}