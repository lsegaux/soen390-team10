import axios from 'axios';

const domain = 'http://localhost:4000';

export function loginPost(email:string, password:string) {
    return axios({
        method: 'post',
        url: `${domain}/api/v1/sign_in`,
        headers: { "Content-Type": "application/json" }, 
        data: { email, password }
    })
}

export function signUpPost(email:string, password:string, firstName:string, lastName:string, userRole:string) {
    return axios({
        method: 'post',
        url: `${domain}/api/v1/sign_up`,
        headers: { "Content-Type": "application/json" }, 
        data: {user: { email, password }}
    })
}