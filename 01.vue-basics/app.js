const app = Vue.createApp({
  data() {
    return {
      showName: true,
      name: 'Trong Hieu',
      x: 0,
      y: 0,
      books: [
        { title: 'Book 1', author: 'Author 1' },
        { title: 'Book 2', author: 'Author 2' },
        { title: 'Book 3', author: 'Author 3' },
      ],
    }
  },
  methods: {
    toggleNameDisplay() {
      this.showName = !this.showName
    },
    handleEvent(event) {
      console.log(`Event: ${event.type}`)
    },
    handleMousemove(event) {
      this.x = event.offsetX
      this.y = event.offsetY
    },
  },
})

app.mount('#app')
