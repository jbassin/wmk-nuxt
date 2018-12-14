<template>
  <div class="container">
    <div class="notification is-primary">
      <p class="title is-4">
        The Undermountain
      </p>
      <undermountain-level
        v-for="(level, index) in levels"
        :key="index"
        :level="level"
        :index="index"/>
    </div>
  </div>
</template>

<script>
import UndermountainLevel from '../../components/undermountain/level';

export default {
  components: { UndermountainLevel },
  async asyncData({ app }) {
    const { levels } = await app.$get('/undermountain');
    return {
      levels,
    };
  },
  head() {
    return {
      title: 'WKMM: Undermountain',
    };
  },
};
</script>

<style scoped>

</style>
