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

## Methods, Computed & Watch

### Methods

Simple methods

```vue
<template>
  <div class="home">
    <div>
      <button @click="decreaseCounter" class="btn">-</button>
      <span class="counter">{{ counterData.count }}</span>
      <button @click="increaseCounter" class="btn">+</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const counterData = reactive({
  count: 0,
  title: "My Counter",
});

const decreaseCounter = () => {
  counterData.count -= 1;
};

const increaseCounter = () => {
  counterData.count += 1;
};
</script>
```

Methods that receive some args

```vue
<template>
  <div class="home">
    <div>
      <button @click="decreaseCounter(1)" class="btn">-</button>
      <span class="counter">{{ counterData.count }}</span>
      <button @click="increaseCounter(1)" class="btn">+</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const counterData = reactive({
  count: 0,
  title: "My Counter",
});

const decreaseCounter = (amount) => {
  counterData.count -= amount;
};

const increaseCounter = (amount) => {
  counterData.count += amount;
};
</script>
```

Passing `event` object

```vue
<template>
  <div class="home">
    <div>
      <button @click="decreaseCounter(1, $event)" class="btn">-</button>
      <span class="counter">{{ counterData.count }}</span>
      <button @click="increaseCounter(1, $event)" class="btn">+</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const counterData = reactive({
  count: 0,
  title: "My Counter",
});

const decreaseCounter = (amount, e) => {
  counterData.count -= amount;
};

const increaseCounter = (amount, e) => {
  counterData.count += amount;
};
</script>
```

### Computed Properties

Computed properties are properties which are usually generated based on
relative data which are cached and only updated when their dependencies
change.

Using `option API`

```vue
<script>
export default {
  computed: {
    myComputedProterty() {
      // perform logic
      return "";
    },
  },
};
</script>
```

Using `composition API`

```vue
<template>
  <p>This counter is {{ oddOrEven }}</p>
</template>

<script setup>
import { computed, reactive, ref } from "vue";

const counter = ref(0);
const counterTitle = ref("My Counter");

const appTitle = "My Amazing Counter App";

const counterData = reactive({
  count: 0,
  title: "My Counter",
});
const oddOrEven = computed(() => {
  if (counterData.count % 2 === 0) return "even";
  return "odd";
});

const decreaseCounter = (amount) => {
  counterData.count -= amount;
};

const increaseCounter = (amount) => {
  counterData.count += amount;
};
</script>
```

### A note of filters

In `vue 2`, we have `filters` property. But it's removed in `vue 3`

### Watch

Watches allow us to essentially watch a `reactive` data property
and then do something whenever it changes

Using `option API`

```vue
<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  watch: {
    count(newCount, oldCount) {
      if (newCount === 20) alert("watch");
    },
  },
};
</script>
```

Using `composition API`

```vue
<script setup>
import { computed, reactive, ref, watch } from "vue";

const counterData = reactive({
  count: 0,
  title: "My Counter",
});

watch(
  () => counterData.count,
  (newCount, oldCount) => {
    if (newCount === 20) alert("watch");
  }
);

const simple = ref(0);
watch(simple, () => {});
</script>
```

### Lifecycle hooks

### Mounted Hooks

Lifecycle hooks allow us to execute code at different `stages` of our component's
lifecycle so we can execute code when a component is `mounted`, as in when it's
`loaded` into the browser. Or we can execute code when it's `unmounted` as in `unloaded`
from the browser.

Using `option API`

```vue
<script>
export default {
  mounted() {
    // do stuff when component is loaded
  },
  unmounted() {
    // do stuff when component is unloaded
  },
};
</script>
```

In the `option API`, we could only add `1 hook` of each type. This meant that
we often needed to bundle a lot of unrelated logic all together in
these hooks.

In the `composition API`, we can make as many hooks as we like

```vue
<script setup>
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from "vue";

onBeforeMount(() => {
  console.log("onBeforeMount");
});
onMounted(() => {
  console.log("onMounted");
});
onBeforeUnmount(() => {
  console.log("onBeforeUnmount");
});
onUnmounted(() => {
  console.log("onUnmounted");
});
</script>
```

If we reload the page, we could see the `onBeforeMount` and `onMounted`. When
we head to about page, we will see the `onBeforeUnmount` and `onUnmounted`

### Activated Hooks

```vue
<script setup>
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated,
  reactive,
  ref,
  watch,
} from "vue";

onActivated(() => {
  console.log("onActivated");
});
onDeactivated(() => {
  console.log("onDeactivated");
});
</script>
```

These hooks will only fired if our components are being kept alive.
That meant that the component keeps running in the background, even
when it's not being displayed on the page.

```vue
<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
```

### Updated Hooks

This hook will fire whenever the template changes.

```vue
<script setup>
import {
  computed,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";

const counter = ref(0);
const counterTitle = ref("My Counter");

const appTitle = "My Amazing Counter App";

const counterData = reactive({
  count: 0,
  title: "My Counter",
});

watch(
  () => counterData.count,
  (newCount, oldCount) => {
    if (newCount === 20) alert("watch");
  }
);

const oddOrEven = computed(() => {
  if (counterData.count % 2 === 0) return "even";
  return "odd";
});

const decreaseCounter = (amount) => {
  counterData.count -= amount;
};

const increaseCounter = (amount) => {
  counterData.count += amount;
};

onBeforeMount(() => {
  console.log("onBeforeMount");
});
onMounted(() => {
  console.log("onMounted");
});
onBeforeUnmount(() => {
  console.log("onBeforeUnmount");
});
onUnmounted(() => {
  console.log("onUnmounted");
});
onActivated(() => {
  console.log("onActivated");
});
onDeactivated(() => {
  console.log("onDeactivated");
});
onBeforeUpdate(() => {
  console.log("onBeforeUpdate");
});
onUpdated(() => {
  console.log("onUpdated");
});
</script>
```

