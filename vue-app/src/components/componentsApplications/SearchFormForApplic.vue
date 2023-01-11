<template>
  <form @submit.prevent>
    <my-input v-model="applicationName" placeholder="Наим. продукта или id заявки..."></my-input>
    <my-button @click="sendApplicationName">Найти</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      applicationName: null,
    }
  },
  methods: {
    sendApplicationName() {
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

.my-button {
  width: 500px;
}
</style>