export default ({ app }, inject) => {
  inject('get', async (path, params = {}) => app.$axios.$get(`http://iridium.duckdns.org:9010/api${path}`, {
    params,
  }));
};
