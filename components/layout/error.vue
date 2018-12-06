<template>
  <div class="container animated fadeIn">
    <div class="notification is-primary">
      <p
        class="title is-4">
        You seem to be lost... Error Code {{ error.statusCode }}
      </p>
      <span>
        This isn't a valid url on this webpage. You should probably try going somewhere that isn't here. That would help.
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutError',
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

</style>
