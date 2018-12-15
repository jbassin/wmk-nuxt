<template>
  <div class="container animated fadeIn">
    <div class="notification is-primary">
      <p class="title is-4">
        Login
      </p>
      <br>
      <div class="columns">
        <div
          v-if="!isLoggedIn"
          class="notification is-primary column is-three-fifths is-offset-one-fifth">
          <div
            v-if="lookupError"
            class="notification is-danger">
            <p class="subtitle is-6">
              Sorry, couldn't find that username/password combo. Switch it up and try again.
            </p>
          </div>
          <form @submit.prevent="submit">
            <div class="field">
              <label class="label has-text-light">Username</label>
              <div class="control has-icons-left">
                <input
                  v-model="username"
                  :class="usernameFormat.inputStyle"
                  class="input is-rounded"
                  type="text"
                  placeholder="Username"
                  @keyup="usernameTyped = true">
                <span
                  :class="usernameFormat.textStyle"
                  class="icon is-small is-left">
                  <i class="fas fa-user"/>
                </span>
              </div>
              <p
                :class="usernameFormat.textStyle"
                class="help">{{ usernameFormat.helpText }}</p>
            </div>
            <div class="field">
              <label class="label has-text-light">Password</label>
              <div class="control has-icons-left">
                <input
                  v-model="password"
                  :class="passwordFormat.inputStyle"
                  class="input is-rounded"
                  type="password"
                  placeholder="Password"
                  @keyup="passwordTyped = true">
                <span
                  :class="passwordFormat.textStyle"
                  class="icon is-small is-left">
                  <i class="fas fa-lock"/>
                </span>
              </div>
              <p
                :class="passwordFormat.textStyle"
                class="help">{{ passwordFormat.helpText }}</p>
            </div>
            <div class="field is-grouped is-grouped-right">
              <p class="control">
                <button
                  type="submit"
                  class="button is-primary">
                  Submit
                </button>
              </p>
            </div>
          </form>
        </div>
        <div
          v-else
          class="notification is-primary column is-three-fifths is-offset-one-fifth has-text-centered">
          <p class="title is-5">
            Currently logged in as:
          </p>
          <br>
          <p class="subtitle is-6 bottom-margin">
            {{ vuexUsername }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usernameTyped: false,
      passwordTyped: false,
      username: '',
      password: '',
      lookupError: false,
    };
  },
  computed: {
    usernameFormat() {
      if (!this.usernameTyped) {
        return {
          helpText: '',
          inputStyle: '',
          textStyle: '',
          valid: false,
        };
      }
      if (this.username === '') {
        return {
          helpText: 'Username cannot be empty',
          inputStyle: 'is-danger',
          textStyle: 'has-text-danger',
          valid: false,
        };
      }
      return {
        helpText: '',
        inputStyle: 'is-success',
        textStyle: 'has-text-success',
        valid: true,
      };
    },
    passwordFormat() {
      if (!this.passwordTyped) {
        return {
          helpText: '',
          inputStyle: '',
          textStyle: '',
          valid: false,
        };
      }
      if (this.password === '') {
        return {
          helpText: 'Password cannot be empty',
          inputStyle: 'is-danger',
          textStyle: 'has-text-danger',
          valid: false,
        };
      }
      return {
        helpText: '',
        inputStyle: 'is-success',
        textStyle: 'has-text-success',
        valid: true,
      };
    },
    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn'];
    },
    vuexUsername() {
      return this.$store.state.user.username;
    },
  },
  methods: {
    async submit() {
      if (this.usernameFormat.valid && this.passwordFormat.valid) {
        const { user } = await this.$post('/user/login', {
          username: this.username,
          password: this.$hash(this.password),
        });
        if (user.length === 0) {
          this.lookupError = true;
        } else {
          const {
            username, password, nickname, admin,
          } = user[0];
          console.log(username);
          this.$store.dispatch({
            type: 'user/login',
            username,
            password,
            nickname,
            admin,
          });
        }
      }
    },
  },
};
</script>

<style scoped>
  .bottom-margin {
    margin-bottom: 80px;
  }
</style>
