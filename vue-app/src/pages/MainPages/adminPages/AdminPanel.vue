<template>
  <div class="main">
    <h2 class="indent">Пользователи</h2>
    <div class="section">
      <div class="content">
        <user-registration @updateUsers="updateUsers"></user-registration>
      </div>
      <div class="content">4
        <h3>Все пользователи</h3>
        <search-form-for-users class="indent"></search-form-for-users>
        <div class="layer">
          <users-list :arrayUsers="arrayUsers"></users-list>
          <div v-intersection="loadMoreUsers" class="observer"></div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <create-application @updateApplications="updateApplications"></create-application>
    <div class="section">

      <div class="content">
        <h3 class="indent">Все заявки</h3>
        <search-form-for-applic class="indent"></search-form-for-applic>
        <div class="layer">
          <applications-list :arrayApplications="arrayApplications"></applications-list>
          <div v-intersection="loadMoreApplications" class="observer"></div>
        </div>
      </div>

      <div class="content">
        <h3 class="indent">Закрытые заявки</h3>
        <search-form-for-closed-applic class="indent"></search-form-for-closed-applic>
        <div class="layer">
          <closed-application-list :arrayClosedApplications="arrayClosedApplications"></closed-application-list>
          <div v-intersection="loadMoreClosedApplications" class="observer"></div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <h2>Аналитика</h2>
    <div class="section">
      <div class="content">
        что то 3
      </div>
      <div class="content">
        что то 3
      </div>
    </div>
  </div>
</template>

<script>
import SearchFormForUsers from "@/components/componentsUsers/SearchFormForUsers.vue";
import SearchFormForApplic from "@/components/componentsApplications/SearchFormForApplic.vue";
import SearchFormForClosedApplic from "@/components/componentsApplications/SearchFormForClosedApplic.vue";
import CreateFormForProductName from "@/components/componentsCreateApplication/componentsProductName/CreateFormForProductName.vue";
import UserRegistration from "@/components/componentsUsers/UserRegistration.vue";
import CreateApplication from "@/components/componentsCreateApplication/CreateApplication.vue";
import ApplicationsList from "@/components/componentsApplications/ApplicationsList.vue";
import UsersList from "@/components/componentsUsers/UsersList.vue";
import ClosedApplicationList from "@/components/componentsClosedApplicaions/ClosedApplicationList.vue";
import ClosedApplicationItem from "@/components/componentsClosedApplicaions/ClosedApplicationItem.vue";

import axios from "axios";


export default {
  components: {
    ClosedApplicationList,
    ClosedApplicationItem,
    UsersList,
    CreateApplication,
    SearchFormForUsers,
    SearchFormForApplic,
    SearchFormForClosedApplic,
    CreateFormForProductName,
    UserRegistration,
    ApplicationsList,
  },
  data() {
    return {
      arrayApplications: [],
      arrayClosedApplications: [],
      arrayUsers: [],

      pageClosedApplic: 0,
      pageApplic: 0,
      pageUs: 0,

      limit: 10,
    }
  },
  methods: {
    async loadMoreApplications() {

      try {
        this.pageApplic++
        const response = await axios.post("http://localhost:5000/api/applications/all_applications", {
          status: false
        }, {
          headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
          },
          params: {
            limit: this.limit,
            page: this.pageApplic
          }
        })
        // this.totalPages = Math.ceil(response.count / this.limit)
        this.arrayApplications = [...this.arrayApplications, ...response.data['rows']];
      } catch (e) {
        console.log(e.message)
      }

    },
    async loadMoreClosedApplications() {
      try {
        this.pageClosedApplic++
        const response = await axios.post("http://localhost:5000/api/applications/all_applications", {
          status: true
        }, {
          headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
          },
          params: {
            limit: this.limit,
            page: this.pageClosedApplic
          }
        })
        // this.totalPages = Math.ceil(response.count / this.limit)
        this.arrayClosedApplications = [...this.arrayClosedApplications, ...response.data['rows']];
      } catch (e) {
        console.log(e.message)
      }
    },
    async loadMoreUsers() {
      try {
        this.pageUs++
        const response = await axios.get("http://localhost:5000/api/users/all_users", {
          headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
          },
          params: {
            limit: this.limit,
            page: this.pageUs
          }
        })
        // this.totalPages = Math.ceil(response.count / this.limit)
        this.arrayUsers = [...this.arrayUsers, ...response.data['rows']];
        console.log(this.arrayUsers)
      } catch (e) {
        console.log(e.message)
      }
    },

    async updateUsers() {
      this.pageUs = 0;
      this.arrayUsers = [];
      this.loadMoreUsers()
    },
    async updateApplications() {
      this.pageApplic = 0;
      this.arrayApplications = [];
      this.loadMoreApplications()
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.main {
  width: 80%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.section {
  display: flex;
}

.content {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  width: 50%;
}

.layer {
  width: 100%;
  height: 510px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  margin-left: auto;
  margin-right: auto;
  padding: 5px
}

.indent {
  margin-bottom: 20px;
}

.line {
  border-bottom: 1px solid grey;
  margin-top: 40px;
  margin-bottom: 40px;
}

</style>
