import axios from 'axios'

const axiosInstance = axios.create({

})

axiosInstance.interceptors.request.use((request) => {
    return request
}, (error) => {
    throw error
})

axiosInstance.interceptors.response.use((response) => {
    return response
}, (error) => {
    throw error
})

export const request = axiosInstance