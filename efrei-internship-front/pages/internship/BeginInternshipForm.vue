<template>
    <div class="bg-[#f4f4f4]">
        <div class="text-2xl text-center pt-2">Begin Internship Form</div>

        <form @submit.prevent="submitData">
        <div v-for="question in questionnaireQuestions" :key="question.id">
            <label>{{ question.name }}</label>
            <input v-model="beginInternshipData[question.id]" />
        </div>

        <button class="bg-blue-500 text-white rounded-sm hover:cursor-pointer hover:bg-green-500 p-2 float-right mr-4" type="submit">Submit</button>
        </form>
    </div>
</template>
  
<script>
  import flatpickr from 'flatpickr';
  import 'flatpickr/dist/flatpickr.min.css';
  
  export default {
    data() {
      return {
        beginInternshipData: {},
        questionnaireQuestions: [],
      };
    },
    mounted() {
    
      flatpickr(this.$refs.startDate, {
        dateFormat: 'd-m-Y',
      });
  
      flatpickr(this.$refs.endDate, {
        dateFormat: 'd-m-Y',
      });
      // Fetch questionnaire questions from the server
      // Example using fetch API
      fetch('/api/questionnaire/questions')
        .then((response) => response.json())
        .then((data) => {
          this.questionnaireQuestions = data;
        });
    },
    methods: {
      submitData() {
        console.log(this.beginInternshipData);
        // Send the data to the server
        // Example using fetch API
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
  
<style>
  /* Styles can remain the same if you want to keep the styling consistent */
  div {
    margin-bottom: 15px;
  }
  
  h1 {
    color: #333;
    text-align: center;
  }
  
  label {
    margin-left: 2%;
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
  
  button:hover {
    transform: scale(1.2);
  }
</style>
  