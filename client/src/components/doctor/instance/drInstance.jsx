import axios from 'axios'

const drinstance = axios.create({
    baseURL:'http://localhost:8080/api/doctor'
})

export default drinstance; 