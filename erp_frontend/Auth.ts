export class Auth {
    static isAuthenticated(){
        return localStorage.getItem('jwt') != null
    }
    
    static logout() {
        localStorage.removeItem('jwt')
        window.location.href = "/"
    }
}