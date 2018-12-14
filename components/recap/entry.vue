<template>
  <article class="message is-link">
    <div
      class="message-header"
      @click="flip">
      <p>{{ date }}</p>
      <div
        class="button is-link"
        @click.native="flip">
        <span class="icon">
          <i :class="[expanded ? 'fas fa-arrow-up' : 'fas fa-arrow-down']"/>
        </span>
      </div>
    </div>
    <div
      v-if="expanded"
      class="message-body">
      {{ entry }}
    </div>
  </article>
</template>

<script>
const R = require('ramda');

export default {
  name: 'RecapEntry',
  props: {
    recap: {
      required: true,
      type: Object,
    },
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
      expanded: true,
    };
  },
  computed: {
    entry() {
      return this.recap.text;
    },
    date() {
      const lastNumCheck = R.curry((input, num) => R.pipe(R.last, R.equals(input))(num));
      const secondDigitCheck = R.curry(num => R.pipe(R.nth(-2), R.complement(R.equals('1')))(num));
      const lengthCheck = R.curry(num => R.gte(R.length(num), 2));
      const secondDigitSafeCheck = R.curry(num => R.and(lengthCheck(num), secondDigitCheck(num)));
      const numCheck = R.curry((input, num) => R.and(lastNumCheck(input, num), secondDigitSafeCheck(num)));
      const suffix = R.cond([
        [numCheck('1'), R.always('st')],
        [numCheck('2'), R.always('nd')],
        [numCheck('3'), R.always('rd')],
        [R.T, R.always('th')],
      ])(this.recap.day);
      console.log(R.last(this.recap.day));
      return `The ${this.recap.day}${suffix} of ${this.calendar.months[this.recap.month - 1]}, ${this.calendar.year} A.S.`;
    },
  },
  methods: {
    flip() {
      this.expanded = !this.expanded;
    },
  },
};
</script>
