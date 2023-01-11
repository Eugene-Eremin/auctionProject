<template>
  <div class="product">
    <div>
      <div><strong>id:</strong> {{ user.id }}</div>
      <div><strong>login:</strong> {{ user.login }}</div>
    </div>
    <button @click="openUser" class="btn">Открыть</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    openUser() {

    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.product {
  padding: 15px;
  border: 2px solid darkgreen;
  margin-top: 15px;
  display: flex;
  text-align: left;
  justify-content: left;
  width: 100%;
}

.btn {
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  width: 20%;
  height: 30%;
  padding: 10px 15px;
  background: none;
  color: darkgreen;
  border: 2px solid darkgreen;
}
</style>