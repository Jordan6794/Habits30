import * as api from '../api/index'
import { Habit } from '../components/Table/habits.model'

export const getHabits = async (collection: string): Promise<Habit[] | undefined> => {
    try {
        const {data} = await api.fetchHabits(collection)
        return data
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
    
}

export const postHabit = async (habit: Habit, collection: string) => {
    try {
        const response = await api.postHabit(habit, collection)
        return response
    } catch (error) {
        console.log(error.message)   
    }
}

export const updateHabit = async (habit: Habit, collection: string) => {
    try {
        const response = await api.updateHabit(habit, collection)
        return response
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteHabit = async (id: string, collection: string) => {
    try {
        const response = await api.deleteHabit(id, collection)
        return response
    } catch (error) {
        console.log(error.message)
    }
}

export const switchCollection = async (habit: Habit, id: string, fromCollection: string, toCollection: string) => {
    try {
        const updatedHabit: Habit = {...habit, shouldSwitchCollection: false}
        await api.postHabit(updatedHabit, toCollection)
        const deleteResponse = await api.deleteHabit(id, fromCollection)
        return deleteResponse
    } catch (error) {
        console.log(error.message)
    }
}