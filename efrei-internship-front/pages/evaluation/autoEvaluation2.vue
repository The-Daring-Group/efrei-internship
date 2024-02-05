<template>
  <div>
    <h1>Bilan Périodique</h1>
    <h2>Milieu de stage</h2>
    <h3 v-if="answered">Cette auto-évaluation a déjà été rempli/ne peut pas être rempli</h3>
    <form @submit.prevent="sendEvaluation">
      <label>
        Vos missions ont-elles évolué depuis le début de votre stage ? Si oui, quelles sont-elles ?
        Donnez des exemples concrets de la réalisation de ces missions
        <textarea name="input1" v-model="input1" required></textarea>
      </label>
      <label>
        Citez une de vos réalisations dont vous êtes fier/ère
        <textarea name="input2" v-model="input2" required></textarea>
      </label>
      <label>
        Comment avez-vous procédé pour mener à bien cette mission ?
        <textarea name="input3" v-model="input3" required></textarea>
      </label>
      <label>
        Quels ont été vos défis pendant votre stage ? Indiquez par exemple des points qui vous semblaient difficiles voire
        impossible à aborder lorsqu’ils vous ont été demandés
        <textarea name="input4" v-model="input4" required></textarea>
      </label>
      <label>
        Comment avez-vous réussi à les surmonter ? Ou avec le recul, comment auriez-vous pu les surmonter ?
        <textarea name="input5" v-model="input5" required></textarea>
      </label>
      <label>
        Comment votre stage confirme-t-il ou infirme-t-il votre projet professionnel ?
        <textarea name="input6" v-model="input6" required></textarea>
      </label>
      <div>
        <RadioWLabel :label="'Travailler en équipe ?'" :vmodel="radio1" :radioName="'radio1'" :options="[1, 2, 3, 4, 5]"
          @update:vmodel="updateRadio1" :answered="answered" />
        <label v-if="radio1 !== 0">
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio1Example" v-model="radio1Example" required></textarea>
        </label>
      </div>
      <div>
        <RadioWLabel :label="'Être autonome ?'" :vmodel="radio2" :radioName="'radio2'" :options="[1, 2, 3, 4, 5]"
          @update:vmodel="updateRadio2" :answered="answered" />
        <label v-if="radio2 !== 0">
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio2Example" v-model="radio2Example" required></textarea>
        </label>
      </div>
      <div>
        <RadioWLabel :label="'Être adaptable ?'" :vmodel="radio3" :radioName="'radio3'" :options="[1, 2, 3, 4, 5]"
          @update:vmodel="updateRadio3" :answered="answered" />
        <label v-if="radio3 !== 0">
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio3Example" v-model="radio3Example" required></textarea>
        </label>
      </div>
      <div>
        <RadioWLabel :label="'Organiser votre travail dans les délais ?'" :vmodel="radio4" :radioName="'radio4'"
          :options="[1, 2, 3, 4, 5]" @update:vmodel="updateRadio4" :answered="answered" />
        <label v-if="radio4 !== 0">
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio4Example" v-model="radio4Example" required></textarea>
        </label>
      </div>
      <div>
        <RadioWLabel :label="'Prendre des initiatives ?'" :vmodel="radio5" :radioName="'radio5'"
          :options="[1, 2, 3, 4, 5]" @update:vmodel="updateRadio5" :answered="answered" />
        <label v-if="radio5 !== 0">
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio5Example" v-model="radio5Example" required></textarea>
        </label>
      </div>
      <div>
        <RadioWLabel :label="'Réaliser un travail de qualité (rigueur professionnelle, être appliqué…) ?'"
          :vmodel="radio6" :radioName="'radio6'" :options="[1, 2, 3, 4, 5]" @update:vmodel="updateRadio6"
          :answered="answered" />
        <label v-if="radio6 !== 0">
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio6Example" v-model="radio6Example" required></textarea>
        </label>
      </div>
      <div>
        <label>
          Souhaitez-vous me contacter pour échanger sur le déroulement de votre stage ?
          <input type="checkbox" name="contactMe" v-model="contactMe">
        </label>
        <label v-if="contactMe">
          Si oui, par quel moyen (par téléphone, mail) ?
          <input type="text" name="contactWay" v-model="contactWay" required=contactMe>
        </label>
      </div>
      <input type="submit" value="Envoyer">
    </form>
  </div>
