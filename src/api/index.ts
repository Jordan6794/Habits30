import axios from 'axios'
import { HabitModel } from '../components/habits.model'

const url = 'https://habits-project-backend.herokuapp.com/posts'
// const url = 'http://localhost:5000/posts'

export const fetchHabits = () => axios.get(url)
export const postHabit = (habit: HabitModel) => axios.post(url, habit)
export const updateHabit = (habit: HabitModel) => axios.patch(`${url}/${habit._id}`, habit)
export const deleteHabit = (id: string) => axios.delete(`${url}/${id}`)