<template>
  <div class="container animated fadeIn">
    <div class="notification is-primary">
      <p class="title is-4">
        The Story So Far:
      </p>
      <recap-entry
        v-for="(entry, index) in recap"
        :key="index"
        :recap="entry"/>
    </div>
  </div>
</template>

<script>
import RecapEntry from '../../components/recap/entry';

export default {
  components: {
    RecapEntry,
  },
  data() {
    return {
      calendar: {
        months: [
          'Dawn',
          'Starfall',
          'Windswrath',
          'Rainswrath',
          'Skyrest',
          'Midyear',
          'Heatswrath',
          'Sicklefall',
          'Deepsun',
          'Harvest',
          'Dusk',
          'Godsnight',
        ],
        year: 214,
      },
    };
  },
  head() {
    return {
      title: 'WKMM: Recap',
    };
  },
  async asyncData({ app }) {
    const { recap } = await app.$get('/recap');
    return {
      recap,
    };
  },
};
</script>

<style scoped>
</style>
