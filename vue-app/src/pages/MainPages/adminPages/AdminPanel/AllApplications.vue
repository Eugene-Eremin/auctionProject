<template>
    <Navbar></Navbar>
    <div class="container">
        <div class="app-container1">
            <create-application @updateApplications="updateApplications"></create-application>
            <div class="content">
                <h3 class="indent">Все заявки</h3>
                <search-form-for-applic class="indent"></search-form-for-applic>
                <div class="layer">
                    <applications-list :arrayApplications="arrayApplications"></applications-list>
                    <div v-intersection="loadMoreApplications" class="observer"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/UI/AdminSideBar/AdminSideBar"
import ApplicationsList from "@/components/componentsApplications/ApplicationsList.vue";
import SearchFormForApplic from "@/components/componentsApplications/SearchFormForApplic.vue";
import CreateApplication from "@/components/componentsCreateApplication/CreateApplication.vue";

export default {
    components: {
        SearchFormForApplic,
        ApplicationsList,
        CreateApplication,
        Navbar
    },
    data() {
        return {
            arrayApplications: [],
            pageApplic: 0,
            limit: 10
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
        async updateApplications() {
            this.pageApplic = 0;
            this.arrayApplications = [];
            this.loadMoreApplications()
        }
    }
}

import axios from "axios";

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

.app-container1 {
    width: auto;
    padding: 4rem;
    border-radius: 10px;
    position: relative;
    margin: 5px;
}

.content {
    margin: 10px;
}
</style>
