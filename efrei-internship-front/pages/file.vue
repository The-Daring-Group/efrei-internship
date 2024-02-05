<template>

  <div class="container">
        <h1>File Upload</h1>
        <form @submit.prevent="submitForm">
            <div class="input-group">
                <label for="name">Your name</label>
                <input v-model="name" id="name" placeholder="Enter your name" />
            </div>
            <div class="input-group">
                <label for="files">Select files</label>
                <input id="files" type="file" multiple v-on:change="handleFileChange" />
            </div>
            <button class="submit-btn" type="submit" @click="submitform">Upload</button>
        </form>
    </div>
</template>

<script>

export default {

  data() {
    return {
      name: '',
      type: '',
      files: null,
    };
  },
  methods: {
    submitform() {
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('type', "chill");
      formData.append('id_student', "1");
      // Assuming you only want to upload the first file if multiple files are selected
      if (this.files && this.files.length > 0) {
        formData.append('file', this.files[0]);
      }
      console.log(formData.get('file'));
      fetch('http://localhost:3030/upload_files', {
        method: 'POST',
        body: formData,
      })
          .then((res) => console.log(res))
          .catch((err) => console.error('Error occurred', err));
    },
    handleFileChange(e) {
      this.files = e.target.files;
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