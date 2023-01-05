import { computed, onMounted, onUnmounted, reactive, watch } from "vue";

const counterData = reactive({
  count: 0,
  title: "My Counter",
});

export function useCounter() {
  watch(
    () => counterData.count,
    (newCount, oldCount) => {
      if (newCount === 20) alert("Reach 20");
    }
  );

  const decreaseCounter = () => {
    counterData.count -= 1;
  };

  const increaseCounter = () => {
    counterData.count += 1;
  };

  const oddOrEven = computed(() => {
    if (counterData.count % 2 === 0) return "even";
    return "odd";
  });

  onMounted(() => {
    console.log("onMounted");
  });

  onUnmounted(() => {
    console.log("onUnmounted");
  });

  return {
    counterData,
    decreaseCounter,
    increaseCounter,
    oddOrEven,
  };
}
