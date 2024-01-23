<template>
    <div>
      <h1>Chat with User {{ userId }}</h1>
      <!-- Ajoutez ici votre interface de chat, messages, etc. -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userId: null
      };
    },
    async fetch() {
      const userId = parseInt(this.$route.params.id, 10);
      console.log(userId);
      this.userId = userId;
    }
  };
  </script>
  