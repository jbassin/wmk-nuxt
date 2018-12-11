<template>
  <div class="container">
    <div class="notification is-primary">
      <p class="title is-4">
        {{ tavernName }}: Status Report
      </p>
      <div class="columns">
        <div class="column is-one-third">
          <p class="subtitle is-5">
            Currently Hired Employees:
          </p>
          <p
            v-for="(employee, index) in employees"
            :key="index">
            <strong>{{ employee.job }}</strong>: {{ employee.name }}
          </p>
        </div>
        <div class="column is-one-third">
          <p class="subtitle is-5">
            Guaranteed Revenue and Costs:
          </p>
          <table class="table is-fullwidth">
            <tbody class="has-background-primary has-text-white">
              <tr
                v-for="(moneyflow, index) in moneyflow"
                :key="index">
                <td>
                  {{ moneyflow.text }}
                </td>
                <td class="has-text-right">
                  <span :class="[moneyflow.value >= 0 ? 'has-text-success' : 'has-text-danger']">
                    {{ moneyflow.value }}
                  </span>
                  dr
                </td>
              </tr>
            </tbody>
            <tfoot class="has-background-primary has-text-white">
              <tr>
                <th class="has-text-white">
                  Total:
                </th>
                <th class=" has-text-white has-text-right">
                  <span :class="[totalCost >= 0 ? 'has-text-success' : 'has-text-danger']">
                    {{ totalCost }}
                  </span>
                  dr
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="column is-one-third">
          <p class="subtitle is-5">
            Current Prospects:
          </p>
          <table class="table is-fullwidth">
            <tbody class="has-background-primary has-text-white">
              <tavern-prospects
                v-for="(prospect, index) in sortedProspects"
                :key="index"
                :prospect="prospect"
                :limits="limits"/>
            </tbody>
          </table>
          <br>
          <div class="has-text-centered">
            Currently looking {{ status }}.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TavernProspects from '~/components/tavern/prospects.vue';

const R = require('ramda');

export default {
  components: {
    TavernProspects,
  },
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
  computed: {
    totalCost() {
      return R.reduce((o, n) => o + n.value, 0, this.moneyflow);
    },
    limits() {
      return {
        max: R.reduce((o, n) => R.max(o, n.value), 0, this.prospects),
        min: R.reduce((o, n) => R.min(o, n.value), 0, this.prospects),
      };
    },
    sortedProspects() {
      return R
        .clone(this.prospects)
        .sort((a, b) => b.value - a.value);
    },
    status() {
      return R.cond([
        [R.gt(25), R.always('excellent')],
        [R.gt(20), R.always('very good')],
        [R.gt(15), R.always('quite good')],
        [R.gt(10), R.always('good')],
        [R.gt(5), R.always('not bad')],
        [R.gt(0), R.always('okay')],
        [R.gt(-5), R.always('kinda okay')],
        [R.gt(-10), R.always('not good')],
        [R.gt(-15), R.always('a little bad')],
        [R.gt(-20), R.always('bad')],
        [R.gt(-25), R.always('quite bad')],
        [R.T, R.always('really bad')],
      ])(R.reduce((o, n) => o + n.value, 0, this.prospects));
    },
  },
};
</script>

<style scoped>
  .column {
    border-right: 0.5px solid white;
    border-left: 0.5px solid white;
  }
</style>
