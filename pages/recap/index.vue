<template>
  <div class="container animated fadeIn">
    <div class="notification is-primary">
      <p class="title is-4">
        The Story So Far:
      </p>
      <recap-entry
        v-for="(entry, index) in recap"
        :key="index"
        :entry="entry.text"
        :date="`The ${entry.day}${entry.day >= 4 ? 'th' : entry.day === 3 ? 'rd' : entry.day === 2 ? 'nd' : 'st'} of ${calendar.months[entry.month - 1]}, ${calendar.year} A.S.`"/>
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
    const { recap } = await app.$axios.$get('/api/recap');
    return {
      recap,
    };
  },
};
</script>

<style scoped>
</style>
