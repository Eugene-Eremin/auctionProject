<template>
  <div class="application">
    <div class="item">
      <user-item :key="user.id" :user="user" v-for="user in arrayUsers"/>
    </div>
  </div>
</template>

<script>
import UserItem from "@/components/componentsUsers/UserItem.vue";

export default {
  components: {
    UserItem
  },
  props: {
    arrayUsers: {
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