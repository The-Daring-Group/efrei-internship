<script setup lang="ts">
import { useSessionStore, type UserType } from '#imports';

const sessionStore = useSessionStore();

const email = ref('')
const password = ref('')

const isError = ref(false)
const errorMessage = ref('')

const login = async () => {
  try {
    const response = await useFetch<UserType>('http://localhost:3000/api-staff/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })

    if (response.status.value === "success" && response.data.value !== null) {
      sessionStore.login(response.data.value)
      navigateTo('/')
    } else {
      isError.value = true
      if (response.error.value !== null && response.error.value.statusCode !== 500) {
        errorMessage.value = response.error.value.data.error
      } else {
        errorMessage.value = "Back server is down"
      }
    }
  } catch (error) {
    isError.value = true
    errorMessage.value = (error as Error).message;
  }
}
</script>

<template>
  <div id="background">
    <div id="loginForm">
      <div>
        <h2>Connexion</h2>
        <h3>Utiliser votre Email Efrei</h3>
      </div>
      <p v-if="isError">{{ errorMessage }}</p>
      <form @submit.prevent="login" id="login">
        <input type="email" v-model="email" required placeholder="Email" />
        <input type="password" v-model="password" required placeholder="Mot de passe" />
      </form>
      <button type="submit" @click="login" form="login">Se connecter</button>
    </div>
  </div>
</template>

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