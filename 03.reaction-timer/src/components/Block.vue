<template>
  <div class="block" v-show="showBlock" @click="stopTimer" ref="block">
    Click me
  </div>
</template>

<script>
export default {
  props: ['delay'],
  data() {
    return {
      showBlock: false,
      timer: null,
      reactionTime: 0,
    }
  },
  mounted() {
    const x =
      20 +
      Math.random() * document.body.clientWidth -
      this.$refs.block.clientWidth

    const y =
      20 +
      Math.random() * document.body.clientHeight -
      this.$refs.block.clientHeight

    this.$refs.block.style.left = x + 'px'
    this.$refs.block.style.top = y + 'px'

    setTimeout(() => {
      this.showBlock = true
      this.startTimer()

      console.log(this.delay)
    }, this.delay)
  },
  updated() {
    console.log('Component updated')
  },
  unmounted() {
    console.log('Component unmounted')
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.reactionTime += 10
      }, 10)
    },
    stopTimer() {
      clearInterval(this.timer)
      this.$emit('end', this.reactionTime)
    },
  },
}
</script>

<style>
.block {
  width: 300px;
  border-radius: 20px;
  background: #0faf87;
  color: white;
  text-align: center;
  padding: 70px 0;
  cursor: pointer;
  user-select: none;

  position: absolute;
}
</style>
