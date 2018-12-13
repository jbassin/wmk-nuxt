<template>
  <div class="notification is-dark">
    <p class="title is-5 has-text-centered">
      {{ capsTitle }}
    </p>
  </div>
</template>

<script>
const R = require('ramda');

export default {
  name: 'EncyclopediaEntry',
  props: {
    entry: {
      required: true,
      type: Object,
    },
  },
  computed: {
    capsTitle() {
      const capitalCase = R.pipe(R.split(' '), R.map(word => `${R.toUpper(R.head(word))}${R.toLower(R.tail(word))}`), R.join(' '));
      return capitalCase(this.entry.title);
    },
  },
};
</script>

<style scoped>

</style>
