<template>
  <HeaderTA/>
  <div>
    <div class="tw-text-center tw-pr-10 tw-font-extrabold tw-text-2xl">
      The files uploaded by the students :
    </div>
    <div class="tw-m-5">
        <div class="tw-text-2xl tw-text-center tw-mb-5">Documents of the students</div>
        <div>
            <v-table :data="internships">
                <thead slot="head">
                    <th>Name</th>
                    <th>Type</th>
                    <th>Link</th>
                    <th>Validated  By the company</th>
                    <th>Validated By the school</th>
                    <th>Validate</th>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                    <tr v-for="document in this.filesSend">
                        <td class="text-center">{{document.name}}</td>
                        <td class="text-center">{{ document.type }}</td>
                        <td class="text-center">
                            <button class="tw-text-blue-500 tw-underline tw-hover:text-blue-700 tw-focus:outline-none tw-focus:underline" @click="openLink(document.url)">Open Link</button>
                        </td>
                        <td class="text-center">{{ document.validated_by_company }}</td>
                        <td class="text-center">{{ document.validated_by_school }}</td>
                        <td class="text-center">
                            <button class="tw-text-blue-500 tw-underline tw-hover:text-blue-700 tw-focus:outline-none tw-focus:underline"
                                    @click="validateDocument(document)">Validate</button>
                        </td>
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

    async validateDocument(document) {
      // Retrieve the document information and call the validateDocument method
      const { id_student, name, type, url } = document;
      await this.validateDocumentRequest(id_student, name, type, url);

    },

    async validateDocumentRequest(id, name, type, url) {
      await useFetch('http://localhost:3030/academic_validate_file', {
        method: 'POST',
        body: {
          id_student: id,
          type: type,
          url: url,
          name: name,
        },
      }).then((res) => console.log(res))
        .catch((err) => console.error('Error occurred', err));
    },
    openLink(url) {
      window.open(url, '_blank');
    }
  },
}
</script>

<style scoped>

</style>