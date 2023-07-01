import axios from 'axios'


  // ---------------------------------------------------------------------------Instance-----------------------------------------------------------//

export const host = 'http://localhost:8080'


const instance = axios.create({
    baseURL:'http://localhost:8080/api/'
})

  // ------------------------------------------------------------------------Axios Interceptors-----------------------------------------------------------//
 
  // Injecting jwt in every request 
  instance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("clientToken"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },(error) => {
    return Promise.reject(error);
  }
);


export default instance; 