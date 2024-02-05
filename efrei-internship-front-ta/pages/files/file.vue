<template>
  <HeaderTA/>
  <div>
    <div class="text-center pr-10 font-extrabold text-2xl">
      The files uploaded by the students :
    </div>
    <div class="tw-m-5">
        <div class="tw-text-2xl tw-text-center tw-mb-5">Documents of the students</div>
        <div>
            <v-table :data="internships">
                <thead slot="head">
                    <th>Name</th>
                    <th>Type</th>
                    <th>URL</th>
                    <th>Validated  By the company</th>
                    <th>Validated By the school</th>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                    <tr v-for="document in this.filesSend">
                        <td class="text-center">{{document.name}}</td>
                        <td class="text-center">{{ document.type }}</td>
                        <td class="text-center">{{ document.url }}</td>
                        <td class="text-center">{{ document.validated_by_company }}</td>
                        <td class="text-center">{{ document.validated_by_school }}</td>
                    </tr>
                </tbody>
            </v-table>
        </div>
  </div>
  </div>
</template>

<script>
import { useSessionStore } from '#imports';
const sessionStore = useSessionStore();
const id_academic_tutor = sessionStore.getUser.id

export default {
  mounted() {
    this.getFilesStudent();
  },
  data() {
    return {
      filesSend: [],
    };
  },
  methods: {
    async getFilesStudent() {
      await useFetch('http://localhost:3030/get_academic_tutor_files', {
        method: 'POST',
        body: {
          id_academic_tutor: id_academic_tutor,
        },
      }).then((response) => {
        this.filesSend = response.data;
      });
    },
  },
}
</script>

<style scoped>

</style>