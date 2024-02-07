import axios from 'axios'

const Axios = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "DEPLOY ADDRESS",
    timeout: 50000
})

export default Axios