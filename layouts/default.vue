<template>
  <div class="all">
    <LayoutHeader/>
    <div>
      <nuxt/>
    </div>
  </div>
</template>

<script>
import LayoutHeader from '~/components/layout/header';

export default {
  components: {
    LayoutHeader,
  },
};
</script>

<style>
  @import 'bulmaswatch/lux/bulmaswatch.min.css';
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  .all {
    font-family: 'Roboto', sans-serif;
  }
</style>

<style scoped>
  .container {
    margin-top: 10px;
  }
</style>
