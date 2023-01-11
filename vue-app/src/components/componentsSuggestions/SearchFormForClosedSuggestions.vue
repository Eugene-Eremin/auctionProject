<template>
  <form @submit.prevent>
    <my-input v-model="applicationName" placeholder="id предложения..."></my-input>
    <my-button @click="sendIdSuggestion">Найти</my-button>
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
    sendIdSuggestion() {
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