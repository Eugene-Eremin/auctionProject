<template>
  <button class="btn">
    <slot></slot> <!--Тег, в который кладутся данные. Например: <my-button>Что то</my-button> - "Что то" положится сюда в <slot> -->
  </button>
</template>

<script>
export default {
  name: 'my-button'  // указываем имя компонента для тега <my-button>
}
</script>

<style scoped>
.btn {
  width: 20%;
  padding: 10px 15px;
  background: none;
  color: darkgreen;
  border: 2px solid darkgreen;
  border-left: 0px;
}
</style>