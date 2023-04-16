import axios from 'axios';

const axiosInstance = axios.create({
   // baseURL: 'http://localhost:4000/'
    baseURL: 'https://inventario-yswf.onrender.com/'
});

export {
    axiosInstance,
}