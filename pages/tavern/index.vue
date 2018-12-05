<template>
  <div class="container animated fadeIn">
    <div class="notification is-primary">
      <p class="title is-4">
        {{ tavernName }}: Status Report
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tavernName: 'The Floating Cup',
    };
  },
  head() {
    return {
      title: 'WKMM: Tavern',
    };
  },
};
</script>

<style>
  .container {
    margin-top: 10px;
  }
</style>
