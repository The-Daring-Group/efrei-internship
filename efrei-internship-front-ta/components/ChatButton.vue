<template>
    <NuxtLink :to="'/internships/chat/' + userId"
        class="tw-relative tw-bg-blue-500 hover:tw-bg-blue-600 text-white font-bold px-2 rounded tw-w-11 tw-h-8">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20.5 3.5H3.5a2 2 0 00-2 2V18.5a2 2 0 002 2h6.07l1.75 1.75a1 1 0 001.42 0l2.33-2.33H20.5a2 2 0 002-2V5.5a2 2 0 00-2-2zM12 14l-2 2m0 0l-4-4m4 4l4-4" />
        </svg>
        <div v-if="unreadCount > 0"
            class="tw-absolute tw-top-0 tw-right-1 tw-w-4 tw-h-4 tw-text-xs tw-text-white tw-bg-red-500 tw-rounded-full tw-flex tw-items-center tw-justify-center">
            {{ unreadCount < 10 ? unreadCount : '9+' }} </div>
    </NuxtLink>
</template>

<script>
export default {
    /*props: {
        userId: {
            type: Number,
            required: true
        }
    },*/
    data() {
        return {
            unreadCount: 0,
            userId: 1,
            sender: 2,
        }
    },
    mounted() {
        this.getUnreadCount()
    },
    methods: {
        async getUnreadCount() {
            const response = await useFetch("http://localhost:3002/api/messages/unread/" + this.userId + "/" + this.sender)
            console.log(response.data.value.length)
            this.unreadCount = response.data.value.length
        }
    }
}
</script>
