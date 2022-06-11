import * as api from '../api/index'
import { Habit } from '../components/Table/habits.model'

export const getHabits = async (collection: string): Promise<Habit[] | undefined> => {
    try {
        const {data} = await api.fetchHabits(collection)
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

export const postHabit = async (habit: Habit, collection: string) => {
    try {
        const response = await api.postHabit(habit, collection)
        return response
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message)
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error')
        }   
    }
}

export const updateHabit = async (habit: Habit, collection: string) => {
    try {
        const response = await api.updateHabit(habit, collection)
        return response
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message)
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error')
        }
    }
}

export const deleteHabit = async (id: string, collection: string) => {
    try {
        const response = await api.deleteHabit(id, collection)
        return response
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message)
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error')
        }
    }
}

export const switchCollection = async (habit: Habit, id: string, fromCollection: string, toCollection: string) => {
    try {
        //didChange will always be false in the database
        const updatedHabit: Habit = {...habit, shouldSwitchCollection: false, didChange: false}
        await api.postHabit(updatedHabit, toCollection)
        const deleteResponse = await api.deleteHabit(id, fromCollection)
        return deleteResponse
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message)
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error')
        }
    }
}