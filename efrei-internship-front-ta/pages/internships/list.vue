<template>
    <HeaderTA/>
    <div class="m-5">
        <div class="text-2xl text-center">Internship list page</div>
        <div class="flex flex-col items-center">
            <v-table :data="internships">
            <thead slot="head" class="bg-slate-500">
                <th>Student</th>
                <th>Company</th>
                <th>Start Date</th>
                <th>End Date</th>
            </thead>
            <tbody slot="body" slot-scope="{displayData}">
                <tr v-for="internship in internships">
                    <td>{{ internship.student }}</td>
                    <td>{{ internship.companyName }}</td>
                    <td>{{ internship.startDate }}</td>
                    <td>{{ internship.endDate }}</td>
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
        student: "Antoine Lachaud",
        companyName: "Microsoft",
        startDate: formatDate("2024-03-11"),
        endDate: formatDate("2024-09-19"),
    },
    {
        student: "Romain Marques",
        companyName: "Stellantis",
        startDate: formatDate("2024-04-01"),
        endDate: formatDate("2024-09-26"),
    },
    ]);

    function formatDate(date) {
        const formattedDate = new Date(date);
        const year = formattedDate.toLocaleString("default", { year: "numeric" });
        const month = formattedDate.toLocaleString("default", { month: "2-digit" });
        const day = formattedDate.toLocaleString("default", { day: "2-digit" });

        return `${year} ${month} ${day}`;
    }

</script>