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
  async asyncData({ app }) {
    const { employees } = await app.$axios.$get('/api/tavern/employees');
    const { moneyflow } = await app.$axios.$get('/api/tavern/moneyflow');
    const { prospects } = await app.$axios.$get('/api/tavern/prospects');
    return {
      employees,
      moneyflow,
      prospects,
    };
  },
};
</script>

<style scoped>
  .container {
    margin-top: 10px;
  }
</style>
