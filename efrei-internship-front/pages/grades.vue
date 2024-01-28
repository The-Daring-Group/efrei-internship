<script setup lang="ts">

</script>

<template>
    <div>
        <div>
          <div class="text-center pr-10 font-extrabold text-2xl">
            You can see your Grades :
          </div>

          <div>
            <table id="test" class="bg-slate-200	mx-8 border-emerald-400">
              <thead>
                <tr>
                  <th>Type of document</th>
                  <th>Grade</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody class="justify-center">
                <tr v-for="element in this.evaluations" :key="element.id">
                  <td>{{ element.type_document }}</td>
                  <td>{{ element.grade }}</td>
                  <td>{{ element.commentary }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  mounted() {
    this.getEvaluations();
  },
  data() {
    return {
      evaluations: [],
    };
  },
  methods: {
    async getEvaluations() {
      const {data, pending, error, refresh} = await useFetch("http://localhost:3003/api/get-evaluation-student/" + 1, {
        method: 'get',
      })
      this.evaluations = data.value.evaluations
      console.log(this.evaluations)
    },
  },
};

</script>

<style scoped>

</style>