import axios from 'axios'

const Axios = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? "https://music-app-back-end.onrender.com" : "DEPLOY ADDRESS",
    timeout: 50000
})

export default Axios