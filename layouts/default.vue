<template>
  <div class="all">
    <layout-default-gradient/>
    <div id="z-wrapper">
      <layout-header/>
      <layout-navbar/>
      <div class="container-margin">
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutHeader from '~/components/layout/header';
import LayoutNavbar from '~/components/layout/navbar';
import LayoutDefaultGradient from '../components/layout/defaultGradient';

export default {
  components: {
    LayoutDefaultGradient,
    LayoutHeader,
    LayoutNavbar,
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
    margin-top: 7px;
    margin-bottom: 15px;
  }
  #z-wrapper {
    z-index: 1;
    position: relative;
  }
</style>
