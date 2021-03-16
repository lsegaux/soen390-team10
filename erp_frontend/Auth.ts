export class Auth {
    static isAuthenticated(){
        return localStorage.getItem('jwt') != null
    }
    
    static logout() {
        localStorage.removeItem('jwt')
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        window.location.href = "/"
    }
}