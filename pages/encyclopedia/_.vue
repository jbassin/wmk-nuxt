<template>
  <div
    v-if="breadcrumbPath"
    class="container">
    <div class="notification is-primary">
      <div class="columns level">
        <div class="column is-4 level-left">
          <div class="field">
            <p class="control has-icons-left">
              <label>
                <input
                  v-model="search"
                  class="input is-rounded"
                  type="search"
                  @keyup="searchPress">
              </label>
              <span class="icon is-small is-left">
                <i class="fas fa-search"/>
              </span>
            </p>
          </div>
        </div>
        <div class="column is-1"/>
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
            v-if="bestMatches.length === 0"
            :path="treePath"
            :tree="tree"
            class="notification is-dark"/>
          <div
            v-else
            class="notification is-dark">
            <div
              v-for="(item, index) in bestMatches"
              :key="index">
              <b v-if="matchIndex === index">-> {{ item }}</b>
              <span v-else>-> {{ item }}</span>
            </div>
          </div>
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
const stringSimilarity = require('string-similarity');

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
  data() {
    return {
      search: '',
      bestMatches: [],
      matchIndex: 0,
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
  methods: {
    async searchPress(e) {
      const entries = R.map(item => item.title, this.list);
      const allMatches = stringSimilarity.findBestMatch(this.search, entries);
      this.bestMatches = R.pipe(R.sort((a, b) => b.rating - a.rating), R.filter(item => item.rating > 0), R.map(item => item.target), R.take(10))(allMatches.ratings);
      if (e.keyCode === 13 && this.bestMatches.length > 0) {
        const match = this.bestMatches[this.matchIndex];
        const { path } = await this.$axios.$get('/api/entries/path', {
          params: {
            root: match.replace(/ /g, '_').toLowerCase(),
          },
        });
        this.search = '';
        this.$router.push({
          path: `/encyclopedia${path}`,
        });
      } else if (e.keyCode === 38) {
        this.matchIndex = R.max(this.matchIndex - 1, 0);
      } else if (e.keyCode === 40) {
        this.matchIndex = R.min(this.matchIndex + 1, this.bestMatches.length - 1);
      } else {
        this.matchIndex = 0;
      }
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
    const { list } = await app.$axios.$get('/api/entries/list');
    return {
      breadcrumbPath: path === '/' ? null : path,
      tree,
      entry: R.head(entries),
      list,
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
