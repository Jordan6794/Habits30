import axios from 'axios'
import { Habit } from '../components/Table/habits.model'

const API = axios.create({baseURL: 'http://localhost:5000'})
// baseUrl: 'https://habits-project-backend.herokuapp.com'
// baseUrl: 'http://localhost:5000'

API.interceptors.request.use((req) => {
    if(localStorage.getItem('User')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('User')).token}`
    }

    return req
})

export const fetchHabits = () => API.get('/posts')
export const postHabit = (habit: Habit) => API.post('/posts', habit)
export const updateHabit = (habit: Habit) => API.patch(`${'/posts'}/${habit._id}`, habit)
export const deleteHabit = (id: string) => API.delete(`${'/posts'}/${id}`)

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)