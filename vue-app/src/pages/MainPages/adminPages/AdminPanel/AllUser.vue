<template>
    <Navbar></Navbar>
    <div class="container">
        <div class="user-container">
            <user-registration @updateUsers="updateUsers"></user-registration>
        </div>
        <div class="user-container">
            <div class="section">
                <div class="all-user">
                    <h3>Все пользователи</h3>
                    <search-form-for-users class="indent"></search-form-for-users>
                    <div class="layer">
                        <users-list :arrayUsers="arrayUsers"></users-list>
                        <div v-intersection="loadMoreUsers" class="observer"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/UI/AdminSideBar/AdminSideBar"
import UsersList from "@/components/componentsUsers/UsersList.vue";
import SearchFormForUsers from "@/components/componentsUsers/SearchFormForUsers.vue";
import UserRegistration from "@/components/componentsUsers/UserRegistration.vue";

export default {
    components: {
        UsersList,
        SearchFormForUsers,
        UserRegistration,
        Navbar
    },
    data() {
        return {
            arrayUsers: [],
            pageUs: 0,

            limit: 10
        }
    },
    methods: {
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
        }
    }
}

import axios from "axios";

</script>

<style>
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
.user-container {
    width: auto;
    background: rgba(255, 255, 255, .5);
    padding: 4rem;
    border-radius: 10px;
    position: relative;
    margin: 5px;
}
.all-user {
    width: 830px;
    height: auto;
}
</style>
