<!-- pages/internship.vue -->
<template>
  <div class="m-5">
    <div class="text-2xl text-center">Welcome to Internship Page</div>
      <div class="flex justify-center">
        <div class="text-xl text-center pr-10">You can register a new Internship :</div>
        <div class="bg-cyan-400 hover:bg-cyan-600 hover:text-white hover:cursor-pointer p-1.5 w-fit rounded-md text-cyan-800 border-cyan-600 border-2">
          <nuxt-link to="InternshipForm">Register </nuxt-link>
        </div>
      </div>
      <div>
        <div>
          <div class="text-center pr-10 font-extrabold text-2xl">
            You can see your Internships :
          </div>

          <div>
            <table id="test" class="bg-slate-200	mx-8 border-emerald-400">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody class="justify-center">
                <tr v-for="element in this.internships" :key="element.id">
                  <td>{{ element.title }}</td>
                  <td>{{ element.company_name }}</td>
                  <td>{{ element.description }}</td>
                  <td>{{ element.start_date }}</td>
                  <td>{{ element.end_date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { useSessionStore } from '#imports';
const sessionStore = useSessionStore();
const id_student = sessionStore.getUser.id
export default {
  mounted() {
    this.getInternships();
  },
  data() {
    return {
      internships: [],
    };
  },
  methods: {
    async getInternships() {
      await useFetch("http://localhost:3003/api/get-internship-student/" + id_student, {
        method: 'get',
      })
      this.internships = data.value.internship
    },
  },
};
</script>

<style>
  #test {
    border-collapse: collapse;
    width: 95%;
    text-align: center;
  }
  td {
    border: 1px solid #ddd;
    justify-content: center;
  }
  th, td {
    padding: 40px;
  }
</style>
