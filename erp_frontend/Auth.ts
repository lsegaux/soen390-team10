export class Auth {
    static isAuthenticated(){
        return localStorage.getItem('jwt') != null
    } 
}