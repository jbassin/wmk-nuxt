<template>
  <div class="container animated fadeIn">
    <div class="notification is-primary">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <p class="title is-4">
              Edit Recap:
            </p>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <a class="button is-link is-rounded">Create New</a>
          </div>
        </div>
      </nav>
      <div
        v-if="makeNew"/>
      <div v-else>
        <recap-entry
          :recap="recap[0]"/>
      </div>
    </div>
  </div>
</template>

<script>
import RecapEntry from '../../../components/recap/entry';

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
      makeNew: false,
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
