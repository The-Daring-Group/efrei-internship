<template>
    <HeaderTA/>
    <div class="tw-m-5">
        <div class="tw-text-2xl tw-text-center tw-mb-5">Internship list page</div>
        <div>
            <v-table :data="internships">
                <thead slot="head">
                    <th>Student</th>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Options</th>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                    <tr v-for="internship in this.internships">
                        <td class="text-center">{{ getStudentName(internship.id_student, this.studentName) }}</td>
                        <td class="text-center">{{ internship.title }}</td>
                        <td class="text-center">{{ internship.company_name }}</td>
                        <td class="text-center">{{ internship.start_date }}</td>
                        <td class="text-center">{{ internship.end_date }}</td>
                        <td class="tw-flex tw-items-center tw-justify-center">
                            <div class="tw-bg-cyan-400 hover:tw-bg-cyan-600 hover:tw-text-white hover:tw-cursor-pointer tw-p-1.5 tw-w-fit tw-rounded-md tw-text-cyan-800 tw-border-cyan-600 tw-border-2 mr-4">
                              <NuxtLink :to="{ path: '/internships/rate-report/' + internship.id }">Rate Report</NuxtLink>
                                <font-awesome-icon class="tw-ml-1" :icon="['fas', 'pen-to-square']" />
                            </div>
                            <div class="tw-bg-cyan-400 hover:tw-bg-cyan-600 hover:tw-text-white hover:tw-cursor-pointer tw-p-1.5 tw-w-fit tw-rounded-md tw-text-cyan-800 tw-border-cyan-600 tw-border-2">
                                <NuxtLink :to="{ path: '/internships/rate-presentation/' + internship.id }">Rate Presentation</NuxtLink>
                                <font-awesome-icon class="tw-ml-1" :icon="['fas', 'pen-to-square']" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </div>
</template>

<script>

import { useSessionStore } from '#imports';
import { getStudentName } from "~/helper/HelpStudent.js";

const sessionStore = useSessionStore();
const id_academic_tutor = sessionStore.getUser.id

export default {
    mounted() {
        this.getInternships().then(() => {
            for(let i in this.internships) {
                this.getInfoStudent(this.internships[i].id_student)
            }
        });
    },
    data() {
        return {
            internships: [],
            studentName: []
        };
    },
    methods: {
      getStudentName,
      async getInternships() {
            const {data, pending, error, refresh} = await useFetch("http://localhost:3003/api/get-internship-academic/" + id_academic_tutor, {
                method: 'get',
            })
            this.internships = data.value.internship
        },
      async getInfoStudent(id_student) {
        const {data, pending, error, refresh} = await useFetch("http://localhost:3000/api/getinfos", {
          method: 'post',
          body: {
            id_student: id_student,
          },
        })
        this.studentName.push(data.value)
      }
    },
}

</script>