</template>

<script>
import { useSessionStore } from '#imports';

import RadioWLabel from "@/components/RadioWLabel.vue";
export default {
  components: {
    RadioWLabel
  },
  data() {
    return {
      userId: "",
      internshipId: 1, //TODO: get internshipId from the route

      answered: false,

      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      radio1: 0,
      radio1Example: "",
      radio2: 0,
      radio2Example: "",
      radio3: 0,
      radio3Example: "",
      radio4: 0,
      radio4Example: "",
      radio5: 0,
      radio5Example: "",
      radio6: 0,
      radio6Example: "",
      contactMe: false,
      contactWay: "",
    };
  },
  mounted() {
    const sessionStore = useSessionStore();
    this.userId = sessionStore.getUser.id;

    this.getIfAnswered().then(() => {
      if (this.answered) {
        this.showAnswerOnly();
      }
    });
  },
  methods: {
    updateRadio1(value) {
      this.radio1 = value;
    },
    updateRadio2(value) {
      this.radio2 = value;
    },
    updateRadio3(value) {
      this.radio3 = value;
    },
    updateRadio4(value) {
      this.radio4 = value;
    },
    updateRadio5(value) {
      this.radio5 = value;
    },
    updateRadio6(value) {
      this.radio6 = value;
    },

    async sendEvaluation(e) {
      const evaluation = {
        name: "autoEvaluation2",
        userId: this.userId,
        internshipId: this.internshipId,
        input1: this.input1,
        input2: this.input2,
        input3: this.input3,
        input4: this.input4,
        input5: this.input5,
        input6: this.input6,
        radio1: this.radio1,
        radio1Example: this.radio1Example,
        radio2: this.radio2,
        radio2Example: this.radio2Example,
        radio3: this.radio3,
        radio3Example: this.radio3Example,
        radio4: this.radio4,
        radio4Example: this.radio4Example,
        radio5: this.radio5,
        radio5Example: this.radio5Example,
        radio6: this.radio6,
        radio6Example: this.radio6Example,
        contactMe: this.contactMe,
        contactWay: this.contactWay,
      };
      await useFetch("http://localhost:3003/api/auto-evaluation", {
        method: "post",
        body: evaluation,
      }).then(() => {
        this.answered = true;
        this.showAnswerOnly();
      });
    },

    async getIfAnswered() {
      await useFetch(
        `http://localhost:3003/api/auto-evaluation/${this.userId}/${this.internshipId}/2`, {
        onResponse: ({ response }) => {
          if (response.status === 200) {
            const res = response._data;
            this.answered = true;
            this.input1 = res.input1;
            this.input2 = res.input2;
            this.input3 = res.input3;
            this.input4 = res.input4;
            this.input5 = res.input5;
            this.input6 = res.input6;
            this.radio1 = res.radio1;
            this.radio1Example = res.radio1_example;
            this.radio2 = res.radio2;
            this.radio2Example = res.radio2_example;
            this.radio3 = res.radio3;
            this.radio3Example = res.radio3_example;
            this.radio4 = res.radio4;
            this.radio4Example = res.radio4_example;
            this.radio5 = res.radio5;
            this.radio5Example = res.radio5_example;
            this.radio6 = res.radio6;
            this.radio6Example = res.radio6_example;
            this.contactMe = res.contact_tutor;
            this.contactWay = res.contact_way;
          }
        }
      });
    },

    showAnswerOnly() {
      const textareas = document.querySelectorAll("textarea");
      const inputs = document.querySelectorAll("input");

      textareas.forEach((textarea) => {
        textarea.disabled = true;
      });

      inputs.forEach((input) => {
        input.disabled = true;
      });
    }
  },
};
</script>

<style scoped>
label {
  margin-left: 2%;
  margin-right: 2%;
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input,
textarea {
  width: calc(100% - 4%);
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 2%;
  margin-right: 2%;
}

h1 {
  color: #333;
  text-align: center;
  font-size: larger;
  font-weight: bold;
}

h2 {
  text-align: center;
  font-size: large;
}

h3 {
  text-align: center;
  font-size: medium;
  color: #555;
  font-style: italic;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

button {
  width: 100%;
}
</style>