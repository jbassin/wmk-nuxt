import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
  if (process.browser) {
    window.onNuxtReady(() => {
      createPersistedState()(store);
    });
  }
};
