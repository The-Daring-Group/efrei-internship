<script setup lang="ts">
import { useSessionStore } from '#imports';
const sessionStore = useSessionStore();

const userInfos = ref(sessionStore.getUser)

const logout = () => {
    useFetch('http://localhost:3000/api-staff/logout', {
        method: 'POST',
    }).then(() => {
        sessionStore.logout()
        navigateTo('/login')
    })
}

</script>

<template>
    <HeaderTA />
    <div class="tw-m-5">
        <div class="tw-text-2xl text-center">Academic Tutor Welcome Page</div>
    </div>
</template>