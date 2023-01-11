<template>
  <div>
    <form @submit.prevent>
      <div class="app-container1">
        <label for="uname"><b>Количество продукта</b></label>
        <input v-model="applicationData.amount" type="text" placeholder="Количество" name="uname" required>

        <label for="psw"><b>Срок поставки</b></label>
        <input v-model="applicationData.deliveryTime" type="text" placeholder="Срок" name="psw" required>

        <label for="psw"><b>Срок сбора предложений</b></label>
        <input v-model="applicationData.offerTime" type="text" placeholder="Срок" name="psw" required>

        <button @click="createApplication" type="submit">Создать</button>

      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applicationData: {
        amount: null,
        deliveryTime: null,
        offerTime: null,
      }
    }
  },
  methods: {
    createApplication() {
      this.$emit('createApplication', this.applicationData)
      this.applicationData.amount = null
      this.applicationData.deliveryTime = null
      this.applicationData.offerTime = null
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  box-sizing: border-box;
}


button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}
.app-container1 {
    width: auto;
    padding: 4rem;
    border-radius: 10px;
    position: relative;
    margin: 5px;
}
</style>