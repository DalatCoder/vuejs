import { watch } from "vue";

export const useWatchCharacters = (valueToWatch) => {
  watch(valueToWatch, (newValue, _oldValue) => {
    if (newValue.length >= 100) {
      alert("Only 100 characters allowed");
    }
  });
};
