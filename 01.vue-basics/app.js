const app = Vue.createApp({
  data() {
    return {
      showName: true,
      name: 'Trong Hieu',
    }
  },
  methods: {
    toggleNameDisplay() {
      this.showName = !this.showName
    },
  },
})

app.mount('#app')
