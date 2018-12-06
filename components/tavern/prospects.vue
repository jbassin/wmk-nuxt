<template>
  <tr>
    <td :style="color">
      {{ prospect.text }}
    </td>
    <td class="has-text-right">
      <span :style="color">
        {{ (prospect.value >= 0 ? '+' : '-').repeat(Math.floor(Math.abs(prospect.value) / 5) + 1) }}
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'TavernProspects',
  props: {
    prospect: {
      required: true,
      type: Object,
    },
    limits: {
      required: true,
      type: Object,
    },
  },
  computed: {
    color() {
      let color = 'rgb(155, 155, 155)';
      if (this.prospect.value > 0) {
        color = `rgb(155, ${((this.prospect.value / this.limits.max) * 155) + 155}, 155)`;
      } else if (this.prospect.value < 0) {
        color = `rgb(${((this.prospect.value / this.limits.min) * 155) + 155}, 155, 155)`;
      }
      return {
        color,
      };
    },
  },
};
</script>

<style scoped>

</style>
