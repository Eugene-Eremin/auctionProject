<template>
  <form @submit.prevent>
    <my-input v-model="applicationName" placeholder="login пользователя или id..."></my-input>
    <my-button @click="sendUserName">Найти</my-button>
  </form>
</template>


<script>
export default {
  data() {
    return {
      applicationName: ''
    }
  },
  methods: {
    sendUserName() {
      this.$emit('send', this.productName);
      this.applicationName = '';
    }
  }
}
</script>

<style scoped>
form {
  width: 100%;
}
</style>