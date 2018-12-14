<template>
  <div>
    <div class="container has-text-centered">
      <div class="notification is-primary">
        <nav class="level">
          <div class="level-left">
            <a
              class="button is-rounded is-primary"
              @click="expand(status)">
              <span>Status</span>
              <span class="icon is-small">
                <i
                  :class="[currentlySelected.name !== 'status' ? 'fa-circle' : 'fa-dot-circle']"
                  class="far"/>
              </span>
            </a>
            <a
              class="button is-rounded is-primary"
              @click="expand(info)">
              <span>Info</span>
              <span class="icon is-small">
                <i
                  :class="[currentlySelected.name !== 'info' ? 'fa-circle' : 'fa-dot-circle']"
                  class="far"/>
              </span>
            </a>
          </div>
        </nav>
      </div>
    </div>
    <div
      v-if="currentlySelected.pages.length > 0"
      class="container has-text-centered">
      <div class="notification is-primary">
        <nav class="level">
          <div
            v-for="(item, index) in currentlySelected.pages"
            :key="index"
            class="level-item">
            <nuxt-link
              :to="`/${item === 'encyclopedia' ? `${item}/index` : item}`"
              class="button is-rounded is-primary">
              {{ item }}
            </nuxt-link>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutNavbar',
  data() {
    return {
      status: {
        name: 'status',
        pages: [
          'tavern',
          'reputations',
        ],
      },
      info: {
        name: 'info',
        pages: [
          'recap',
          'undermountain',
          'encyclopedia',
        ],
      },
      currentlySelected: {
        name: '',
        pages: [],
      },
    };
  },
  methods: {
    expand(pages) {
      if (this.currentlySelected.name === pages.name) {
        this.currentlySelected = {
          name: '',
          pages: [],
        };
      } else {
        this.currentlySelected = pages;
      }
    },
  },
};
</script>

<style scoped>
  .container {
    margin-top: 7px;
  }
</style>
