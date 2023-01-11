<template>
  <form @submit.prevent>
    <div class="container">
      <div class="login-card-container">
        <div class="login-card">
            <div class="login-card-logo">
                <img src="../../public/image/logo.png" alt="logo">
            </div>
            <div class="login-card-header">
                <h1>Войти</h1>
                <div>Пожалуйста войдите чтобы пользоваться платформой</div>
            </div>
            <form @submit.prevent class="login-card-form">
                <div class="form-item">
                    <span class="form-item-icon material-symbols-rounded">Login</span>
                    <input type="text" placeholder="Login" id="emailForm" v-model="login" 
                    autofocus required>
                </div>
                <div class="form-item">
                    <span class="form-item-icon material-symbols-rounded">lock</span>
                    <input type="password" placeholder="Enter Password" id="passwordForm" v-model="password"
                     required>
                </div>
                <div class="form-item-other">
                    <div class="checkbox">
                        <input type="checkbox" id="rememberMeCheckbox" checked>
                        <label for="rememberMeCheckbox">Запомнить меня</label>
                    </div>
                    <a href="#">Я забыл пароль!</a>
                </div>
                <button type="submit" @click="loginFn">Войти</button>
            </form>
        </div>
    </div>
    </div>
  </form>

  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,600,0,0" />
</template>

<script>
import axios from 'axios'
import Auth from "@/helpers/Auth";

export default {

    data() {
    return {
        login: "",
        password: ""
    }
    },

    methods: {
    loginFn() {
        axios.post('http://localhost:5000/api/users/login', {login:this.login, password:this.password})
            .then(res => {
            this.$store.commit({
                type: 'login',
                res: res,
                login: this.login
            })

            this.$router.push('/applications');
            }).catch((e) => {
            console.log(e.message)
            })
    }
}
}
</script>

<style scoped>
.container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(to right, #333399, #ff00ccb6);
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-card {
    width: 450px;
    background: rgba(255, 255, 255, .5);
    padding: 4rem;
    border-radius: 10px;
    position: relative;
}

.login-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, .15);
    transform: rotate(-6deg);
    border-radius: 10px;
    z-index: -1;
}

.login-card-logo {
    margin-bottom: 2rem;
}

.login-card-logo img {
    width: 60px;
}

.login-card-logo,
.login-card-header,
.login-card-footer {
    text-align: center;
}

.login-card a {
    text-decoration: none;
    color: #35339a;
}

.login-card a:hover {
    text-decoration: underline;
}

.login-card-header {
    margin-bottom: 2rem;
}

.login-card-header h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: .5rem;
}

.login-card-header h1+div {
    font-size: calc(1rem * .8);
    opacity: .8;
}

.login-card-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.login-card-form .form-item {
    position: relative;
}

.login-card-form .form-item .form-item-icon {
    position: absolute;
    top: .82rem;
    left: 1.4rem;
    font-size: 1.3rem;
    opacity: .4;
}

.login-card-form .checkbox {
    display: flex;
    align-items: center;
    gap: 7px;
}

.login-card-form .form-item-other {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: calc(1rem * .8);
    margin-bottom: .5rem;
}

.login-card-footer {
    margin-top: 1.5rem;
    font-size: calc(1rem * .8);
}

.login-card input[type="text"],
.login-card input[type="password"],
.login-card input[type="email"] {
    border: none;
    outline: none;
    background: rgba(255, 255, 255, .3);
    padding: 1rem 1.5rem;
    padding-left: calc(1rem * 3.5);
    border-radius: 100px;
    width: 100%;
    transition: background .5s;
}

.login-card input:focus {
    background: white;
}

.login-card input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: black;
}

.login-card button {
    background: black;
    color: white;
    padding: 1rem;
    border-radius: 100px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: background .5s;
}

.login-card button:hover {
    background-color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
}

@media (max-width: 768px) {

    body {
        padding: 2rem 0;
    }

    .login-card {
        width: 280px;
        padding: 2rem;
    }

}


*:where(:not(html, iframe, canvas, img, svg, video):not(svg *, symbol *)) {
    display: revert;
}

</style>