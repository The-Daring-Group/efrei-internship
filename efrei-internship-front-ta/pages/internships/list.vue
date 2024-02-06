<template>
    <HeaderTA />
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
                    <th>Auto Evaluation</th>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                    <tr v-for="internship in this.internships">
                        <td class="text-center">{{ getStudentName(internship.id_student, this.studentName) }}</td>
                        <td class="text-center">{{ internship.title }}</td>
                        <td class="text-center">{{ internship.company_name }}</td>
                        <td class="text-center">{{ internship.start_date }}</td>
                        <td class="text-center">{{ internship.end_date }}</td>

                        <td class="tw-flex tw-items-center tw-justify-center">
                            <ChatButton :userId="internship.id" :sender="id_academic_tutor"
                                :internshipsId="getInternshipsId()" />
                            <div
                                class="tw-bg-cyan-400 hover:tw-bg-cyan-600 hover:tw-text-white hover:tw-cursor-pointer tw-p-1.5 tw-w-fit tw-rounded-md tw-text-cyan-800 tw-border-cyan-600 tw-border-2 mr-4">
                                <NuxtLink :to="{ path: '/internships/rating/type=report&id=' + internship.id }">Rate Report
                                </NuxtLink>
                                <font-awesome-icon class="tw-ml-1" :icon="['fas', 'pen-to-square']" />
                            </div>
                            <div
                                class="tw-bg-cyan-400 hover:tw-bg-cyan-600 hover:tw-text-white hover:tw-cursor-pointer tw-p-1.5 tw-w-fit tw-rounded-md tw-text-cyan-800 tw-border-cyan-600 tw-border-2">
                                <NuxtLink :to="{ path: '/internships/rating/type=soutenance&id=' + internship.id }">Rate
                                    Presentation</NuxtLink>
                                <font-awesome-icon class="tw-ml-1" :icon="['fas', 'pen-to-square']" />
                            </div>
                        </td>
                        <td class="tw-justify-center">
                            <select v-model="evalNum" class="hover:tw-bg-cyan-100">
                                <option value="0" disabled selected>Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <button class="tw-bg-cyan-400 hover:tw-bg-cyan-600"
                                @click="openAutoEvaluation(internship.id_student)" :disabled="evalNum == '0'">Open</button>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <autoEvaluation v-if="showAutoEvaluation" :userId="autoEvaluationData.userId"
                :evalNum="autoEvaluationData.evalNum" @close-modal="showAutoEvaluation = false" />
        </div>
    </div>
</template>

<script>

import { useSessionStore } from '#imports';
import { getStudentName } from "~/helper/HelpStudent.js";

import autoEvaluation from '~/components/autoEvaluation.vue';

export default {
    components: {
        autoEvaluation
    },
    mounted() {
        const sessionStore = useSessionStore();
        this.id_academic_tutor = sessionStore.getUser.id

        console.log(this.id_academic_tutor)

        this.getInternships().then(() => {
            for (let i in this.internships) {
                this.getInfoStudent(this.internships[i].id_student)
            }
        });
    },
    data() {
        return {
            internships: [],
            studentName: [],
            id_academic_tutor: null,
            showAutoEvaluation: false,
            evalNum: "0",
            autoEvaluationData: {
                userId: null,
                evalNum: "0",
            }
        };
    },
    methods: {
        getStudentName,
        async getInternships() {
            try {
                const { data } = await useFetch("http://localhost:3003/api/get-internship-academic/" + this.id_academic_tutor, {
                    method: 'get',
                })
                //console.log(data.value)
                if (data.value) {
                    this.internships = data.value.internship
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getInfoStudent(id_student) {
            const { data } = await useFetch("http://localhost:3000/api/getinfos", {
                method: 'post',
                body: {
                    id_student: id_student,
                },
            })
            this.studentName.push(data.value)
        },
        getInternshipsId() {
            let internshipsId = []
            for (let i in this.internships) {
                internshipsId.push(this.internships[i].id)
            }
            return internshipsId
        },
        openAutoEvaluation(internshipIdStudent) {
            this.showAutoEvaluation = true
            this.autoEvaluationData.userId = internshipIdStudent
            this.autoEvaluationData.evalNum = this.evalNum
            this.evalNum = "0"
        }
    },
}

</script>

<style scoped>
select {
    padding: 0.5rem;
    margin: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 0.5rem;
    margin: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>