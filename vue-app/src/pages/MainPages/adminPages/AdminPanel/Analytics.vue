<template>
    <Navbar></Navbar>
    <div class="container">
        <div class="app-container"></div>
    </div>
</template>

<script>
import Navbar from "@/components/UI/AdminSideBar/AdminSideBar"

export default {
    components: {
        Navbar,
    },
    data() {

    },
    methods: {

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
