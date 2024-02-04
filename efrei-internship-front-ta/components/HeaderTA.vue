<template>
    <div class="tw-bg-gradient-to-r tw-shadow-md tw-text-white tw-from-cyan-500 tw-via-cyan-300 tw-to-sky-600">
        <div class="tw-text-xl tw-mb-1 tw-m-2">/// Efrei Internship | Academic Tutor Section</div>
        <nav class="tw-flex tw-flex-row tw-items-center tw-justify-between">
            <ul class="tw-flex tw-flex-row">
                <li class="hover:tw-bg-cyan-800 tw-bg-cyan-600 tw-w-fit tw-py-2 tw-px-2.5 tw-mx-2">
                    <NuxtLink to="/">
                        <span>
                            <font-awesome-icon icon="fa-house" />
                        </span>
                    </NuxtLink>
                </li>
                <li class="hover:tw-bg-cyan-800 tw-bg-cyan-600 tw-w-fit tw-p-2"><NuxtLink to="/internships/list">Internships</NuxtLink></li>
            </ul>
            <ul class="tw-flex tw-flex-row">
                <li class="hover:tw-bg-sky-800 tw-bg-sky-700 tw-text-sky-200 tw-w-fit tw-p-2 tw-mr-2 hover:tw-cursor-pointer" @click="logout">Disconnect <font-awesome-icon class="tw-ml-0.5" :icon="['fas', 'arrow-right-from-bracket']" /></li>
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