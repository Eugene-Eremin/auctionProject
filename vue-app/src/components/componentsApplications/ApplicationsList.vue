<template>
  <div class="app-container">
  <div class="application">
    <div class="item">
      <application-item :key="application.id" :application="application" v-for="application in arrayApplications"/>
    </div>
  </div>
  </div>
</template>

<script>
import ApplicationItem from "@/components/componentsApplications/ApplicationItem.vue";

export default {
  components: {
    ApplicationItem
  },
  props: {
    arrayApplications: {
      type: Array,
      required: true
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
.app-container {
    width: auto;
    padding: 4rem;
    border-radius: 10px;
    position: relative;
    margin: 5px;
}
.application {
  display: flex;
  justify-content: center;
  width: 100%;
}

.item {
  width: 100%;
}

.product-list-item {
  display: inline-block;
  margin-right: 10px;
}
.product-list-enter-active, .product-list-leave-active {
  transition: all 0.4s;
}
.product-list-enter, .product-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.product-list-move {
  transition: transform 0.4s;
}
</style>