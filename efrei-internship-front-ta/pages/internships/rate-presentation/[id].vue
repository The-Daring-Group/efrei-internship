<template>
    <HeaderTA/>
    <div class="tw-m-5">
        <div class="tw-text-2xl text-center tw-mb-2">Rate the student's presentation</div>
        <div class="tw-flex tw-items-center tw-flex-col">
            <div class="tw-bg-slate-200 tw-w-fit tw-p-2 tw-rounded-sm">
                <div class="tw-text-xl tw-mb-1 tw-font-bold tw-text-center">Student information</div>
                <div v-if="!loading">Name: {{ internship.firstname + ' ' + internship.lastname }}</div>
                <div v-if="!loading">Company: {{ internship.company_name }}</div>
                <div v-if="!loading">Duration: {{ internship.start_date }} ➡️ {{ internship.end_date }}</div>
                <div v-if="loading" class="text-center">Loading...</div>
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
    const loading = ref(true);
    let internship;
    const route = useRoute();
    const internshipID = route.params.id;

    onMounted(() => {
        getInternship();
    });

    const getInternship = () => {

        $fetch(`/api/get-internship/${internshipID}`, {
            method: 'GET',
            baseURL: 'http://localhost:3002',
        }).then(function (fetchedInternship) {
            setInternship(fetchedInternship);
            console.log(internship.firstname);
            loading.value = false;
        })
    };

    const setInternship = (newInternship) => {
        internship = newInternship[0];
    } 

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