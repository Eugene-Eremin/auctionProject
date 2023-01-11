<template>
  <div class="application">
    <div class="item">
      <closed-application-item :key="closedApplication.id" :closedApplication="closedApplication" v-for="closedApplication in arrayClosedApplications"/>
    </div>
  </div>
</template>

<script>
import ClosedApplicationItem from "@/components/componentsClosedApplicaions/ClosedApplicationItem.vue";

export default {
  components: {
    ClosedApplicationItem
  },
  props: {
    arrayClosedApplications: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
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