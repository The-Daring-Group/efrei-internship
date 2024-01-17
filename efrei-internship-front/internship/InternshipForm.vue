<template>
  <div>
    <h1>Internship Input Form</h1>
    <input v-model="internshipData.title" placeholder="Title" />
    <input v-model="internshipData.company" placeholder="Company" />

    <button @click="submitData">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      internshipData: {
        title: '',
        company: ''
      },
    };
  },
  methods: {
    submitData() {
      console.log(this.internshipData);
    },
  },
};
</script>
