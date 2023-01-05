<template>
  <div class="home">
    <h2>My Amazing Counter</h2>

    <h3>{{ counter.counterTitle }}:</h3>

    <div>
      <button @click="counter.decreaseCounter()" class="btn">-</button>
      <span class="counter">{{ counter.count }}</span>
      <button @click="counter.increaseCounter()" class="btn">+</button>
    </div>

    <p>This counter is {{ counter.oddOrEven }}</p>

    <div class="edit">
      <h4>Edit Counter Title:</h4>
      <input v-autofocus type="text" v-model="counter.counterTitle" />
    </div>
  </div>
</template>

<script setup>
import { vAutofocus } from "@/directives/vAutofocus";
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();
</script>

<!-- 
<script>
import { ref } from 'vue';

export default {
  setup() {
    const counter = ref(0);

    const decreaseCounter = () => {
      counter.value --;
    }

    const increaseCounter = () => {
      counter.value ++;
    }

    return {
      counter,
      decreaseCounter,
      increaseCounter
    }
  }
}
</script> 
-->

<!-- 
<script>
export default {
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    increaseCounter() {
      this.counter++;
    },
    decreaseCounter() {
      this.counter--;
    }
  }
}
</script> 
-->

<style>
.home {
  text-align: center;
  padding: 20px;
}

.btn,
.counter {
  font-size: 40px;
  margin: 10px;
}

.edit {
  margin-top: 60px;
}
</style>
