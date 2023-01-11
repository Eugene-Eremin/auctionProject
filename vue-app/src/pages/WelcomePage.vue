<template>
  <div class="container">
    <div class="navbar">
      <div v-if="this.$store.state.inOut == 'Выйти'" class="authorizationPast">
        <div class="divEl" @click="logOut">{{ this.$store.state.inOut }}</div>
        <div class="divEl">|</div>
        <div class="divEl" @click="goPanel">{{ this.$store.state.login }}</div>
      </div>
      <div v-else class="authorization">
        <div @click="$router.push('/login')">{{ this.$store.state.inOut }}</div>
      </div>
    </div>
    <div class="app-container">
        <div class="content">
          Здравствуйте, вы находитесь на площадке <strong>"Auction"</strong>.
          <br>
          Войдите в свой профиль, если вы зарегистрированы администратором.
          <br><br>
          Если вы не зарегистрированы, обратитесь к администратору.
        </div>
    </div>
  </div>
</template>

<script>
export default {}
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
    background: rgba(255, 255, 255, .5);
    padding: 4rem;
    border-radius: 10px;
    position: relative;
    margin: 5px;
}

.navbar {
  height: 40px;
  background: rgba(0, 0, 0, 0);
  box-shadow: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  padding: 15px;
  color: white;
  font-family: Arial, sans-serif;
}
.authorizationPast {
  margin-left: auto;
  display: flex;
  align-items: center;
}
.divEl {
  margin-left: 5px
}
.authorization {
  margin-left: auto;
}
</style>