### Multiple Hooks

```vue
<script setup>
onMounted(() => {});
onMounted(() => {});
</script>
```

## Directive

Vue is full of directives out of the box such as `v-model`, `v-show`, ... We
can create our own custom directives to add functionality to elements so that
we can do something to an element once it's been created or mounted.

### Local custom directives

Let's create a directive which focuses the input element

Using `option API`

```vue
<script>
export default {
  directives: {
    autofocus: {
      mounted(element) {
        element.focus();
      },
    },
  },
};
</script>

<template>
  <input v-autofocus />
</template>
```

Using `composition API`

```vue
<script setup>
const vAutofocus = {
  mounted: (element) => {
    element.focus();
  },
};
</script>

<template>
  <input v-autofocus />
</template>
```

### Global custom directives

Create new file in `@/directives/vAutofocus.js`

```js
// v-autofocus
export const vAutofocus = {
  mounted: (element) => {
    element.focus();
  },
};
```

Import our global custom directive

```vue
<script setup>
import { vAutofocus } from "@/directives/vAutofocus";
</script>
```

## Vue Routers

### `$route`

When using `option API`, we could use the `$route` object to access things
like the current route path or route parameters. We can still use this `$route`
in `composition API`

### Setup some `post` routes

Add new URL in `@/router`

```js
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/posts",
      name: "posts",
      component: () => import("../views/PostsView.vue"),
    },
    {
      path: "/posts/:id",
      name: "postDetail",
      component: () => import("../views/PostDetailView.vue"),
    },
  ],
});
```

Posts page

```vue
<template>
  <div class="posts">
    <h1>Posts</h1>

    <ul>
      <li>
        <router-link to="/posts/1">Post 1</router-link>
      </li>
      <li>
        <router-link to="/posts/2">Post 2</router-link>
      </li>
      <li>
        <router-link to="/posts/3">Post 3</router-link>
      </li>
      <li>
        <router-link to="/posts/4">Post 4</router-link>
      </li>
      <li>
        <router-link to="/posts/5">Post 5</router-link>
      </li>
    </ul>
  </div>
</template>
```

Post detail page

```vue
<template>
  <div class="posts-detail">
    <h1>Post Detail</h1>
  </div>
</template>
```

### Using `$route`

Using `$route` in `<template>` to get the router information.

```vue
<template>
  <div class="posts-detail">
    <h1>This is a post detail page</h1>
    <p>Display the content of post with ID of {{ $route.params.id }}</p>

    <p>
      <router-link to="/posts">&lt; Back</router-link>
    </p>
  </div>
</template>
```

However, to access `$route` in script setup, we cannot use `this.$route`.
Instead we use `useRoute` composable.

### Using `useRoute` composable

Get current params

```vue
<script setup>
import { useRoute } from "vue-router";

// this.$route
const route = useRoute();

const showPostId = () => {
  alert(`ID: ${route.params.id}`);
};
</script>
```

Push route programmatically

```vue
<script setup>
import { useRoute, useRouter } from "vue-router";

/**
 * Route
 */

// this.$route
const route = useRoute();

const showPostId = () => {
  alert(`ID: ${route.params.id}`);
};

/**
 * Router
 */

// this.$router
const router = useRouter();

const goHome = () => {
  router.push("/");

  // push by name
  // router.push({
  //   name: "home",
  // });

  // push with params
  // router.push({
  //   name: "postDetail",
  //   params: {
  //     id: 1,
  //   },
  // });
};
</script>
```

## Other features

### Lists

Lists using the `v-for` directive works exactly the same way in the
`composition API` as they did before.

```vue
<!-- postsView.vue -->

<template>
  <div class="posts">
    <h1>Posts</h1>

    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const postData = [1, 2, 3, 4, 5, 6, 7].map((id) => ({
  id,
  title: `Post ${id}`,
}));
const posts = ref(postData);
</script>

<style scoped>
ul {
  margin-bottom: 30px;
  list-style: none;
}
</style>
```

### Template Refs

In `option API`, we could add a `ref` attribute to an element, give it a
name and then we could access this element on the component `mounted`
and then do something to it such as `focus`, get element `width`,...

In `composition API`, we still use the `ref` attribute and then, we define
a `data ref` whose name equal to the `template ref`

```vue
<template>
  <div class="posts">
    <h1 ref="titleRef">Posts</h1>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

/**
 * Template Refs
 */
// this.$refs.titleRef
const titleRef = ref(null);

onMounted(() => {
  console.log(titleRef.value);
  console.log(titleRef.value.offsetWidth);
});
</script>
```

### `nextTick`

`nextTick` allow us to wait until the DOM has updated and then do something.

Using `option API`

```vue
<script>
const increaseCounter = () => {
  // this.$nextTick(() => {});
};
</script>
```

Using `composition API`

```vue
<script>
const increaseCounter = () => {
  counter.value += 1;
  nextTick(() => {
    console.log("DOM has been updated");
  });
};

const decreaseCounter = async () => {
  counter.value += 1;
  await nextTick();
  console.log("DOM has been updated");
};
</script>
```
