<template>
  <nav class="breadcrumb is-right">
    <ul v-if="links.length > 3">
      <li>
        <nuxt-link :to="links[0].path">
          {{ links[0].name }}
        </nuxt-link>
      </li>
      <li>
        <a>
          ...
        </a>
      </li>
      <li
        v-for="(item, index) in require('ramda').takeLast(2, links)"
        :key="index">
        <nuxt-link :to="item.path">
          {{ item.name }}
        </nuxt-link>
      </li>
    </ul>
    <ul v-else>
      <li
        v-for="(item, index) in links"
        :key="index">
        <nuxt-link :to="item.path">
          {{ item.name }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
const R = require('ramda');

export default {
  name: 'EncyclopediaBreadcrumb',
  props: {
    breadcrumbPath: {
      required: true,
      type: Array,
    },
  },
  computed: {
    links() {
      return R.reduce((o, n) => R.concat(o, [{
        name: n
          .toLowerCase()
          .split('_')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' '),
        path: `${R.last(o) === undefined ? '/encyclopedia' : R.last(o).path}/${n}`,
      }]), [], this.breadcrumbPath);
    },
  },
};
</script>

<style scoped>

</style>
