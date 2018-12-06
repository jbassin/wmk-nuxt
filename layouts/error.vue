<template>
  <layout-error
    :error="error"
    class="container-margin"/>
</template>

<script>
import LayoutHeader from '~/components/layout/header';
import LayoutNavbar from '~/components/layout/navbar';
import LayoutError from '../components/layout/error';

export default {
  components: {
    LayoutError,
    LayoutHeader,
    LayoutNavbar,
  },
  props: {
    error: {
      type: Object,
      default() {
        return {
          statusCode: 404,
        };
      },
    },
  },
};
</script>

<style scoped>
  .container-margin {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
