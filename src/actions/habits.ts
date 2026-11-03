import * as api from '../api/index'
import { DayStatus, StoredHabit } from '../components/Main/Table/habits.model'

export const getHabits = async (): Promise<StoredHabit[] | undefined> => {
    try {
        const {data} = await api.fetchHabits()
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

export const postHabit = async (habit: StoredHabit) => {
    try {
        const response = await api.postHabit(habit)
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

export const updateHabit = async (habit: StoredHabit) => {
    try {
        const response = await api.updateHabit(habit)
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

export const setLogEntry = async (id: string, date: string, status: DayStatus | null) => {
    try {
        const response = await api.setLogEntry(id, date, status)
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

export const deleteHabit = async (id: string, date: string) => {
    try {
        const response = await api.deleteHabit(id, date)
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