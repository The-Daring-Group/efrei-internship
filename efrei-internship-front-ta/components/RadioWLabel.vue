<template>
  <div>
    <label>
      {{ label }}
    </label>
    <div class="radioGrp">
      <label v-for="value in options" :key="value">
        {{ value }}
        <input type="radio" :value="value" :checked="selected === value" disabled>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    selected: {
      type: Number,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    }
  },
  methods: {
    showAnswerOnly() {
      const inputs = document.querySelectorAll('input');
      inputs.forEach((input) => {
        if (input.type === 'radio') {
          input.disabled = true;
        }
      });
    },
    updateVModel(value) {
      this.$emit('update:vmodel', value);
    },
  },
};
</script>

<style scoped>
.radioGrp {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 1rem;
}

label {
  margin-left: 2%;
  margin-right: 2%;
  display: block;
  margin-bottom: 5px;
  color: #555;
}
</style>
