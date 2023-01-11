<template>
  <div class="container">
    <div class="navbar">
      <div v-if="this.$store.state.inOut == 'Выйти'" class="authorizationPast">
        <div class="divEl" @click="logOut">{{ this.$store.state.inOut }}</div>
        <div class="divEl">|</div>
        <div class="divEl" @click="goPanel">{{ this.$store.state.login }}</div>
      </div>
      <div v-else class="authorization">
        <div @click="$router.push('/login')">{{ this.$store.state.inOut }}</div>
      </div>
    </div>
    <div class="app-container">
    <div>
      <search-form-for-applic @send="sendApplicationsName"></search-form-for-applic>
    </div>
    <div>
      <applications-list :arrayApplications="arrayApplications"></applications-list>
      <div v-intersection="loadMoreApplications" class="observer"></div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SearchFormForApplic from "@/components/componentsApplications/SearchFormForApplic.vue";
import ApplicationsList from "@/components/componentsApplications/ApplicationsList.vue";
import router from "@/router/router";

export default {
  components: {
    SearchFormForApplic, ApplicationsList
  },
  data() {
    return {
      applicationName: '',
      arrayApplications: [],
      page: 0,
      limit: 10,
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
        (res.data == 'USER') ? router.push('/user_panel') : router.push('/AllApp')
            this.findProductName()
      }).catch((e) => {
        console.log(e.message);
      })
    },

    async loadMoreApplications() {

      try {
        this.page++
        const response = await axios.post("http://localhost:5000/api/applications/all_applications", {status: false}, {
          headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
          },
          params: {
            limit: this.limit,
            page: this.page
          }
        })
        // this.totalPages = Math.ceil(response.count / this.limit)
        this.arrayApplications = [...this.arrayApplications, ...response.data['rows']];
        console.log(this.arrayApplications)
      } catch (e) {
        console.log(e.message)
      }
    },
  },
  mounted() {
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
    flex-direction: column;
    flex-wrap: wrap;
}

.observer {
  height: 30px;
  width: 500px;
}

.navbar {
  height: 40px;
  background-color: rgba(0, 0, 0, 0);
  box-shadow:  rgba(0, 0, 0, 0);
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