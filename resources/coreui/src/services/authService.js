import apisauce from 'apisauce'
import { BASE_URL } from '../config'
const api = apisauce.create({baseURL: BASE_URL + '/api/auth'});

export function loginApiRequest(email, password){
    return api.post('/login', {email: email, password: password});
}

export function registrationRequest(data) {
    return api.post('/register', data);
}
