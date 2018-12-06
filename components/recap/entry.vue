<template>
  <article class="message is-link">
    <div
      class="message-header"
      @click="flip">
      <p>{{ date }}</p>
      <div
        class="button is-link"
        @click.native="flip">
        <span class="icon">
          <i :class="[expanded ? 'fas fa-arrow-up' : 'fas fa-arrow-down']"/>
        </span>
      </div>
    </div>
    <div
      v-if="expanded"
      class="message-body">
      {{ entry }}
    </div>
  </article>
</template>

<script>
export default {
  name: 'RecapEntry',
  props: {
    entry: {
      required: true,
      type: String,
    },
    date: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      expanded: true,
    };
  },
  methods: {
    flip() {
      this.expanded = !this.expanded;
    },
  },
};
</script>
