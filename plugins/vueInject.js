import SHA256 from 'crypto-js/sha256';

export default ({ app }, inject) => {
  inject('get', async (path, params = {}) => app.$axios.$get(`http://iridium.duckdns.org:9010/api${path}`, params));

  inject('post', async (path, body = {}) => app.$axios.$post(`http://iridium.duckdns.org:9010/api${path}`, body));

  inject('hash', hash => SHA256(hash).toString());
};
