<template>
  <div class="container">
  <div class="app-container">
    <h2 class="indent">Предложения</h2>
    <div class="section">
      <div class="content">
        <h4 class="indent">Ваши предложения</h4>
        <search-form-for-suggestions class="indent"></search-form-for-suggestions>
        <div class="layer">
          <SuggestionsListUser :arraySuggestions="arraySuggestions"></SuggestionsListUser>
        </div>
      </div>
      <div class="content">
        <h4 class="indent">Ваши принятые предложения</h4>
        <SearchFormForClosedSuggestions class="indent"></SearchFormForClosedSuggestions>
        <div class="layer">
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import SearchFormForSuggestions from "@/components/componentsSuggestions/SearchFormForSuggestions.vue";
import SearchFormForClosedSuggestions from "@/components/componentsSuggestions/SearchFormForClosedSuggestions.vue";
import SuggestionsListUser from "@/components/componentsSuggestions/SuggestionsListUser.vue";
import axios from "axios";

export default {
  components: {
    SearchFormForSuggestions,
    SearchFormForClosedSuggestions,
    SuggestionsListUser
  },
  data() {
    return {
      userId: 0,
      arraySuggestions: []
    }
  },
  methods: {
    userIdFind() {
      axios.get(`http://localhost:5000/api/users/checkId/${this.$store.state.login}`,{
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        }
      }).then(res => {
        this.userId = res.data
        this.suggestionsUser()
      }).catch((e) => {
        console.log(e.message);
      })
    },

    suggestionsUser() {
      axios.get(`http://localhost:5000/api/suggestions/all_suggestions_for_user/${this.userId}`,{
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        }
      }).then(res => {
        this.arraySuggestions = res.data['rows']
        console.log(this.arraySuggestions)
        this.suggestionsAcceptedUser()
      }).catch((e) => {
        console.log(e.message);
      })
    },

    suggestionsAcceptedUser() {
      axios.get(`http://localhost:5000/api/suggestions/all_suggestions_accepted_for_user/${this.userId}`,{
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        }
      }).then(res => {
        console.log(res.data)
      }).catch((e) => {
        console.log(e.message);
      })
    },
  },

  mounted() {
    this.userIdFind()
  }
}
</script>

<style scoped>
.main {
  width: 80%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.section {
  display: flex;
}

.content {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  width: 50%;
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
.layer {
  width: 100%;
  height: 510px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  margin-left: auto;
  margin-right: auto;
  padding: 5px
}

.indent {
  margin-bottom: 20px;
}

.choice-product {
  width: 50px;
}

.product_name {
  display: flex;
  width: 100%;
}

.side {
  margin-left: auto;
  margin-right: auto;
  width: 65%;
}

.left-side {
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}
.application {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 60%;
}

.container {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(to right, #333399, #ff00ccb6);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
}
</style>