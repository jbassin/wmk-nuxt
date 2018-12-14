<template>
  <div>
    <div class="container has-text-centered">
      <div class="notification is-primary">
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
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
            </div>
            <div class="level-item">
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
          </div>
          <div class="level-right">
            <div class="level-item">
              <a
                class="button is-rounded is-primary"
                @click="expand(user)">
                <span>User</span>
                <span class="icon is-small">
                  <i
                    :class="[currentlySelected.name !== 'user' ? 'fa-circle' : 'fa-dot-circle']"
                    class="far"/>
                </span>
              </a>
            </div>
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
  computed: {
    user() {
      return {
        name: 'user',
        pages: [
          'register',
          this.isLoggedIn ? 'logout' : 'login',
          'settings',
        ],
      };
    },
    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn'];
    },
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
