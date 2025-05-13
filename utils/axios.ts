import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_GITHUB_API_URL,
    headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json'
    }
})

export default axiosInstance