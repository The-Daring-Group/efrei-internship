<template>
    <div class="bg-gradient-to-r shadow-md text-white from-cyan-500 via-cyan-300 to-sky-600">
        <div class="text-xl mb-1 p-2">/// Efrei Internship | Student Section</div>
        <nav class="flex flex-row items-center justify-between">
            <ul class="flex flex-row">
                <li class="hover:bg-cyan-800 bg-cyan-600 w-fit py-2 px-2.5 mx-2">
                    <NuxtLink to="/">
                        <span>
                            <font-awesome-icon icon="fa-house" />
                        </span>
                    </NuxtLink>
                </li>
                <li class="hover:bg-cyan-800 bg-cyan-600 w-fit p-2"><NuxtLink to="/internship/list">Internships</NuxtLink></li>
                <li class="mx-2 hover:bg-cyan-800 bg-cyan-600 w-fit p-2"><NuxtLink to="/file">Documents</NuxtLink></li>
                <li class="hover:bg-cyan-800 bg-cyan-600 w-fit mx-2 p-2">
                    <NuxtLink to="/grades">Grades</NuxtLink>
                </li>
                <li class="hover:bg-cyan-800 bg-cyan-600 w-fit p-2">
                    <NuxtLink to="/about">About</NuxtLink>
                </li>
            </ul>
            <ul class="flex flex-row">
                <li class="hover:bg-sky-800 bg-sky-700 text-sky-200 w-fit p-2 mr-2 hover:cursor-pointer" @click="logout">Disconnect <font-awesome-icon class="ml-0.5" :icon="['fas', 'arrow-right-from-bracket']" /></li>
            </ul>
        </nav>
    </div>
</template>

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