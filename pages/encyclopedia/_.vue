<template>
  <div
    v-if="breadcrumbPath"
    class="container">
    <div class="notification is-primary">
      <div class="columns level">
        <div class="column is-5 level-left"/>
        <div class="column is-2 level-item">
          <p class="title is-4 has-text-centered">
            Encyclopedia
          </p>
        </div>
        <div class="column is-5 level-right">
          <div class="level-item is-pulled-right">
            <encyclopedia-breadcrumb :breadcrumb-path="require('ramda').tail(breadcrumbPath.split('/'))"/>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-4 no-mobile">
          <encyclopedia-tree
            :path="treePath"
            :tree="tree"
            class="notification is-dark"/>
        </div>
        <div class="column">
          <encyclopedia-entry
            :entry="entry"
            :path="treePath"
            :tree="tree"/>
        </div>
      </div>
    </div>
  </div>
  <error v-else/>
</template>

<script>
import EncyclopediaBreadcrumb from '../../components/encyclopedia/breadcrumb';
import EncyclopediaTree from '../../components/encyclopedia/tree';
import Error from '../../layouts/error';
import EncyclopediaEntry from '../../components/encyclopedia/entry';

const R = require('ramda');

export default {
  components: {
    EncyclopediaEntry,
    Error,
    EncyclopediaTree,
    EncyclopediaBreadcrumb,
  },
  head() {
    return {
      title: `WKMM: ${this.title}`,
    };
  },
  computed: {
    treePath() {
      const dropLast = R.pipe(R.split('/'), R.dropLast(1), R.join('/'));
      return `/encyclopedia${dropLast(this.breadcrumbPath)}`;
    },
    title() {
      const capitalCase = R.pipe(R.split('/'), R.last, R.split('_'), R.map(word => `${R.toUpper(R.head(word))}${R.toLower(R.tail(word))}`), R.join(' '));
      return capitalCase(this.breadcrumbPath);
    },
  },
  async asyncData({ app, params }) {
    const { path } = await app.$axios.$get('/api/entries/path', {
      params: {
        root: R.last(params.pathMatch.split('/')),
      },
    });
    const { tree } = await app.$axios.$get('/api/entries/tree', {
      params: {
        root: R.last(params.pathMatch.split('/')),
      },
    });
    const { entries } = await app.$axios.$get('/api/entries', {
      params: {
        title: R.last(params.pathMatch.split('/')),
      },
    });
    return {
      breadcrumbPath: path === '/' ? null : path,
      tree,
      entry: R.head(entries),
    };
  },
};
</script>

<style scoped>
  @media (max-width:969px) {
    .no-mobile {
      display: none !important;
    }
  }
</style>
