<template>
    <div class="tw-bg-gradient-to-r tw-shadow-md tw-text-white tw-from-cyan-500 tw-via-cyan-300 tw-to-sky-600">
        <div class="tw-text-xl tw-mb-1 tw-m-2">Efrei Internship | Academic Tutor Section</div>
        <nav class="tw-flex tw-flex-row tw-items-center tw-justify-between">
            <ul class="tw-flex tw-flex-row">
                <li class="hover:tw-bg-cyan-800 tw-bg-cyan-600 tw-w-fit tw-py-2 tw-px-2.5 tw-mx-2"><NuxtLink to="/"><font-awesome-icon class="" :icon="['fas', 'house']" /></NuxtLink></li>
                <li class="hover:tw-bg-cyan-800 tw-bg-cyan-600 tw-w-fit tw-p-2"><NuxtLink to="/internships/list">Internships</NuxtLink></li>
            </ul>
            <ul class="tw-flex tw-flex-row">
                <li class="hover:tw-bg-sky-800 tw-bg-sky-700 tw-text-sky-200 tw-w-fit tw-p-2" v-if="!isConnected"><NuxtLink to="../login">Login</NuxtLink></li>
                <li class="hover:tw-bg-sky-800 tw-bg-sky-700 tw-text-sky-200 tw-w-fit tw-p-2" v-else>Disconnect <font-awesome-icon class="tw-ml-0.5" :icon="['fas', 'arrow-right-from-bracket']" /></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isConnected: false
        }
    },
    // mounted() {
    //     // this.isConnected = this.$store.state.isConnected
    // },
    // watch: {
    //     isConnected() {
    //         this.isConnected = this.$store.state.isConnected
    //     }
    // },
}
</script>