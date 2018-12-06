<template>
  <canvas id="gradient-background"/>
</template>

<script>
import Granim from 'granim';

export default {
  name: 'LayoutDefaultGradient',
  data() {
    return {
      gradient: {},
    };
  },
  mounted() {
    this.gradient = new Granim({
      element: '#gradient-background',
      direction: 'radial',
      defaultStateName: 'default-state',
      states: {
        'default-state': {
          gradients: [
            [
              { color: '#aaaaaa', pos: 0.2 },
              { color: '#666666', pos: 0.8 },
              { color: '#aaaaaa', pos: 1 },
            ], [
              { color: '#666666', pos: 0 },
              { color: '#aaaaaa', pos: 0.2 },
              { color: '#666666', pos: 0.75 },
            ],
          ],
          transitionSpeed: 15000,
          loop: true,
        },
      },
    });
  },
};
</script>

<style>
  #gradient-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
