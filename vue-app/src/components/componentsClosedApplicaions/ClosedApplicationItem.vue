<template>
  <div class="product">
    <div>
      <div><strong>id:</strong> {{ closedApplication.id }}</div>
      <div><strong>Наименование продукта:</strong> {{ this.productName }}</div>
      <div><strong>Количество:</strong> {{ closedApplication.amount }}</div>
      <div><strong>Период доставки:</strong> {{ closedApplication.delivery_time }}</div>
      <div><strong>Период принятия заявок:</strong> {{ closedApplication.offer_time }}</div>
    </div>
    <button @click="openApplication" class="btn">Открыть</button>
  </div>
</template>

<script>
import axios from "axios";


export default {
  props: {
    closedApplication: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      arrayProductNames: [],
      productName: ''
    }
  },
  methods: {
    findProductName() {
      axios.post("http://localhost:5000/api/product_names/get_one_product_name", {
        id: this.closedApplication.productNameId
      }, {
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        }
      }).then(res => {
        this.productName = res.data
      }).catch((e) => {
        console.log(e.message);
      })
    },
    openApplication() {
      this.$store.commit('setApplicationId', this.closedApplication.id)
      this.$router.push('/selected_application')
    }
  },
  mounted() {
    this.findProductName()
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