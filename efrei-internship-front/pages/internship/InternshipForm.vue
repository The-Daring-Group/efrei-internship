<template>
  <div class="bg-[#f4f4f4]">
    <div class="text-2xl text-center pt-2">Internship Form</div>
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
      <div id="tutors">
        <label id="tutorA" for="tutor">Tutor Academy Email</label>
        <label id="tutorC" for="tutor">Tutor Company Email</label>
      </div>
      <div id="tutorsInput">
        <input id="tutor" v-model="internshipData.tutorAcademy" placeholder="Tutor Academy Email"/>
        <input id="tutor" v-model="internshipData.tutorCompany" placeholder="Tutor Academy Email"/>
      </div>
    </div>
    <div>
      <label for="startDate">Start Date</label>
      <input ref="startDate" v-model="internshipData.startDate" placeholder="Select Start Date" />
    </div>
    <div>
      <label for="endDate">End Date</label>
      <input ref="endDate" v-model="internshipData.endDate" placeholder="Select End Date" />
    </div>
    <button class="bg-blue-500 text-white rounded-sm hover:cursor-pointer hover:bg-green-500 p-2 float-right mr-4" @click="submitData">Submit</button>
  </div>
</template>

<script>
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default {
  mounted() {
    flatpickr(this.$refs.startDate, {
      dateFormat: 'd-m-Y',
    });

    flatpickr(this.$refs.endDate, {
      dateFormat: 'd-m-Y',
    });
  },
  data() {
    return {
      internshipData: {
        title: '',
        company: '',
        description: '',
        tutorAcademy: '',
        tutorCompany: '',
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
  #tutors {
    display: flex;
  }
  #tutorsInput {
    display: flex;
  }
  #tutorC {
    position: absolute;
    left: 54.5%;
    transform: translateX(-50%);
  }
</style>
