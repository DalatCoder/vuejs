<template>
  <div id="app">
    <h1>Ninja Reaction Timer</h1>
    <button @click="start" :disabled="isPlaying">Play</button>

    <Block v-if="isPlaying" :delay="delay" @end="endGame" />

    <p v-if="showResults">Reaction time: {{ score }}</p>
  </div>
</template>

<script>
import Block from './components/Block.vue'

export default {
  name: 'App',
  data() {
    return {
      isPlaying: false,
      delay: null,
      score: null,
      showResults: false,
    }
  },
  components: {
    Block,
  },
  methods: {
    start() {
      this.isPlaying = true
      this.delay = 2000 + Math.random() * 5000 // Get random number between 2000 and 6999
      this.showResults = null
      console.log(this.delay)
    },
    endGame(reactionTime) {
      this.score = reactionTime
      this.isPlaying = false
      this.showResults = true
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #444;
  margin-top: 60px;
}
</style>
