<template>
  <div class="container">
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
            <encylopedia-breadcrumb :breadcrumb-path="require('ramda').tail(breadcrumbPath.split('/'))"/>
          </div>
        </div>
      </nav>
      {{ path }}
    </div>
  </div>
</template>

<script>
import EncylopediaBreadcrumb from '~/components/encyclopedia/breadcrumb.vue';

const R = require('ramda');

export default {
  components: {
    EncylopediaBreadcrumb,
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
