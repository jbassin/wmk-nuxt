<template>
  <div
    v-if="breadcrumbPath"
    class="container">
    <div class="notification is-primary">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <p class="title is-4">
              Encyclopedia
            </p>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <encyclopedia-breadcrumb :breadcrumb-path="require('ramda').tail(breadcrumbPath.split('/'))"/>
          </div>
        </div>
      </nav>
      <div class="columns">
        <div class="column is-4">
          <encyclopedia-tree/>
        </div>
      </div>
      {{ path }}
    </div>
  </div>
  <error v-else/>
</template>

<script>
import EncyclopediaBreadcrumb from '../../components/encyclopedia/breadcrumb';
import EncyclopediaTree from '../../components/encyclopedia/tree';
import Error from '../../layouts/error';

const R = require('ramda');

export default {
  components: {
    Error,
    EncyclopediaTree,
    EncyclopediaBreadcrumb,
  },
  computed: {
    path() {
      return R.tail(R.tail(this.$nuxt.$route.path.split('/')));
    },
  },
  async asyncData({ app, params }) {
    const { path } = await app.$axios.$get('/api/entries/path', {
      params: {
        root: R.last(params.pathMatch.split('/')),
      },
    });
    return {
      breadcrumbPath: path === '/' ? null : path,
    };
  },
};
</script>

<style scoped>

</style>
