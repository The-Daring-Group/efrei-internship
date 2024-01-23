<template>
    <HeaderTA/>
    <div class="tw-m-5">
        <div class="tw-text-2xl text-center tw-mb-2">Rate the student's presentation</div>
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
                                label="Comment"
                                clearable
                                hint="Enter a comment about the student's presentation"
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
                                hint="Rate the student's presentation /20"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </div>
        <div class="text-center">
            <button type="button" class="btn-submit">Submit</button>
        </div>
    </div>
</template>

<script setup>
    // TO DO : Link to microservice
    const student = {
        name: "Antoine Lachaud",
        companyName: "Microsoft",
        startDate: formatDate("2024-03-11"),
        endDate: formatDate("2024-09-19"),
    };

    var grade;
    var comment;

    function formatDate(date) {
        const formattedDate = new Date(date);
        const year = formattedDate.toLocaleString("default", { year: "numeric" });
        const month = formattedDate.toLocaleString("default", { month: "2-digit" });
        const day = formattedDate.toLocaleString("default", { day: "2-digit" });

        return `${year} ${month} ${day}`;
    }
</script>