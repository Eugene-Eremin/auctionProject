<template>
  <div class="navbar">
    <div>
      <h1 v-if="this.$store.state.inOut == 'Войти'" @click="$router.push('/')">Auction</h1>
      <h1 v-else @click="$router.push('/applications')">Auction</h1>
    </div>
    <div v-if="this.$store.state.inOut == 'Выйти'" class="authorizationPast">
      <div class="divEl" @click="logOut">{{ this.$store.state.inOut }}</div>
      <div class="divEl">|</div>
      <div class="divEl" @click="goPanel">{{ this.$store.state.login }}</div>
    </div>
    <div v-else class="authorization">
      <div @click="$router.push('/login')">{{ this.$store.state.inOut }}</div>
    </div>
  </div>
</template>

<script>
import Auth from "@/helpers/Auth";
import router from "@/router/router";
import axios from "axios";

export default {
  data() {
    return {
      login: 'Войти'
    }
  },
  methods: {
    logOut() {
      this.$store.commit('logOut')
      router.push('/login')
    },
    goPanel() {
      axios.get(`http://localhost:5000/api/users/${this.$store.state.login}`,{
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        }
      }).then(res => {
        (res.data == 'USER') ? router.push('/user_panel') : router.push('/admin_panel')
            this.findProductName()
      }).catch((e) => {
        console.log(e.message);
      })
    }
  },
  mounted() {
    this.$store.commit('initializeStore')
  },
}
</script>

<style scoped>
.navbar {
  height: 40px;
  background-color: black;
  box-shadow: 2px 4px 6px gray;
  display: flex;
  align-items: center;
  padding: 15px;
  color: white;
  font-family: Arial, sans-serif;
}

.authorizationPast {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.divEl {
  margin-left: 5px
}

.authorization {
  margin-left: auto;
}
</style>