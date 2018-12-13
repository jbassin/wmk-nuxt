<template>
  <div>
    <span
      v-for="(item, index) in treeStructure"
      :key="index"
      class="more-whitespace">
      {{ `${`${'│ '.repeat(item.index)}└─`.substring(2)}` }}
      <nuxt-link
        :to="item.path.replace(/ /g, '_')"
        class="entry-link">
        {{ item.name }}
      </nuxt-link>
      <br>
    </span>
  </div>
</template>

<script>
const R = require('ramda');

export default {
  name: 'EncyclopediaTree',
  props: {
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
    treeStructure() {
      const formatTree = R.curry((index, parentLink, node) => {
        if (!node) return [];
        const thisNode = {
          name: node.title,
          index,
          path: `${parentLink}/${node.title}`,
        };
        const childNodes = R.map(formatTree(index + 1, thisNode.path), node.children);
        return R.concat([thisNode], childNodes);
      });
      return R.flatten(formatTree(0, this.path, this.tree));
    },
  },
};
</script>

<style scoped>
  .more-whitespace {
    /*white-space: pre;*/
  }
  .entry-link {
    text-decoration: none !important;
  }
  .entry-link:hover{
    text-decoration: underline !important;
  }
</style>
