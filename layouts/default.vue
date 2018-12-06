<template>
  <div class="all">
    <layout-header/>
    <layout-navbar/>
    <div class="container-margin">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import LayoutHeader from '~/components/layout/header';
import LayoutNavbar from '~/components/layout/navbar';

export default {
  components: {
    LayoutHeader, LayoutNavbar,
  },
};
</script>

<style>
  @import 'bulmaswatch/lux/bulmaswatch.min.css';
  @import "@fortawesome/fontawesome-free/css/all.min.css";
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  .all {
    font-family: 'Roboto', sans-serif;
  }
  .container-margin {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
