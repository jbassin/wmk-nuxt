<template>
  <div class="container">
    <div class="notification is-primary">
      <p class="title is-4">
        Logout
      </p>
      <br>
      <div class="columns">
        <div class="notification is-primary column is-three-fifths is-offset-one-fifth has-text-centered">
          <p class="title is-5">
            Currently logged in as:
          </p>
          <br>
          <p class="subtitle is-6">
            {{ vuexUsername }}
          </p>
          <br>
          <div class="field bottom-margin is-grouped is-grouped-centered">
            <p class="control">
              <a
                class="button is-danger"
                @click="logout">
                Logout?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn'];
    },
    vuexUsername() {
      return this.$store.state.user.username;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch({
        type: 'user/login',
        username: '',
        password: '',
        nickname: '',
        admin: false,
      });
      this.$router.push({
        path: '/login',
      });
    },
  },
};
</script>

<style scoped>
  .bottom-margin {
    margin-bottom: 40px;
  }
</style>
