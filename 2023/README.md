# VueJS 3: Compositioin API (with Pinia, Firebase 9 & Vite)

## Introduction

### What is the `composition API`

- New way to create Vue Components
- Alternative to Options API
- Solves 2 main problems:
  - Group relevant code together
  - Reuse code more easily (`Composable`)

Using `Option API`

```vue
<script>
export default {
  data() {
    return {
      username: "hieu",
      isModalShow: false,
    };
  },
  methods: {
    updateUsername(newUsername) {
      this.username = newUsername;
    },
    showModal() {
      this.isModalShow = true;
    },
  },
  mounted() {
    this.updateUsername("HIEU");
    this.showModal();
  },
};
</script>
```

Using `Composition API` (easy grouping related code together)

```vue
<script setup>
import { ref, onMounted } from "vue";

// usernamecode
const username = ref("hieu");
function updateUsername(newUsername) {
  username.value = newUsername;
}
onMounted(() => {
  updateUsername("HIEU");
});

// modal code
const isModalShow = ref(false);
function showModal() {
  isModalShow.value = true;
}
onMounted(() => {
  showModal();
});
</script>
```

Reuse code in `option API` using `mixin`

```js
// mixinUsername.js

export default {
  data() {
    return {
      username: "hieu",
    };
  },
  methods: {
    updateUesrname(newUsername) {
      this.username = newUsername;
    },
  },
};
```

Import `mixin` in `option API`

```vue
<script>
import mixinUsername from "@/mixins/mixinUsername";
import mixinModal from "@/mixins/mixinModal";

export default {
  mixins: [mixinUsername, mixinModal],
  mounted() {
    this.updateUsername("");
    this.showModal();
  },
};
</script>
```

Code reuse in `composition API` using `composable`

```js
// use/useUsername.js

import { ref } from "vue";

export function useUsername() {
  const username = ref("hieu");

  function updateUsername(newUsername) {
    username.value = newUsername;
  }

  return {
    username,
    updateUsername,
  };
}
```

Import `composable` in `option API`

```vue
<script>
import { useUsername } from "@/use/useUsername";

const { username, updateUsername } = useUsername();

onMounted(() => {
  updateUsername("HIEU");
});
</script>
```

### Setup simple `vue` app

- `node`: `version 16 LTS`
- `npm install vue@latest`

## Option API vs Composition API - Switching over

### Setup Option API

Build a simple counter app with option API

```vue
<template>
  <div class="home">
    <div>
      <button class="btn">-</button>
      <span class="counter">0</span>
      <button class="btn">+</button>
    </div>
  </div>
</template>

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
</style>
```

Data & Methods

```vue
<template>
  <div class="home">
    <div>
      <button @click="decreaseCounter" class="btn">-</button>
      <span class="counter">{{ counter }}</span>
      <button @click="increaseCounter" class="btn">+</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increaseCounter() {
      this.counter++;
    },
    decreaseCounter() {
      this.counter--;
    },
  },
};
</script>

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
</style>
```

### Switch to Composition API

Everything in the `<template>` stays the same. The only place we do things
differently is in the `<script>` section.

We can use composition API with 2 different patterns:

- `setup` function pattern
- script `setup` pattern (much better)

```vue
<script>
export default {
  setup() {},
};
</script>
```

The are 2 type of `reactive` data in composition API

- `ref` object: single item such as a string, an array or a number
- `reactive` object: multiple related item group together

`setup` function pattern

```vue
<script>
import { ref } from "vue";

export default {
  setup() {
    const counter = ref(0);

    const decreaseCounter = () => {
      counter.value--;
    };

    const increaseCounter = () => {
      counter.value++;
    };

    return {
      counter,
      decreaseCounter,
      increaseCounter,
    };
  },
};
</script>
```

`setup` script pattern

```vue
<script setup>
import { ref } from "vue";

const counter = ref(0);

const decreaseCounter = () => {
  counter.value--;
};

const increaseCounter = () => {
  counter.value++;
};
</script>
```

## Refs, Reactive Objects & Non-reactive data

There are 3 main types of data that we can use in a composition API app

- `ref`
- `reactive` object
- `non-reactive` data

### Two ways data binding

```vue
<template>
  <div class="edit">
    <h4>Edit Counter Title:</h4>
    <input v-model="counterTitle" type="text" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const counterTitle = ref("My Counter");
</script>
```

### Reactive objects

We can see that `ref` are handy for storing simple independent items
of data such as a `number` or a `string`. But what if we want to store
a bunch of data of different data that's related together in a single object.
A bit like we did with the `data method` in `Option API`

```vue
<template>
  <div class="home">
    <h3>{{ counterData.title }}:</h3>

    <div>
      <button @click="decreaseCounter" class="btn">-</button>
      <span class="counter">{{ counterData.count }}</span>
      <button @click="increaseCounter" class="btn">+</button>
    </div>

    <div class="edit">
      <h4>Edit Counter Title:</h4>
      <input v-model="counterData.title" type="text" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const counter = ref(0);
const counterTitle = ref("My Counter");

const counterData = reactive({
  count: 0,
  title: "My Counter",
});

const decreaseCounter = () => {
  counterData.count--;
};

const increaseCounter = () => {
  counterData.count++;
};
</script>
```

### Non-reactive data

Any data properties in your component that don't need to be `reactive`,
you should make `non-reactive` as this will improve the performance of
our app.

```vue
<template>
  <div class="home">
    <h2>{{ appTitle }}</h2>
  </div>
</template>

<script setup>
const appTitle = "My Amazing Counter App";
</script>
```
