<template>
    <div class="tw-p-2 tw-border-b-2 tw-border-black">
        <div class="tw-text-xl tw-mb-1">Efrei Internship | Academic Tutor Section</div>
        <nav>
            <ul class="tw-text-white tw-bg-teal-500 tw-p-1 tw-rounded-md tw-flex tw-flex-row tw-justify-between">
                <li class="hover:tw-bg-teal-800 tw-bg-teal-600 tw-w-fit tw-p-2 tw-rounded-md"><NuxtLink to="/internships/list">Internships</NuxtLink></li>
                <li class="hover:tw-bg-teal-200 tw-bg-teal-100 tw-text-teal-700 tw-w-fit tw-p-2 tw-rounded-md" v-if="!isConnected"><NuxtLink to="../login">Login</NuxtLink></li>
                <li class="hover:tw-bg-teal-200 tw-bg-teal-100 tw-text-teal-700 tw-w-fit tw-p-2 tw-rounded-md" v-else>Disconnect <font-awesome-icon class="tw-ml-0.5" :icon="['fas', 'arrow-right-from-bracket']" /></li>
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