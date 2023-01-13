<template>
  <div class="container">
    <div class="app-container">
  <h1>Заявка</h1>
  <div class="product">
    <div><strong>id:</strong> {{ applicationOne.id }}</div>
    <div><strong>Наименование продукта:</strong> {{ applicationProductName }}</div>
    <div><strong>Количество:</strong> {{ applicationOne.amount }}</div>
    <div><strong>Период доставки:</strong> {{ applicationOne.delivery_time }}</div>
    <div><strong>Период принятия заявок:</strong> {{ applicationOne.offer_time }}</div>
    <div><strong>Статус заявки:</strong> {{ (applicationOne.status == false ? 'Открытая' : 'Закрытая') }}</div>
  </div>
  <div class="buttons">
    <button class="buttonSwitchingYell" @click="this.$router.push('/applications')">Назад</button>
    <button class="buttonSwitching" @click="previous">Предыдущая</button>
    <button class="buttonSwitching" @click="next">Следующая</button>
  </div>
  <div class="line"></div>
  <div class="suggestions">
    <h2>Ваше предложение</h2>
    <form @submit.prevent>
      <div class="buy-container">
        <label for="uname"><b>Введите цену</b></label>
        <input v-model="price" type="text" placeholder="Цена" name="uname" required>

        <label for="psw"><b>Ваш комментарий</b></label><br>
        <label for="psw">(не обязательно)</label>
        <input v-model="comment" type="text" placeholder="Комментарий" name="psw" required>

        <button @click="suggest" type="submit">Предложить</button>

      </div>
    </form>
  </div>
  <!-- видит только админ -->
  <div v-if="divOnOrOff == true" class="for-admin-div">
    <div class="lineR"></div>
    <div class="hs">
      <h2>Просмотр предложений</h2><br>
      <h3>(для администраторов)</h3>
    </div>
    <div class="lineR"></div>
    <!-- div с принятым предложением / виден когда админ принял какое то предложение -->
    <div class="hs">
      <h2>Выбранное предложение</h2>
    </div>
    <div class="product">
      <div v-if="suggestionOne == 'No'">
        У этой заявки нет выбранного предложения
      </div>
      <div v-else>
        <div><strong>id:</strong> {{ suggestionOne.id }}</div>
        <div><strong>id поставщика:</strong> {{ suggestionOne.userId }}</div>
        <div><strong>Цена:</strong> {{ suggestionOne.price }}</div>
        <div><strong>Комментарий:</strong> {{ suggestionOne.comment }}</div>
      </div>
    </div>
    <div class="line"></div>
    <!-- div со всеми предложениями на эту заявку -->
    <div class="hs">
      <h2>Все предложения</h2>
    </div>
    <div class="application">
      <search-form-for-suggestions class="indent"></search-form-for-suggestions>
      <div class="layer">
        <suggestions-list
            @selected="selected"
            :applicationOne="applicationOne"
            :arraySuggestions="arraySuggestions"></suggestions-list>
<!--        <div v-intersection="getSuggestions" class="observer"></div>-->
      </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router/router";

import SearchFormForSuggestions from "@/components/componentsSuggestions/SearchFormForSuggestions.vue";
import SuggestionsList from "@/components/componentsSuggestions/SuggestionsList.vue";

export default {
  components: {
    SuggestionsList,
    SearchFormForSuggestions
  },
  data() {
    return {
      suggestionOne: 'No',

      applicationProductName: '',
      applicationOne: {},
      price: '',
      comment: '',
      count: 0,

      arraySuggestions: [],

      divOnOrOff: false,
    }
  },
  methods: {
    loadApplication() {
      this.suggestionOne = "No";
      axios.get(`http://localhost:5000/api/applications/${this.$store.state.applicationId}`,{
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        }
      }).then(res => {
        this.count = res.data.id
        this.applicationOne = {}
        this.applicationOne = res.data
        this.findProductName()
        this.divForAdmin()
      }).catch((e) => {
        console.log(e.message);
      })
    },
    findProductName() {
      axios.post("http://localhost:5000/api/product_names/get_one_product_name", {
        id: this.applicationOne.productNameId
      }, {
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        }
      }).then(res => {
        this.applicationProductName = res.data
      }).catch((e) => {
        console.log(e.message);
      })
    },
    getSelectedSuggestions() {
        axios.post('http://localhost:5000/api/suggestions/get_selected_suggestions', {
          applicationId: this.applicationOne.id
        }, {
          headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
          }
        }).then(res => {
          this.suggestionOne = res.data
          console.log(this.suggestionOne)
        }).catch((e) => {
          console.log(e.message)
        })
    },
    suggest() {
      axios.post("http://localhost:5000/api/suggestions/post_suggestions", {
        price: this.price,
        comment: this.comment,
        applicationId: this.applicationOne.id
      }, {
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        }
      }).then(res => {
        this.divForAdmin()
        this.price = ''
        this.comment = ''
      }).catch((e) => {
        console.log(e.message);
      })
    },
    divForAdmin() {
      axios.get(`http://localhost:5000/api/users/${this.$store.state.login}`,{
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        }
      }).then(res => {
        (res.data == 'USER') ? this.divOnOrOff = false : this.divOnOrOff = true
        this.getSuggestions()
      }).catch((e) => {
        console.log(e.message);
      })
    },
    getSuggestions() {
      axios.post('http://localhost:5000/api/suggestions/all_suggestions', {
        applicationId: this.applicationOne.id
      },{
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        },
        params: {
          limit: this.limit,
          page: this.page
        }
      }).then(res => {
        this.arraySuggestions = []
        this.arraySuggestions = [...this.arraySuggestions, ...res.data['rows']];
        this.getSelectedSuggestions()
      }).catch((e) => {
        console.log(e.message)
      })
    },
    previous() {
      this.count--
      this.$store.commit('setApplicationId', this.count)
      this.loadApplication()
    },
    next() {
      this.count++
      this.$store.commit('setApplicationId', this.count)
      this.loadApplication()
    },

    selected() {
      this.loadApplication()
    }
  },
  mounted() {
    this.loadApplication()
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
h1, .hs {
  text-align: center;
  margin: 10px;
  margin-top: 20px;
}

.application {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  width: 60%;
}

.product {
  padding: 15px;
  border: 2px solid darkgreen;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  width: 60%;
}

.indent {
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 60%;
}
.buttonSwitching {
  margin-left: auto;
  margin-right: auto;
  width: 20%;
  height: 30%;
  padding: 10px 15px;
  background: none;
  color: darkgreen;
  border: 2px solid darkgreen;
}

.buttonSwitchingYell {
  margin-left: auto;
  margin-right: auto;
  width: 20%;
  height: 30%;
  padding: 10px 15px;
  background: none;
  color: black;
  border: 2px solid black;
}

.line {
  border-bottom: 1px solid grey;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  width: 80%;
}

.lineR {
  border-bottom: 2px solid darkred;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  width: 80%;
}

.suggestions {
  text-align: center;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  width: 60%;
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

.app-container {
    width: 1000px;
    background: rgba(255, 255, 255, .5);
    padding: 4rem;
    border-radius: 10px;
    position: relative;
    margin: 5px;
}
</style>