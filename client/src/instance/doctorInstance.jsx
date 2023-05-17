import axios from 'axios'


  // ---------------------------------------------------------------------------Instance-----------------------------------------------------------//


export const doctorInstance = axios.create({
    baseURL:'https://dr-care.onrender.com/api/'
})

  // ------------------------------------------------------------------------Axios Interceptors-----------------------------------------------------------//
 
  // Injecting jwt in every request 
  doctorInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("doctorToken"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },(error) => {
    return Promise.reject(error);
  }
);


export default doctorInstance; 