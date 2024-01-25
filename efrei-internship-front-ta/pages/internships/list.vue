<template>
    <HeaderTA/>
    <div class="tw-m-5">
        <div class="tw-text-2xl tw-text-center tw-mb-5">Internship list page</div>
        <div>
            <v-table :data="internships">
                <thead slot="head">
                    <th>Student</th>
                    <th>Company</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Options</th>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                    <tr v-for="internship in internships">
                        <td class="text-center">{{ internship.student }}</td>
                        <td class="text-center">{{ internship.companyName }}</td>
                        <td class="text-center">{{ internship.startDate }}</td>
                        <td class="text-center">{{ internship.endDate }}</td>
                        <td class="tw-flex tw-items-center tw-justify-center">
                            <ChatButton :userId="internship.id" :sender="ta" />
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

    // FAKE DATA. TO DO = Implement back-end service
    const internships = ref([
    {
        id: 1,
        student: "Antoine Lachaud",
        companyName: "Microsoft",
        startDate: formatDate("2024-03-11"),
        endDate: formatDate("2024-09-19"),
    },
    {
        id: 2,
        student: "Romain Marques",
        companyName: "Stellantis",
        startDate: formatDate("2024-04-01"),
        endDate: formatDate("2024-09-26"),
    },
    ]);

    const ta = 2;

    function formatDate(date) {
        const formattedDate = new Date(date);
        const year = formattedDate.toLocaleString("default", { year: "numeric" });
        const month = formattedDate.toLocaleString("default", { month: "2-digit" });
        const day = formattedDate.toLocaleString("default", { day: "2-digit" });

        return `${year} ${month} ${day}`;
    }

</script>