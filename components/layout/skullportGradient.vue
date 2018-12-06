<template>
  <canvas id="gradient-background"/>
</template>

<script>
import Granim from 'granim';

export default {
  name: 'LayoutSkullportGradient',
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
              { color: '#3f0f0e', pos: 0.6 },
              { color: '#ffff1a', pos: 0.8 },
              { color: '#3f0f0e', pos: 1 },
            ], [
              { color: '#3f0f0e', pos: 0.0 },
              { color: '#ffff1a', pos: 0.2 },
              { color: '#3f0f0e', pos: 0.4 },
            ],
          ],
          transitionSpeed: 7500,
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
