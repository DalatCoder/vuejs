<template>
  <h1>{{ title }}</h1>

  <div v-if="showModal">
    <Modal :header="header" :text="text" :theme="theme" @closeModal="toggleModal" />
  </div>

  <button @click="toggleModal">Open Modal</button>
</template>

<script>
import Modal from './components/Modal.vue'

export default {
  name: 'App',
  components: {
    Modal
  },
  data() {
    return {
      title: 'My First Vue App!',
      header: 'Sign up for the Giveaway!',
      text: 'Grab your ninja swag for half price!',
      theme: 'sale',
      showModal: false
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
