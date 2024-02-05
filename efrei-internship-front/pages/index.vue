<script setup lang="ts">
import { useSessionStore } from '#imports';
const sessionStore = useSessionStore();

const userInfos = ref(sessionStore.getUser)

const logout = () => {
  useFetch('http://localhost:3000/api/logout', {
    method: 'POST',
  }).then(() => {
    sessionStore.logout()
    navigateTo('/login')
  })
}

</script>

<template>
  <div class="m-5">
    <header class="flex flex-row justify-between">
      <nav>
        <ul class="text-blue-600">
          <li class="hover:text-blue-800">
            <NuxtLink to="login">Login</NuxtLink>
          </li>
          <li class="hover:text-blue-800">
            <NuxtLink to="about">About</NuxtLink>
          </li>
          <li class="hover:text-blue-800">
            <NuxtLink to="internship/Internships">Internships</NuxtLink>
          </li>
          <li class="hover:text-blue-800">
            <NuxtLink to="grades">Grades</NuxtLink>
          </li>
          <li class="hover:text-blue-800">
            <NuxtLink to="file">Documents</NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="flex flex-row">
        <div>
          <p>{{ userInfos.firstname + " " + userInfos.lastname }}</p>
          <p>{{ userInfos.email }}</p>
        </div>
        <button @click="logout">Logout</button>
      </div>
    </header>
    <div class="text-2xl text-center">Home Page - Child component below</div>
    <ButtonCounter />
  </div>
</template>