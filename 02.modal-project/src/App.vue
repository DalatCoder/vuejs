  <template>
  <Modal />
</template>

<script>
import Modal from './components/Modal.vue'

export default {
  name: 'App',
  components: {
    Modal
  },
  methods: {
    handleClick() {
      console.log(this.$refs.username)
      this.$refs.username.classList.add('active')
      this.$refs.username.focus()
    }
  }
}
</script>

<style>
*, *::before, *::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
