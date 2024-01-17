<script setup>
const count = ref(0)
</script>

<template>
    <button @click="count++">You clicked me {{ count }} times</button>
</template>