export default {

    login(res, login) {
         const data = {
            name: 'token',
            token: res.data.token
        }
        localStorage.setItem('token', JSON.stringify(data));
        localStorage.setItem('login', JSON.stringify(login));
        return data
        },

    logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('login')
    },

    initializeStore() {
        if(localStorage.getItem('login')) {
            return localStorage.getItem('login')
        }
    }
}