<template>
  <h3>Регистрация пользователя</h3>
  <form @submit.prevent>
      <label for="uname"><b>Введите login</b></label>
      <input v-focus v-model="loginReg" type="text" placeholder="login" name="uname" required>

      <label for="psw"><b>Введите password</b></label>
      <input v-model="passwordReg" type="password" placeholder="password" name="psw" required>

      <button @click="userReg" type="submit">Зарегистрировать</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginReg: '',
      passwordReg: ''
    }
  },
  methods: {
    userReg() {
      axios.post('http://localhost:5000/api/users/registration', {
        login: this.loginReg,
        password: this.passwordReg
      },{
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        },
      }).then(res => {
        this.$emit("updateUsers")
        this.loginReg = ''
        this.passwordReg = ''
      }).catch((e) => {
        console.log(e.message)
      })
    }
  }
}
</script>

<style scoped>
.container {
    width: auto;
    height: auto;
    background: rgba(255, 255, 255, .5);
    padding: 4rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  box-sizing: border-box;
}

form {
  height: auto;
  width: auto;
  position: relative;
  margin: 5px;
  justify-content: center;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>