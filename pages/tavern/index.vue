<template>
  <div class="container animated fadeIn">
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
import _ from 'lodash';
import TavernProspects from '~/components/tavern/prospects.vue';

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
      let total = 0;
      _.each(this.moneyflow, (moneyflow) => {
        total += moneyflow.value;
      });
      return total;
    },
    limits() {
      let max = 0;
      let min = 0;
      _.each(this.prospects, (prospect) => {
        max = prospect.value > max ? prospect.value : max;
        min = prospect.value < min ? prospect.value : min;
      });
      return {
        max,
        min,
      };
    },
    sortedProspects() {
      const copy = _.map(this.prospects, _.clone);
      return copy.sort((a, b) => b.value - a.value);
    },
    status() {
      let total = 0;
      _.each(this.sortedProspects, (value) => {
        total += value.value;
      });
      switch (true) {
        case (total < -25):
          return 'really bad';
        case (total < -20):
          return 'quite bad';
        case (total < -15):
          return 'bad';
        case (total < -10):
          return 'a little bad';
        case (total < -5):
          return 'not good';
        case (total < 0):
          return 'kinda okay';
        case (total < 5):
          return 'okay';
        case (total < 10):
          return 'not bad';
        case (total < 15):
          return 'good';
        case (total < 20):
          return 'quite good';
        case (total < 25):
          return 'very good';
        default:
          return 'excellent';
      }
    },
  },
};
</script>

<style scoped>
  .container {
    margin-top: 10px;
  }
  .column {
    border-right: 0.5px solid white;
    border-left: 0.5px solid white;
  }
</style>
