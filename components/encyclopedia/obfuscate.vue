<template>
  <span><span
    v-for="(character, index) in output.split('')"
    :key="index"
    class="monospace">{{ character }}</span></span>
</template>

<script>
export default {
  name: 'EncyclopediaObfuscate',
  props: {
    input: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      output: '',
    };
  },
  computed: {
    outputLength() {
      return this.input.length;
    },
  },
  created() {
    this.output = this.input;
    setInterval(() => {
      this.obfuscateScript();
    }, 100);
  },
  methods: {
    obfuscateScript() {
      const runeString = 'ᚠᚡᚢᚤᚥᚦᚧᛰᚨᚩᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚹᛩᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛮᛇᛈᛕᛉᛊᛋᛪᛌᛍᛎᛏᛐᛑᛒᛓᛔᛖᛗᛘᛙᛯᛚᛛᛜᛝᛞᛟᚪᚫᚣᛠᛣᚸᛤᛡᛢᛥᛦᛧᛨ';
      const runeLength = 78;
      for (let i = 0; i < this.outputLength / 5; i += 1) {
        const randomIndex = Math.floor(Math.random() * this.outputLength);
        if (this.output.charAt(randomIndex) !== ' ') {
          this.output = this.setCharAt(this.output, randomIndex, runeString.charAt(Math.floor(Math.random() * runeLength)));
        }
      }
    },
    setCharAt(str, index, chr) {
      if (index > str.length - 1) {
        return str;
      }
      return str.substr(0, index) + chr + str.substr(index + 1);
    },
  },
};
</script>

<style scoped>
  .monospace {
    display: inline-block;
    width: 10px;
  }
</style>
