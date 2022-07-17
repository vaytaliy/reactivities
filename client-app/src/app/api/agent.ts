import axios, { AxiosResponse } from 'axios'
import { Activity } from '../models/activity'
axios.defaults.baseURL = 'http://localhost:5000/api'

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000)
        return response
    } catch (err) {
        console.log(err)
        return await Promise.reject(err)
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data

const requests = {
    get: async <T>(url: string) => {
        const rawResponse : AxiosResponse<any> = await axios.get<T>(url)
        return responseBody<T>(rawResponse);
    },
    post: async <T>(url: string, body: {}) => {
        const rawResponse : AxiosResponse<any> = await axios.post<T>(url, body)
        return responseBody<T>(rawResponse);
    },
    put: async <T>(url: string, body: {}) => {
        const rawResponse : AxiosResponse<any> = await axios.put<T>(url, body)
        return responseBody<T>(rawResponse);
    },
    delete: async <T>(url: string) => {
        const rawResponse : AxiosResponse<any> = await axios.delete<T>(url)
        return responseBody<T>(rawResponse);
    }
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity : Activity) => requests.post<void>('/activities', activity),
    update: (activity : Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete<void>(`/activities/${id}`),
}

const agent = {
    Activities
}

export default agent;