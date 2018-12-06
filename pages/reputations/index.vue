<template>
  <div class="container">
    <div class="notification is-primary">
      <p class="title is-4">
        Faction Reputations
      </p>
      <div
        v-for="(reputation, index) in sortedReputations"
        :key="index"
        class="tile is-ancestor">
        <div class="tile is-vertical is-4">
          <div class="tile is-parent">
            <div class="tile is-child">
              <strong>{{ reputation.name }}</strong>
            </div>
            <div class="tile is-child">
              {{ reputation.contact }}
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child">
            <progress
              :class="[setProgressColor(parseInt(reputation.rep))]"
              :value="parseInt(reputation.rep)"
              class="progress"
              max="100">
              {{ reputation.rep }}%
            </progress>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  head() {
    return {
      title: 'WKMM: Reputations',
    };
  },
  async asyncData({ app }) {
    const { reputations } = await app.$axios.$get('/api/reputations');
    return {
      reputations,
    };
  },
  computed: {
    sortedReputations() {
      const copy = _.map(this.reputations, _.clone);
      return copy.sort((a, b) => b.rep - a.rep);
    },
  },
  methods: {
    setProgressColor(value) {
      switch (true) {
        case (value < 25):
          return 'is-danger';
        case (value < 50):
          return 'is-warning';
        case (value < 75):
          return 'is-info';
        default:
          return 'is-success';
      }
    },
  },
};
</script>

<style>
  .container {
    margin-top: 10px;
  }
</style>
