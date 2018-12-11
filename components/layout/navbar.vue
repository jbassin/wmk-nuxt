<template>
  <div class="container has-text-centered">
    <div class="notification is-primary">
      <nav class="level">
        <div
          v-for="(item, index) in routes"
          :key="index"
          class="level-item">
          <nuxt-link
            :to="`/${item}`"
            class="button is-rounded is-primary">
            {{ item }}
          </nuxt-link>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutNavbar',
  data() {
    return {
      routes: [
        'tavern',
        'reputations',
        'recap',
        'undermountain',
        'encyclopedia',
      ],
    };
  },
};
</script>

<style scoped>
  .container {
    margin-top: 7px;
  }
</style>
