<template>
  <div>
    <h1>Begin Internship Input Form</h1>

    <form @submit.prevent="submitData">
      <div v-for="question in questionnaireQuestions" :key="question.id">
        <label>{{ question.name }}</label>
        <input v-model="beginInternshipData[question.id]" />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        beginInternshipData: {},
        questionnaireQuestions: [],
      };
    },
    mounted() {
      // Fetch questionnaire questions from the server
      fetch('/api/questionnaire/questions')
        .then((response) => response.json())
        .then((data) => {
          this.questionnaireQuestions = data;
        });
    },
    methods: {
      submitData() {
        console.log(this.beginInternshipData);
        fetch('/api/internship/begin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.beginInternshipData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Server response:', data);
          });
        },
      },
    };
  </script>
  