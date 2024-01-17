<template>
  <div>
    <h1>Internship Form</h1>
    <div>
      <label for="title">Title</label>
      <input id="title" v-model="internshipData.title" placeholder="Title"/>
    </div>
    <div>
      <label for="company">Company</label>
      <input id="company" v-model="internshipData.company" placeholder="Company"/>
    </div>
    <div>
      <label for="description">Description</label>
      <textarea id="description" v-model="internshipData.description" placeholder="Description"></textarea>
    </div>
    <div>
      <label for="tutor">Location</label>
      <input id="tutor" v-model="internshipData.location" placeholder="Location"/>
    </div>
    <div>
      <label for="tutor">Tutor</label>
      <input id="tutor" v-model="internshipData.tutor" placeholder="Tutor"/>
    </div>
    <div>
      <label for="startDate">Start Date</label>
      <input id="startDate" v-model="internshipData.startDate" placeholder="Start Date"/>
    </div>
    <div>
      <label for="endDate">End Date</label>
      <input id="endDate" v-model="internshipData.endDate" placeholder="End Date"/>
    </div>
    <button @click="submitData">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      internshipData: {
        title: '',
        company: '',
        description: '',
        tutor: '',
        startDate: '',
        endDate: '',
        location: ''
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

<style>
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
  }

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

  button {
    background-color: #228aff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
    margin-right: 2%;
  }

  .button-container {
    text-align: right; /* Align the button to the right */
  }

  button:hover {
    background-color: #45a049;
  }
</style>
