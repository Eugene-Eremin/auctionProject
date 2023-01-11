import {createWebHistory, createRouter} from "vue-router";

import WelcomePage from '@/pages/WelcomePage.vue'
import LoginPage from "@/pages/LoginPage.vue";

import SelectedApplicationPage from "@/pages/MainPages/SelectedApplicationPage.vue";

import ApplicationsPage from "@/pages/MainPages/ApplicationsPage.vue";
import UserPanel from "@/pages/MainPages/userPages/UserPanel.vue";

import AdminPanel from "@/pages/MainPages/adminPages/AdminPanel.vue";
import AllUser from "@/pages/MainPages/adminPages/AdminPanel/AllUser.vue";
import AllApplication from "@/pages/MainPages/adminPages/AdminPanel/AllApplications.vue";
import Analytics from "@/pages/MainPages/adminPages/AdminPanel/Analytics.vue";
import ClosedApplication from "@/pages/MainPages/adminPages/AdminPanel/ClosedApplication.vue";


const routes = [

    ////////////MAIN//////////////

    {
        path: '/',
        component: WelcomePage
    },
    {
        path: '/login',
        component: LoginPage
    },

    /////////////COMMON////////////

    {
        path: '/selected_application',
        component: SelectedApplicationPage
    },

    /////////////USER//////////////

    {
        path: '/applications',
        component: ApplicationsPage
    },
    {
        path: '/user_panel',
        component: UserPanel
    },

    //////////////ADMIN/////////////


    {
        path: '/admin_panel',
        component: AdminPanel
    },
    {
        path: '/AllUser',
        component: AllUser
    }, 
    {
        path: '/AllApp',
        component: AllApplication
    },
    {
        path: '/ClosedApp',
        component: ClosedApplication
    },
    {
        path: '/Analytics',
        component: Analytics
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;