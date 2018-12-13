<template>
  <div class="notification is-dark">
    <p class="title is-5 has-text-centered">
      {{ capsTitle }}
    </p>
    <div
      v-for="(item, index) in visibleEntries"
      :key="index">
      <p class="subtitle is-5">
        {{ item.title }}
      </p>
      <span
        v-for="(text, textIndex) in item.text"
        :key="textIndex">
        <span v-if="text.type === 'link'"><nuxt-link
          v-if="getPath(text.text) !== ''"
          :to="getPath(text.text)">{{ text.text }}</nuxt-link><span v-else>{{ text.text }}</span></span>
        <span v-else-if="text.type === 'bold'"><b>{{ text.text }}</b></span>
        <span v-else-if="text.type === 'italics'"><i>{{ text.text }}</i></span>
        <span v-else-if="text.type === 'obfuscated'">{{ text.text }}</span>
        <span v-else>{{ text.text }}</span>
      </span>
      <div
        v-if="index !== visibleEntries.length - 1"
        class="is-divider"/>
    </div>
  </div>
</template>

<script>
const R = require('ramda');

export default {
  name: 'EncyclopediaEntry',
  props: {
    entry: {
      required: true,
      type: Object,
    },
    tree: {
      required: true,
      type: Object,
    },
    path: {
      required: true,
      type: String,
    },
  },
  computed: {
    capsTitle() {
      const capitalCase = R.pipe(R.split(' '), R.map(word => `${R.toUpper(R.head(word))}${R.toLower(R.tail(word))}`), R.join(' '));
      return capitalCase(this.entry.title);
    },
    visibleEntries() {
      return R.filter(entry => entry.visible, this.entry.entry);
    },
    paths() {
      const formatTree = R.curry((parentLink, node) => {
        if (!node) return [];
        const thisNode = {
          name: node.title,
          path: `${parentLink}/${node.title}`,
        };
        const childNodes = R.map(formatTree(thisNode.path), node.children);
        return R.concat([thisNode], childNodes);
      });
      return R.flatten(formatTree(this.path, this.tree));
    },
  },
  methods: {
    getPath(node) {
      return R.reduce((o, n) => {
        if (n.name === node.toLowerCase()) return n.path.replace(/ /g, '_');
        return o;
      }, '', this.paths);
    },
  },
};
</script>

<style scoped>
  @import "bulma-divider/dist/css/bulma-divider.min.css";
  p.subtitle.is-5 {
    margin-bottom: 2px;
    margin-top: 6px;
  }
  div.is-divider {
    margin-top: 8px;
    margin-bottom: 15px;
  }
</style>
