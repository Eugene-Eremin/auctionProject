<template>
<div class="app-container1">
  <h2>Заявки</h2>
    <h3>Создать заявку</h3>
    <div class="product_name">
      <div class="left-side">
        <drop-down-list-product-name :arrayProductNames="arrayProductNames" @loadProductName="updateListProductNames" @chosenProductName="chosenProductName"></drop-down-list-product-name>
      </div>
      <div class="side">
        <create-form-for-product-name @updateListProductNames="updateListProductNames"></create-form-for-product-name>
      </div>
    </div>
    <create-application-form @createApplication="createApplication"></create-application-form>
  </div>
</template>

<script>
import CreateFormForProductName from "@/components/componentsCreateApplication/componentsProductName/CreateFormForProductName.vue";
import DropDownListProductName from "@/components/componentsCreateApplication/componentsProductName/DropDownListProductName.vue";
import CreateApplicationForm from "@/components/componentsCreateApplication/CreateApplicationForm.vue";
import axios from "axios";

export default {
  components: {
    CreateFormForProductName, DropDownListProductName, CreateApplicationForm
  },
  data() {
    return {
      selected: 0,
      arrayProductNames: []
    }
  },
  methods: {
    chosenProductName(selected) {
      this.selected = selected;
    },
    createApplication(applicationData) {
      axios.post('http://localhost:5000/api/applications/post_application', {
        amount: applicationData.amount,
        delivery_time: applicationData.deliveryTime,
        offer_time: applicationData.offerTime,
        status: false,
        productNameId: this.selected
      },{
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        },
      }).then(res => {
        this.$emit("updateApplications")
      }).catch((e) => {
        console.log(e.message)
      })
    },
    updateListProductNames() {
      axios.get('http://localhost:5000/api/product_names/all_product_names', {
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        }
      }).then(res => {
        this.arrayProductNames = res.data;
      }).catch((e) => {
        console.log(e.message)
      })
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
</style>