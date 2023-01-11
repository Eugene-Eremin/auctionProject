<template>
  <div class="app-container1">
  <select v-model="selected" @click="selectedFn" class="box">
    <option v-for="productName in arrayProductNames" v-bind:value="productName.id">{{ productName.name }}</option>
  </select>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selected: null
    }
  },
  props: {
    arrayProductNames: {
      type: Array,
      required: true
    }
  },
  methods: {
    loadProductName() {
      this.$emit('loadProductName');
    },
    selectedFn() {
      this.$emit('chosenProductName', this.selected)
    }
  },
  mounted() {
    this.loadProductName()
  }
}
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  border: 1px solid #999;
  font-size: 18px;
  color: #4CAF50;
  border-radius: 5px;
}

.app-container1 {
  width: auto;
    padding: 4rem;
    border-radius: 10px;
    position: relative;
    margin: 5px;
}
</style>