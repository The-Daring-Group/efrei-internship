<template>
  <div>
    <h1>Bilan Périodique</h1>
    <h2>Milieu de stage</h2>
    <form>
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
          @update:vmodel="updateRadio1" />
        <label v-if="radio1 !== 0">
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio1Example" v-model="radio1Example" required></textarea>
        </label>
      </div>
      <div>
        <RadioWLabel :label="'Être autonome ?'" :vmodel="radio2" :radioName="'radio2'" :options="[1, 2, 3, 4, 5]"
          @update:vmodel="updateRadio2" />
        <label v-if="radio2 !== 0">
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio2Example" v-model="radio2Example" required></textarea>
        </label>
      </div>
      <div>
        <RadioWLabel :label="'Être adaptable ?'" :vmodel="radio3" :radioName="'radio3'" :options="[1, 2, 3, 4, 5]"
          @update:vmodel="updateRadio3" />
        <label v-if="radio3 !== 0">
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio3Example" v-model="radio3Example" required></textarea>
        </label>
      </div>
      <div>
        <RadioWLabel :label="'Organiser votre travail dans les délais ?'" :vmodel="radio4" :radioName="'radio4'"
          :options="[1, 2, 3, 4, 5]" @update:vmodel="updateRadio4" />
        <label v-if="radio4 !== 0">
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio4Example" v-model="radio4Example" required></textarea>
        </label>
      </div>
      <div>
        <RadioWLabel :label="'Prendre des initiatives ?'" :vmodel="radio5" :radioName="'radio5'"
          :options="[1, 2, 3, 4, 5]" @update:vmodel="updateRadio5" />
        <label v-if="radio5 !== 0">
          Pourquoi vous êtes-vous attribué cette note ? Donnez un exemple concret :
          <textarea name="radio5Example" v-model="radio5Example" required></textarea>
        </label>
      </div>
      <div>
        <RadioWLabel :label="'Réaliser un travail de qualité (rigueur professionnelle, être appliqué…) ?'"
          :vmodel="radio6" :radioName="'radio6'" :options="[1, 2, 3, 4, 5]" @update:vmodel="updateradio6" />
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
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import RadioWLabel from "@/components/RadioWLabel.vue";
export default {
  components: {
    RadioWLabel
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
      contactWay: "",
    };
  },
  computed() {
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

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

button {
  width: 100%;
}
</style>