<script setup>
import axios from 'axios'
</script>

<template>
  <div id="background">
    <div id="loginForm">
      <div>
        <h2>Connexion</h2>
        <h3>Utiliser votre Email Efrei</h3>
      </div>
      <p v-if="isError">{{ errorMessage }}</p>
      <form>
        <input type="email" v-model="email" required placeholder="Email"/>
        <input type="password" v-model="password" required placeholder="Mot de passe"/>
      </form>
      <button type="submit" @click="login">Se connecter</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      isError: false,
      errorMessage: '',
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api-staff/login', {
          email: this.email,
          password: this.password,
        })

        if (response.status === 200) {
          // TODO: store token and user in vuex
          // this.$store.commit('setToken', response.data.token)
          // this.$store.commit('setUser', response.data.email)
          console.log(response.data.email)
          this.$router.push('/')
        }
      } catch (error) {
        this.isError = true
        this.errorMessage = error
      }
    },
  },
}
</script>

<style scoped>
#background {
  width: 100vw;
  height: 100vh;
  background-image: url(https://www.mondedesgrandesecoles.fr/wp-content/uploads/Efrei-Paris-Campus-Villejuif-ILab-Campus-05000-scaled.jpg);
  background-size: cover;
  display: flex;
  align-items: center;
  color: #163767;
}

#loginForm {
  width: 400px;
  height: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  margin-right: 5vw;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

h2 {
  font-size: 3rem;
  font-weight: bold;
}

h3 {
  font-weight: 700;
}

p {
  color: red;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100px;
}

input {
  height: 40px;
  border-radius: 5px;
  border: 1px solid #000000;
  padding: 0 10px;
}

button {
  color: white;
  background-color: #163767;
  border-radius: 5px;
  padding: 10px 20px;
}
</style>