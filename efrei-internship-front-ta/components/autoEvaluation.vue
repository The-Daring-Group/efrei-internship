<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <h1>Auto Evaluation</h1>
      <h2>{{ h2() }}</h2>
      <label>
        {{ label1() }}
        <textarea name="input1" v-model="input1" disabled></textarea>
      </label>
      <label>
        {{ label2() }}
        <textarea name="input2" v-model="input2" disabled></textarea>
      </label>
      <label>
        {{ label3() }}
        <textarea name="input3" v-model="input3" disabled></textarea>
      </label>
      <label>
        {{ label4() }}
        <textarea name="input4" v-model="input4" disabled></textarea>
      </label>
      <label>
        {{ label5() }}
        <textarea name="input5" v-model="input5" disabled></textarea>
      </label>
      <label>
        {{ label6() }}
        <textarea name="input6" v-model="input6" disabled></textarea>
      </label>
      <div>
        <RadioWLabel :label="'Travailler en équipe ?'" :selected="radio1" :options="[1, 2, 3, 4, 5]" />
        <label>
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio1Example" v-model="radio1Example" disabled></textarea>
        </label>
      </div>
      <div>
        <RadioWLabel :label="'Être autonome ?'" :selected="radio2" :options="[1, 2, 3, 4, 5]" />
        <label>
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio2Example" v-model="radio2Example" disabled></textarea>
        </label>
      </div>
      <div>
        <RadioWLabel :label="'Être adaptable ?'" :selected="radio3" :options="[1, 2, 3, 4, 5]" />
        <label>
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio3Example" v-model="radio3Example" disabled></textarea>
        </label>
      </div>
      <div>
        <RadioWLabel :label="'Respecter les délais fixés ?'" :selected="radio4" :options="[1, 2, 3, 4, 5]" />
        <label>
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio4Example" v-model="radio4Example" disabled></textarea>
        </label>
      </div>
      <div>
        <RadioWLabel :label="'Prendre des initiatives ?'" :selected="radio5" :options="[1, 2, 3, 4, 5]" />
        <label>
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio5Example" v-model="radio5Example" disabled></textarea>
        </label>
      </div>
      <div>
        <RadioWLabel :label="'Réaliser un travail de qualité (rigueur professionnelle, être appliqué…) ?'"
          :selected="radio6" :options="[1, 2, 3, 4, 5]" />
        <label>
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio6Example" v-model="radio6Example" disabled></textarea>
        </label>
      </div>
      <div>
        <label>
          Souhaitez-vous me contacter pour échanger sur le déroulement de votre stage ?
          <input type="checkbox" name="contactMe" v-model="contactMe" disabled>
        </label>
        <label v-if="contactMe">
          Si oui, par quel moyen (par téléphone, mail) ?
          <input type="text" name="contactWay" v-model="contactWay" disabled>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioWLabel from "@/components/RadioWLabel.vue";
export default {
  components: {
    RadioWLabel,
  },
  mounted() {
    this.fetchAutoEvaluation();
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
    internshipId: {
      type: String,
      required: true,
    },
    evalNum: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
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
      contactWay: ""
    };
  },
  methods: {
    h2() {
      if (this.evalNum === 1) {
        return "Début de stage";
      } else if (this.evalNum === 2) {
        return "Milieu de stage";
      } else {
        return "Fin de stage";
      }
    },

    label1() {
      if (this.evalNum === 1) {
        return `Qu’est-ce qui vous plaît et vous motive dans votre stage ?`;
      } else if (this.evalNum === 2) {
        return `Vos missions ont-elles évolué depuis le début de votre stage ? Si oui, quelles sont-elles ?
        Donnez des exemples concrets de la réalisation de ces missions`;
      } else {
        return `De manière générale, comment vos missions ont-elles évolué ? Expliquer comment s’est effectuée la transition entre
        vos premières missions et les dernières. Donnez vos impressions sur les raisons et les conséquences de cette
        évolution ?`;
      }
    },

    label2() {
      if (this.evalNum === 1) {
        return `Décrivez une situation de travail marquante que vous avez vécu pendant votre stage.`;
      } else if (this.evalNum === 2) {
        return `Citez une de vos réalisations dont vous êtes fier/ère`;
      } else {
        return `Quelles ont été vos meilleures réalisations pendant votre stage ?
        Donnez des exemples concrets.`;
      }
    },

    label3() {
      if (this.evalNum === 1) {
        return `Avez-vous rencontré, depuis le début de votre stage, une situation difficile ou problématique ? Si oui, comment
        avez-vous réagi ?`;
      } else if (this.evalNum === 2) {
        return `Comment avez-vous procédé pour mener à bien cette mission ?`;
      } else {
        return `Quels apprentissages pouvez-vous en tirer ?
        (Sur vos goûts, vos talents, vos limites, vos souhaits…)`;
      }
    },

    label4() {
      if (this.evalNum === 1) {
        return `Que retirez-vous comme apprentissages depuis le début de votre stage (culture d’entreprise, particularité du
        secteur, du métier…) ?`;
      } else if (this.evalNum === 2) {
        return `Quels ont été vos défis pendant votre stage ? Indiquez par exemple des points qui vous semblaient difficiles voire
        impossible à aborder lorsqu’ils vous ont été demandés`;
      } else {
        return `Quelles compétences avez-vous développé pour mener à bien vos missions ? Comment les avez-vous utilisées ?
        (Par exemple « j’ai développé la compétence d’utilisation du logiciel Excel en faisant des tableaux dynamiques »)`;
      }
    },

    label5() {
      if (this.evalNum === 1) {
        return `Comment gérez-vous les délais dans votre travail ?`;
      } else if (this.evalNum === 2) {
        return `Comment avez-vous réussi à les surmonter ? Ou avec le recul, comment auriez-vous pu les surmonter ?`;
      } else {
        return `Quel bilan faites-vous de votre projet professionnel (objectif professionnel, idée(s) de métier, orientations
        professionnelles à venir…) à la fin de votre stage ?`;
      }
    },

    label6() {
      if (this.evalNum === 1) {
        return `De quelle(s) manière(s) utilisez-vous vos capacités/talents dans votre stage ? Donnez des exemples concrets`;
      } else if (this.evalNum === 2) {
        return `Comment votre stage confirme-t-il ou infirme-t-il votre projet professionnel ?`;
      } else {
        return ``;
      }
    },

    fetchAutoEvaluation() {
      useFetch(
        `http://localhost:3003/api/auto-evaluation/${this.userId}/${this.evalNum}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(({ data }) => {
          const res = data.value;
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
          this.contactMe = res.contactMe;
          this.contactWay = res.contactWay;
        });
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: 80vh;
  width: 60vw;
  margin-top: 5%;
  padding: 60px 0;
  border-radius: 20px;
  overflow-y: auto;
}

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