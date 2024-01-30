<template>
    <HeaderTA/>
    <div class="tw-m-5">
        <div class="tw-text-2xl text-center tw-mb-2">Rate the student's Report</div>
        <div class="tw-flex tw-items-center tw-flex-col">
            <div class="tw-bg-slate-200 tw-w-fit tw-p-2 tw-rounded-sm">
                <div class="tw-text-xl tw-mb-1 tw-font-bold">Student information</div>
                <div>{{ student.name }}</div>
                <div>Company: {{ student.companyName }}</div>
                <div>Duration: {{ student.startDate }} ➡️ {{ student.endDate }}</div>
            </div>
            <v-form class="tw-w-full">
                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                            md="9"
                        >
                          <v-text-field
                                :counter="100"
                                required
                                label="email company tutor"
                                clearable
                                hint="Enter the email of the company tutor"
                                v-model="email_company_tutor"
                            ></v-text-field>
                            <v-text-field
                                :counter="500"
                                required
                                label="Comment"
                                clearable
                                hint="Enter a comment about the student's report"
                                v-model="comment"
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
                                v-model="grade"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </div>
        <div class="text-center">
            <button type="button" class="btn-submit" @click="submitReport">Submit</button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useSessionStore } from '#imports';
    const sessionStore = useSessionStore();
    const id_academy_tutor = sessionStore.getUser.id
    const route = useRoute()
    const grade = ref('');
    const comment = ref('');
    const email_company_tutor = ref('');
    const student_id = ref(route.params.id)
    const student = {
        name: "Antoine Lachaud",
        companyName: "Microsoft",
        startDate: formatDate("2024-03-11"),
        endDate: formatDate("2024-09-19"),
    };

    function formatDate(date) {
        const formattedDate = new Date(date);
        const year = formattedDate.toLocaleString("default", { year: "numeric" });
        const month = formattedDate.toLocaleString("default", { month: "2-digit" });
        const day = formattedDate.toLocaleString("default", { day: "2-digit" });

        return `${year} ${month} ${day}`;
    }
    async function submitReport() {
      const {data, pending, error, refresh} = await useFetch("http://localhost:3003/api/evaluate", {
        method: 'post',
        body: {
          id_student: student_id,
          id_academic_tutor: id_academy_tutor,
          email_company_tutor: email_company_tutor,
          type_document: "Report",
          grade: grade,
          commentary: comment
        },
        onRequestError({request, options, error}) {
          console.log("error" + error)
        },
        async onResponse({request, response, options}) {
          console.log("success" + response)
        },
        onResponseError({request, response, options}) {
          console.log("error" + response)
        }
      })
    }
</script>