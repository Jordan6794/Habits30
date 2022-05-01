import * as api from '../api/index'

export const getHabits = async () => {
    try {
        const {data} = await api.fetchHabits()
        return data
    } catch (error) {
        console.log(error.message)
    }
    
}