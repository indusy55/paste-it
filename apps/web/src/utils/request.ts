import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: '/api'
})

axiosInstance.interceptors.request.use((request) => {
    return request
}, (error) => {
    throw error
})

axiosInstance.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    throw error
})

export const request = axiosInstance