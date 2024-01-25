<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/internships/list">Internships</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <h1 class="text-3xl font-bold text-center mb-4">Chat with <b>{{ receiverName }}</b></h1>

    <!-- Liste des messages -->
    <ul class="messages-list">
      <li
        v-for="message in messages"
        :key="message.id"
        :class="{
          sent: message.id_sender === sender,
          received: message.id_receiver === sender,
        }"
      >
        <span v-if="message.id_sender === sender && !message.is_read" class="unread-icon">🔴</span>
        {{ message.content }}
      </li>
    </ul>

    <!-- Interface d'envoi de messages -->
    <form @submit.prevent="sendMessage" class="message-input">
      <input
        type="text"
        v-model="newMessage"
        placeholder="Type your message here..."
      />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

// obtain the id from the URL
export default {
  data() {
    return {
      receiver: this.$route.params.id,
      receiverName: "",
      sender: 2,
      messages: [],
      newMessage: "",
      intervalId: null,
    };
  },
  mounted() {
    //console.log(this.$route.params.id)
    this.getReceiverName();
    this.getMessages().then(() => {
      this.markUnreadMessagesAsRead();
    });

    // Rechargez les messages toutes les 5 secondes
    this.intervalId = setInterval(() => {
      this.getMessages().then(() => {
        this.markUnreadMessagesAsRead();
      });
    }, 7000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.intervalId);
    next();
  },
  methods: {
    async getReceiverName() {
      const response = await axios.get(
        "http://localhost:3002/api/user/" + this.receiver
      );
      this.receiverName = response.data[0].firstname + " " + response.data[0].lastname;
    },
    async getMessages() {
      const response = await axios.get(
        "http://localhost:3002/api/messages/" +
          this.receiver +
          "/" +
          this.sender
      );
      this.messages = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    async sendMessage() {
      const response = await axios.post("http://localhost:3002/api/messages", {
        id_sender: this.sender,
        id_receiver: this.receiver,
        content: this.newMessage,
      });
      //this.messages.push(response.data)
      this.newMessage = "";
      this.getMessages();
    },
    async markAsRead(messageId) {
      const response = await axios.put(
        "http://localhost:3002/api/messages/read/" + messageId
      );
      console.log(response.data);
    },
    async markUnreadMessagesAsRead() {
      const unreadMessages = this.messages.filter(
        (message) => message.id_receiver === this.sender && !message.is_read
      );
      console.log("unreadMessages", unreadMessages);

      // Créez un tableau de promesses pour toutes les requêtes de marquage comme lus
      const markAsReadPromises = unreadMessages.map(async (message) => {
        await this.markAsRead(message.id);
      });

      // Exécutez toutes les promesses simultanément
      await Promise.all(markAsReadPromises);
    },
  },
};
</script>

<style scoped>
.message-input {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message-input input {
  flex: 1;
  margin-right: 10px;
}

.message-input button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
}

.messages-list {
  list-style: none;
  padding: 4px;
  display: flex;
  flex-direction: column;
}

.messages-list li {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
}

.sent {
  background-color: #007bff;
  color: white;
  align-self: flex-end;
}

.received {
  background-color: #f0f0f0;
  color: black;
  align-self: flex-start;
}
</style>
