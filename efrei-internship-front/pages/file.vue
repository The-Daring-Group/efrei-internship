<template xmlns="http://www.w3.org/1999/html">
  <HeaderETU/>
  <div>
    <div class="container">
      <div class="text-center pr-10 font-extrabold text-2xl">
        Upload your files here
      </div>
          <h1>File Upload</h1>
          <form>
              <div class="input-group">
                  <label for="name">Name of the document</label>
                  <input v-model="name" id="name" placeholder="Enter the file name" />
                  <input v-model="type" list="type" placeholder="Select the type of your document">
                  <datalist id="type">
                      <option value="Specifications"></option>
                      <option value="Report"></option>
                  </datalist>
              </div>
              <div class="input-group">
                  <label for="files">Select files</label>
                  <input id="files" type="file" multiple v-on:change="handleFileChange" />
              </div>
              <button class="submit-btn" type="submit" @click="submitform">Upload</button>
          </form>
      </div>
    <div>
      <div class="text-center pr-10 font-extrabold text-2xl">
        Your files uploaded :
      </div>
      <div>
        <table id="test" class="bg-slate-200	mx-8 border-emerald-400">
          <thead>
            <tr>
              <th>Name of the file</th>
              <th>Type</th>
              <th>Validated by the company</th>
              <th>Validated by the school</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody class="justify-center">
            <tr v-for="element in this.filesSend" :key="element.id">
              <td>{{ element.name }}</td>
              <td>{{ element.type }}</td>
              <td>{{ element.validated_by_company }}</td>
              <td>{{ element.validated_by_school }}</td>
              <td><a class="hover:text-blue-800" :href="element.url" target="_blank">{{ element.url }}</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
</template>

<script>
import { useSessionStore } from '#imports';
const sessionStore = useSessionStore();
const id_student = sessionStore.getUser.id
export default {
  mounted() {
    this.getFilesStudent();
  },
  data() {
    return {
      name: '',
      type: '',
      files: null,
      filesSend: [],
    };
  },
  methods: {
    submitform() {
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('type', this.type);
      formData.append('id_student', id_student);
      // Assuming you only want to upload the first file if multiple files are selected
      if (this.files && this.files.length > 0) {
        formData.append('file', this.files[0]);
      }
      fetch('http://localhost:3030/upload_files', {
        method: 'POST',
        body: formData,
      })
          .then((res) => console.log(res))
          .catch((err) => console.error('Error occurred', err));
    },
    handleFileChange(e) {
      this.files = e.target.files;
    },
    async getFilesStudent() {
      const {data} = await useFetch("http://localhost:3030/get_student_files", {
        method: 'POST',
        body: {
          id_student: id_student
        },
      })
      this.filesSend = data.value
    }
  }
}
</script>

<style>

* {
    box-sizing: border-box;
}
.container {
    max-width: 500px;
    margin: 60px auto;
}
.container h1 {
    text-align: center;
    color: white;
}
form {
    background-color: white;
    padding: 30px;
}
form .input-group {
    margin-bottom: 15px;
}
form label {
    display: block;
    margin-bottom: 10px;
}
form input {
    padding: 12px 20px;
    width: 100%;
    border: 1px solid #ccc;
}
.submit-btn {
    width: 100%;
    border: none;
    background: rgb(37, 83, 3);
    font-size: 18px;
    color: white;
    border-radius: 3px;
    padding: 20px;
    text-align: center;
}
</style>