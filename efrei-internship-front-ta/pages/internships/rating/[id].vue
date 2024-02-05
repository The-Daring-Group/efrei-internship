<template>
  <HeaderTA/>
  <div class="tw-m-5">
      <div class="tw-text-2xl text-center tw-mb-2">Rate the student's Report</div>
      <div class="tw-flex tw-items-center tw-flex-col">
        <div class="tw-bg-slate-200 tw-w-fit tw-p-2 tw-rounded-sm">
          <div class="tw-text-xl tw-mb-1 tw-font-bold">Student information</div>
          <div> {{this.getStudentName(this.studentName.id, [this.studentName])}}</div>
          <div>Company: {{ this.internship.company_name }}</div>
          <div>Duration: {{this.formatDate(this.internship.start_date)}} ➡️ {{this.formatDate(this.internship.end_date)}}</div>
        </div>
        <v-form class="tw-w-full">
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  md="9"
              >
                <v-text-field
                    :counter="500"
                    required
                    label="Comment"
                    clearable
                    hint="Enter a comment about the student's report"
                    v-model="this.comment"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  md="3"
              >
                <v-text-field
                    required
                    :counter="2"
                    label="Grade"
                    single-line
                    clearable
                    hint="Rate the student's report /20"
                    v-model="this.grade"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
    </div>
    <div class="text-center">
      <button type="button" class="btn-submit" @click="this.submitReport">Submit</button>
    </div>
  </div>
</template>

<script>
  import { getStudentName, formatDate } from "~/helper/HelpStudent.js";
  import { parseStringRating } from "~/helper/HelpParser.js";
  import { useSessionStore } from '#imports';
  const sessionStore = useSessionStore();

  export default {
    mounted() {
      this.getInternships().then(() => {
        this.getInfoStudent(this.internship.id_student)
      });
  },
    data() {
      return {
          grade : "",
          comment : "",
          internship_id : parseStringRating(this.$route.params.id).id,
          type : parseStringRating(this.$route.params.id).type,
          internship: {
              "id": 2, // TEMPLATE DATA
              "title": "",
              "start_date": "",
              "end_date": "",
              "description": "",
              "company_name": "",
              "id_student": 1, // TEMPLATE DATA
              "id_academic_tutor": 2, // TEMPLATE DATA
              "id_company_tutor": 3 // TEMPLATE DATA
          },
          studentName: {
            name: "Antoine Lachaud", // TEMPLATE DATA
            companyName: "Microsoft", // TEMPLATE DATA
            startDate: "2024-03-11", // TEMPLATE DATA
            endDate: "2024-09-19", // TEMPLATE DATA
          }
      };
  },
  methods: {
    getStudentName,
    formatDate,
    async submitReport() {
      await useFetch("http://localhost:3003/api/evaluate", {
        method: 'post',
        body: {
          id_student: this.internship.id_student,
          id_academic_tutor: this.internship.id_academic_tutor,
          id_company_tutor: this.internship.id_company_tutor,
          type_document: this.type,
          grade: this.grade,
          commentary: this.comment
        },
        onRequestError({request, options, error}) {
          console.log("error" + error)
        },
        async onResponse({request, response, options}) {
          console.log("success" + response.toString())
          await navigateTo('/internships/list')
        },
        onResponseError({request, response, options}) {
          console.log("error response" + response.toString())
        }
      })
    },
    async getInternships() {
      const {data} = await useFetch("http://localhost:3003/api/get-internship/" + this.internship_id, {
        method: 'get',
      })
      this.internship = data.value.internship
    },
    async getInfoStudent(id_student) {
      const {data} = await useFetch("http://localhost:3000/api/getinfos", {
        method: 'post',
        body: {
          id_student: id_student,
        },
      })
      this.studentName = data.value
    }
  }
}
</script>