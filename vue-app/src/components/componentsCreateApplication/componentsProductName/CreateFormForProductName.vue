<template>
  <form @submit.prevent>
    <my-input v-model="productName" placeholder="Наим. продукта"></my-input>
    <my-button @click="createProductName">Создать</my-button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      productName: ''
    }
  },
  methods: {
    createProductName() {
      axios.post('http://localhost:5000/api/product_names/post_product_names', {
        name: this.productName
      },{
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        },
      }).then(res => {
        this.$emit('updateListProductNames')
        this.productName = ''
      }).catch((e) => {
        console.log(e.message)
      })
    }
  }
}
</script>

<style scoped>
form {
  width: 100%;
}
.app-container1 {
  width: auto;
    padding: 4rem;
    border-radius: 10px;
    position: relative;
    margin: 5px;
}
</style>