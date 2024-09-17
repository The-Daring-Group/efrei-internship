<template>
  <header-e-t-u />
  <div>
    <h1>Auto Evaluation</h1>
    <div class="linkDiv">
      <nuxt-link to="autoEvaluation1">Evaluation de début de stage</nuxt-link>
      <nuxt-link to="autoEvaluation2">Evaluation de milieu de stage</nuxt-link>
      <nuxt-link to="autoEvaluation3">Evaluation de fin de stage</nuxt-link>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #333;
  text-align: center;
  font-size: larger;
  font-weight: bold;
}

.linkDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>