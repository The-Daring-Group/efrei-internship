<template>
    <HeaderTA/>
    <div class="tw-m-5">
        <div class="tw-text-2xl tw-text-center tw-mb-5">Internship list page</div>
        <div>
            <div v-if="loading">Loading...</div>
            <v-table :data="internships" v-if="!loading">
                <thead slot="head">
                    <th>Student</th>
                    <th>Company</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Options</th>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                    <tr v-for="internship in internships">
                        <td class="text-center">{{ internship.firstname + ' ' + internship.lastname }}</td>
                        <td class="text-center">{{ internship.company_name }}</td>
                        <td class="text-center">{{ internship.start_date }}</td>
                        <td class="text-center">{{ internship.end_date }}</td>
                        <td class="tw-flex tw-items-center tw-justify-center">
                            <div class="tw-bg-cyan-400 hover:tw-bg-cyan-600 hover:tw-text-white hover:tw-cursor-pointer tw-p-1.5 tw-w-fit tw-rounded-md tw-text-cyan-800 tw-border-cyan-600 tw-border-2 mr-4">
                              <NuxtLink :to="{ path: '/internships/fill-evaluation/' + internship.id }">Rate Report</NuxtLink>
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

<script setup>
    const loading = ref(false);
    const internships = [];
    const academicTutorID = 2; // Need to be changed to the real ID of the academic tutor

    onMounted(() => {
        loadInternships();
    });

    const loadInternships = () => {
        loading.value = true;

        $fetch(`/api/get-internship-academic/${academicTutorID}`, {
            method: 'GET',
            baseURL: 'http://localhost:3002',
        }).then(function (fetchedInternships) {
            appendInternships(fetchedInternships.internship);
            loading.value = false;
        })
    };

    const appendInternships = (newInternships) => {
        newInternships.forEach((internship) => {
            internships.push(internship);
        });
    };

    function formatDate(date) {
        const formattedDate = new Date(date);
        const year = formattedDate.toLocaleString("default", { year: "numeric" });
        const month = formattedDate.toLocaleString("default", { month: "2-digit" });
        const day = formattedDate.toLocaleString("default", { day: "2-digit" });

        return `${year} ${month} ${day}`;
    }

</script>