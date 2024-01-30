<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><NuxtLink to="/" @click="clearInterval">Home</NuxtLink></li>
          <li><NuxtLink to="/internships/list" @click="clearInterval">Internships</NuxtLink></li>
        </ul>
      </nav>
    </header>

    <div class="navigation-buttons">
      <button :disabled="!conversationBefore" @click="navigateConversation(-1)">
        &lt; Previous
      </button>
      <h1 class="text-3xl font-bold text-center tw-mr-4 tw-ml-4">Chat with <b>{{ receiverName }}</b></h1>
      <button :disabled="!conversationAfter" @click="navigateConversation(1)">
        Next &gt;
      </button>
    </div>

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
export default {
  data() {
    return {
      receiver: this.$route.params.id,
      receiverName: "",
      sender: 2,
      messages: [],
      newMessage: "",
      intervalId: null,
      conversationBefore: false,
      conversationAfter: false,
      internshipsId: null,
      indexReceiver: null,
    };
  },
  created() {
    //Récupére l'id dans l'url
    this.internshipsId = this.$route.query.i;
  },
  mounted() {
    this.getReceiverName();
    this.isConversationBeforeAfter();
    this.getMessages().then(() => {
      this.markUnreadMessagesAsRead();
    });

    // Rechargez les messages toutes les 5 secondes
    this.intervalId = setInterval(() => {
      this.getMessages().then(() => {
        //console.log("interval getMessages")
        this.markUnreadMessagesAsRead();
      });
    }, 7000);
  },
  methods: {
    clearInterval() {
      if (this.intervalId) {
        //console.log("clearInterval")
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    async getReceiverName() {
      const {data, pending, error, refresh} = await useFetch(
        "http://localhost:3002/api/user/" + this.receiver, {
          method: "GET",
        });
      this.receiverName = data.value ? data.value[0].firstname + " " + data.value[0].lastname : "";
    },
    async getMessages() {
      const {data, pending, error, refresh} = await useFetch(
        "http://localhost:3002/api/messages/" +
          this.receiver +
          "/" +
          this.sender, {
            method: "GET",
          }
      );
      this.messages = data.value ? data.value.sort((a, b) => new Date(a.date) - new Date(b.date)) : [];
    },
    async sendMessage() {
      const {data, pending, error, refresh} = await useFetch(
        "http://localhost:3002/api/messages/", {
            method: "POST",
            body: {
              id_sender: this.sender,
              id_receiver: this.receiver,
              content: this.newMessage,
            }
          }
      );
      //this.messages.push(data.value)
      this.newMessage = "";
      this.getMessages();
    },
    async markAsRead(messageId) {
      const { data, pending, error, refresh } = await useFetch(
        "http://localhost:3002/api/messages/read/" + messageId, {
          method: "PUT",
        }
      );
      //console.log(data.value);
    },
    async markUnreadMessagesAsRead() {
      const unreadMessages = this.messages.filter(
        (message) => message.id_receiver === this.sender && !message.is_read
      );
      //console.log("unreadMessages", unreadMessages);

      // Créez un tableau de promesses pour toutes les requêtes de marquage comme lus
      const markAsReadPromises = unreadMessages.map(async (message) => {
        await this.markAsRead(message.id);
      });

      // Exécutez toutes les promesses simultanément
      await Promise.all(markAsReadPromises);
    },
    async isConversationBeforeAfter() {
      this.indexReceiver = this.internshipsId.indexOf(this.receiver);
      
      // If receiver is not found or it is the first element, set false
      if (this.indexReceiver <= 0) {
        this.conversationBefore = false;
      } else { // If there is an element before receiver in internshipsId, set true
        this.conversationBefore = true;
      }

      // If receiver is not found or it is the last element, set false
      if (this.indexReceiver < 0 || this.indexReceiver === this.internshipsId.length - 1) {
        this.conversationAfter = false;
      } else {
        // If there is an element after receiver in internshipsId, set true
        this.conversationAfter = true;
      }
    },
    navigateConversation(offset) {
      this.clearInterval()
      const newIndex = this.indexReceiver + offset;
      const id = this.internshipsId[newIndex];
      this.$router.push({ path: `/internships/chat/${id}`, query: { i: this.internshipsId } });
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


.navigation-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.navigation-buttons button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
}

.navigation-buttons button:hover {
  background-color: #0069d9;
}

.navigation-buttons button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>
