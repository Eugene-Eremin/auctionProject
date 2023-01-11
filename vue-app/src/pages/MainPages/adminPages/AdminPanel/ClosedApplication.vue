<template>
    <Navbar></Navbar>
    <div class="container">
        <div class="app-container">
            <div class="content">
                <h3 class="indent">Закрытые заявки</h3>
                <search-form-for-closed-applic class="indent"></search-form-for-closed-applic>
                <div class="layer">
                    <closed-application-list :arrayClosedApplications="arrayClosedApplications"></closed-application-list>
                    <div v-intersection="loadMoreClosedApplications" class="observer"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/UI/AdminSideBar/AdminSideBar"
import SearchFormForClosedApplic from "@/components/componentsApplications/SearchFormForClosedApplic.vue";
import ClosedApplicationList from "@/components/componentsClosedApplicaions/ClosedApplicationList.vue";
import ClosedApplicationItem from "@/components/componentsClosedApplicaions/ClosedApplicationItem.vue";
export default {
    components: {
        ClosedApplicationList,
        ClosedApplicationItem,
        SearchFormForClosedApplic,
        Navbar
    },
    data() {
        return {
            arrayClosedApplications: [],
            pageClosedApplic: 0,
            limit: 10
        }
    },
    methods: {
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
}
.app-container {
    width: auto;
    background: rgba(255, 255, 255, .5);
    padding: 4rem;
    border-radius: 10px;
    position: relative;
    margin: 5px;
}
</style>
