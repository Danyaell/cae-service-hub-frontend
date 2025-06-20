import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
    }
})

export default api;