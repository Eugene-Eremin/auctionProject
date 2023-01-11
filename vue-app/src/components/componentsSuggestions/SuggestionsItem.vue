<template>
  <div class="product">
    <div>
      <div><strong>id:</strong> {{ suggestion.id }}</div>
      <div><strong>Поставщик:</strong> {{ this.userName }}</div>
      <div><strong>Цена:</strong> {{ suggestion.price }}</div>
      <div><strong>Комментарий:</strong> {{ suggestion.comment }}</div>
    </div>
    <button @click="chooseOffer" class="btn">Выбрать</button>
  </div>
</template>

<script>
import axios from "axios";


export default {
  props: {
    applicationOne: {
      type: Object,
      required: true,
    },
    suggestion: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      userName: ''
    }
  },
  methods: {
    getLoginUser() {
      axios.post("http://localhost:5000/api/users/get_one_user", {
        userId: this.suggestion.userId
      }, {
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        }
      }).then(res => {
        this.userName = res.data
      }).catch((e) => {
        console.log(e.message);
      })
    },
    chooseOffer() {
      if (this.applicationOne.status == true) {
        console.log('Выбрать предложение можно только один раз')
      } else {
        this.goPostOffer()
      }
    },
    goPostOffer() {
      axios.post("http://localhost:5000/api/suggestions_accepteds/post_suggestions_accepteds", {
        suggestionId: this.suggestion.id
      }, {
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        }
      }).then(res => {
        console.log(this.applicationOne.id)
        // Изменение status поля на true
        axios.post("http://localhost:5000/api/applications/update_application_status", {
          applicationId: this.applicationOne.id
        }, {
          headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
          }
        }).then(res => {
          this.$emit('selected')

          console.log('выбрано')
        }).catch((e) => {
          console.log(e.message);
        })
      }).catch((e) => {
        console.log(e.message);
      })
    }

  },
  mounted() {
    this.getLoginUser()
  }
}
</script>

<style scoped>
.product {
  padding: 15px;
  border: 2px solid darkgreen;
  margin-top: 15px;
  display: flex;
  text-align: left;
  justify-content: left;
  width: 100%;
}

.btn {
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  width: 20%;
  height: 30%;
  padding: 10px 15px;
  background: none;
  color: darkgreen;
  border: 2px solid darkgreen;
}
</style>