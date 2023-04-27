import axios from 'axios'


  // ---------------------------------------------------------------------------Instance-----------------------------------------------------------//


const adminInstance = axios.create({
    baseURL:'http://localhost:8080/api'
})

  // ------------------------------------------------------------------------Axios Interceptors-----------------------------------------------------------//
 
  // Injecting jwt in every request 
  adminInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("adminToken"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },(error) => {
    return Promise.reject(error);
  }
);


export default adminInstance; 