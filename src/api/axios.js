import axios from 'axios';
const BASE_URL = 'https://financebackend-f9v7.onrender.com';

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});


export default axiosPrivate;
