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
            <encylopedia-breadcrumb/>
          </div>
        </div>
      </nav>
      {{ $nuxt.$route.path }}
    </div>
  </div>
</template>

<script>
import EncylopediaBreadcrumb from '~/components/encyclopedia/breadcrumb.vue';

export default {
  components: {
    EncylopediaBreadcrumb,
  },
};
</script>

<style scoped>

</style>
