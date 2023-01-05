import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const counterTitle = "My Counter Title";

  const oddOrEven = computed(() => {
    if (count.value % 2 === 0) return "even";
    return "odd";
  });

  function increaseCounter() {
    count.value++;
  }

  function decreaseCounter() {
    count.value--;
  }

  return {
    count,
    counterTitle,
    oddOrEven,
    increaseCounter,
    decreaseCounter,
  };
});
