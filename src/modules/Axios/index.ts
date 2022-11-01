import axios from 'axios';
import env from '../conf';

const baseApi = axios.create({
    baseURL: env.hostname,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const userApi = (token: string) => axios.create({
    baseURL: env.hostname + env.restApiPath,
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
    }
});

export default baseApi;
