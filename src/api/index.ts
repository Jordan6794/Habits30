import axios from 'axios'
import { Habit } from '../components/Table/habits.model'
import { FormData } from '../components/NavBar/formData.model'

const API = axios.create({baseURL: 'https://habits-project-backend.herokuapp.com'})
// baseUrl: 'https://habits-project-backend.herokuapp.com'
// baseUrl: 'http://localhost:5000'

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
export const postHabit = (habit: Habit) => API.post('/posts', {habit})
export const updateHabit = (habit: Habit) => API.patch(`${'/posts'}/${habit._id}`, {habit})
export const deleteHabit = (id: string) => API.delete(`${'/posts'}/${id}`)

export const signIn = (formData: FormData) => API.post('/user/signin', formData)
export const signUp = (formData: FormData) => API.post('/user/signup', formData)