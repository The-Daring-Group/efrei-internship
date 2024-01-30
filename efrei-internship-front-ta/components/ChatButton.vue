<template>
    <NuxtLink :to="{path: '/internships/chat/' + userId,query: { i: internshipsId }}" class="tw-relative tw-bg-cyan-400 hover:tw-bg-cyan-600 hover:tw-cursor-pointer hover:tw-text-white tw-text-cyan-800 font-bold px-2 py-1 tw-rounded-md tw-w-11 tw-h-10 tw-border-cyan-600 tw-border-2 mr-4">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.5 3.5H3.5a2 2 0 00-2 2V18.5a2 2 0 002 2h6.07l1.75 1.75a1 1 0 001.42 0l2.33-2.33H20.5a2 2 0 002-2V5.5a2 2 0 00-2-2zM12 14l-2 2m0 0l-4-4m4 4l4-4"/>
        </svg>
        <div v-if="unreadCount > 0" class="tw-absolute tw-top-0 tw-right-1 tw-w-4 tw-h-4 tw-text-xs tw-text-white tw-bg-red-500 tw-rounded-full tw-flex tw-items-center tw-justify-center">
            {{ unreadCount < 10 ? unreadCount : '9+'}}
        </div>
    </NuxtLink>
</template>

<script>
    export default {
        props: {
            userId: {
                type: Number,
                required: true
            },
            sender: {
                type: Number,
                required: true
            },
            internshipsId: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                unreadCount : 0
            }
        },
        mounted() {
            this.getUnreadCount()
        },
        methods: {
            async getUnreadCount() {
                const {data, pending, error, refresh} = await useFetch('http://localhost:3002/api/messages/unread/' + this.userId + "/" + this.sender, {
                    method: 'GET',
                })
                //console.log(data.value)
                this.unreadCount = data.value ? data.value.length : 0
            }
        }
    }
</script>
