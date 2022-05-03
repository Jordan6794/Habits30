import * as api from '../api/index'
import { HabitModel } from '../components/habits.model'

export const getHabits = async (): Promise<HabitModel[] | undefined> => {
    try {
        const {data} = await api.fetchHabits()
        return data
    } catch (error) {
        console.log(error.message)
        return []
    }
    
}

export const postHabit = async (habit: HabitModel) => {
    try {
        const response = await api.postHabit(habit)
        return response
    } catch (error) {
        console.log(error.message)   
    }
}

export const updateHabit = async (habit: HabitModel) => {
    try {
        const response = await api.updateHabit(habit)
        return response
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteHabit = async (id: string) => {
    try {
        const response = await api.deleteHabit(id)
        return response
    } catch (error) {
        console.log(error.message)
    }
}