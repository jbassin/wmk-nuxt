<template>
  <article class="message is-info">
    <div
      class="message-header"
      @click="open">
      <p>{{ level.locked ? `Level ${index + 1}` : level.name }}</p>
      <a class="is-info">
        <span class="icon">
          <i
            :class="[level.locked ? 'fas fa-lock' : expanded ? 'fas fa-arrow-up' : 'fas fa-arrow-down']"/>
        </span>
      </a>
    </div>
    <div
      v-if="expanded"
      class="message-body animated fadeIn">
      <figure class="image is-16by9">
        <img :src="level.image">
      </figure>
      <br>
      <i>{{ level.flavor.text }}</i>
      <div class="has-text-right">
        <i>-- {{ level.flavor.author }}</i>
      </div>
      <br>
      {{ level.text }}
    </div>
  </article>
</template>

<script>
export default {
  name: 'UndermountainLevel',
  props: {
    index: {
      required: true,
      type: Number,
    },
    level: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    open() {
      if (!this.level.locked) {
        this.expanded = !this.expanded;
      }
    },
  },
};
</script>

<style scoped>

</style>
