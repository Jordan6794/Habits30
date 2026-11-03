import axios from 'axios'
import { DayStatus, StoredHabit } from '../components/Main/Table/habits.model'
import { FormData, GoogleAuthData } from '../components/Auth/formData.model'

const API = axios.create({baseURL: process.env.REACT_APP_BACKEND_BASE_URL})

API.interceptors.request.use((req) => {
    if(req.headers){
        const user = localStorage.getItem('User')
        if(user){
            req.headers.Authorization = `Bearer ${JSON.parse(user).token}`
        }
    }

    return req
})

export const fetchHabits = () => API.get('/posts')
export const postHabit = (habit: StoredHabit) => API.post('/posts', {habit})
export const updateHabit = (habit: StoredHabit) => API.patch(`${'/posts'}/${habit._id}`, {habit})
export const setLogEntry = (id: string, date: string, status: DayStatus | null) => API.patch(`${'/posts'}/${id}/log`, {date, status})
export const deleteHabit = (id: string, date: string) => API.delete(`${'/posts'}/${id}`, {params: {date}})

export const script = () => API.post('/posts/script')

export const signIn = (formData: FormData) => API.post('/user/signin', formData)
export const signUp = (formData: FormData) => API.post('/user/signup', formData)
export const googleAuth = (authData: GoogleAuthData) => API.post('/user/googleauth', authData)
export const onboard = () => API.patch('/user/onboard')