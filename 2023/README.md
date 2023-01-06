# VueJS 3: Compositioin API (with Pinia, Firebase 9 & Vite)

- [VueJS 3: Compositioin API (with Pinia, Firebase 9 \& Vite)](#vuejs-3-compositioin-api-with-pinia-firebase-9--vite)
  - [1. Introduction](#1-introduction)
    - [1.1. What is the `composition API`](#11-what-is-the-composition-api)
    - [1.2. Setup simple `vue` app](#12-setup-simple-vue-app)
  - [2. Option API vs Composition API - Switching over](#2-option-api-vs-composition-api---switching-over)
    - [2.1. Setup Option API](#21-setup-option-api)
    - [2.2. Switch to Composition API](#22-switch-to-composition-api)
  - [3. Refs, Reactive Objects \& Non-reactive data](#3-refs-reactive-objects--non-reactive-data)
    - [3.1. Two ways data binding](#31-two-ways-data-binding)
    - [3.2. Reactive objects](#32-reactive-objects)
    - [3.3. Non-reactive data](#33-non-reactive-data)
  - [4. Methods, Computed \& Watch](#4-methods-computed--watch)
    - [4.1. Methods](#41-methods)
    - [4.2. Computed Properties](#42-computed-properties)
    - [4.3. A note of filters](#43-a-note-of-filters)
    - [4.4. Watch](#44-watch)
    - [4.5. Lifecycle hooks](#45-lifecycle-hooks)
    - [4.6. Mounted Hooks](#46-mounted-hooks)
    - [4.7. Activated Hooks](#47-activated-hooks)
    - [4.8. Updated Hooks](#48-updated-hooks)
    - [4.9. Multiple Hooks](#49-multiple-hooks)
  - [5. Directive](#5-directive)
    - [5.1. Local custom directives](#51-local-custom-directives)
    - [5.2. Global custom directives](#52-global-custom-directives)
  - [6. Vue Routers](#6-vue-routers)
    - [6.1. `$route`](#61-route)
    - [6.2. Setup some `post` routes](#62-setup-some-post-routes)
    - [6.3. Using `$route`](#63-using-route)
    - [6.4. Using `useRoute` composable](#64-using-useroute-composable)
  - [7. Other features](#7-other-features)
    - [7.1. Lists](#71-lists)
    - [7.2. Template Refs](#72-template-refs)
    - [7.3. `nextTick`](#73-nexttick)
    - [7.4. Teleport](#74-teleport)
  - [8. Child Components, props, emits](#8-child-components-props-emits)
    - [8.1. Child components](#81-child-components)
    - [8.2. Slots](#82-slots)
    - [8.3. Props](#83-props)
    - [8.4. Emits](#84-emits)
    - [8.5. Dynamic components](#85-dynamic-components)
    - [8.6. Provide / Inject](#86-provide--inject)
  - [9. Composables](#9-composables)
    - [9.1. What is `composable`?](#91-what-is-composable)
    - [9.2. Create a `composable`](#92-create-a-composable)
    - [9.3. Use `composable`](#93-use-composable)
    - [9.4. Add composables from `VueUse`](#94-add-composables-from-vueuse)
  - [10. State management with `Pinia`](#10-state-management-with-pinia)
    - [10.1. What is state management?](#101-what-is-state-management)
    - [10.2. Composable state vs Vuex vs Pinia](#102-composable-state-vs-vuex-vs-pinia)
    - [10.3. State](#103-state)
    - [10.4. Actions](#104-actions)
    - [10.5. Getters](#105-getters)
  - [Noteballs: setup \& routers](#noteballs-setup--routers)
    - [Setup project](#setup-project)
    - [Setup routers](#setup-routers)
  - [Noteballs: bulma \& design](#noteballs-bulma--design)
    - [Install Bulma](#install-bulma)

## 1. Introduction

### 1.1. What is the `composition API`

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

### 1.2. Setup simple `vue` app

- `node`: `version 16 LTS`
- `npm install vue@latest`

## 2. Option API vs Composition API - Switching over

### 2.1. Setup Option API

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

### 2.2. Switch to Composition API

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

## 3. Refs, Reactive Objects & Non-reactive data

There are 3 main types of data that we can use in a composition API app

- `ref`
- `reactive` object
- `non-reactive` data

### 3.1. Two ways data binding

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

### 3.2. Reactive objects

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

### 3.3. Non-reactive data

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

## 4. Methods, Computed & Watch

### 4.1. Methods

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

### 4.2. Computed Properties

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

### 4.3. A note of filters

In `vue 2`, we have `filters` property. But it's removed in `vue 3`

### 4.4. Watch

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

### 4.5. Lifecycle hooks

### 4.6. Mounted Hooks

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

### 4.7. Activated Hooks

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

### 4.8. Updated Hooks

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

### 4.9. Multiple Hooks

```vue
<script setup>
onMounted(() => {});
onMounted(() => {});
</script>
```

## 5. Directive

Vue is full of directives out of the box such as `v-model`, `v-show`, ... We
can create our own custom directives to add functionality to elements so that
we can do something to an element once it's been created or mounted.

### 5.1. Local custom directives

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

### 5.2. Global custom directives

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

## 6. Vue Routers

### 6.1. `$route`

When using `option API`, we could use the `$route` object to access things
like the current route path or route parameters. We can still use this `$route`
in `composition API`

### 6.2. Setup some `post` routes

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

### 6.3. Using `$route`

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

### 6.4. Using `useRoute` composable

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

## 7. Other features

### 7.1. Lists

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

### 7.2. Template Refs

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

### 7.3. `nextTick`

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

### 7.4. Teleport

Teleporting allow us to move an element from its default place in the DOM
to somewhere else in the DOM (outside of the `div` with id of `app`)

This is really handy for things like `modals`

Define new routes in `@/router`

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
    {
      path: "/modals",
      name: "modals",
      component: () => import("../views/ModalView.vue"),
    },
  ],
});
```

Simple template

```vue
<template>
  <div class="modals">
    <h1>Modal</h1>
    <button @click="showModal = true">Show Modal</button>

    <div v-if="showModal" class="modal">
      <h1>This is a modal</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem earum
        voluptatibus modi odit voluptatem eos quas aliquam a, perferendis ipsum
        odio amet ipsa temporibus veritatis, rem necessitatibus neque corrupti
        aspernatur!
      </p>
      <button @click="showModal = false">Hide modal</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

/**
 * Modals
 */
const showModal = ref(false);
</script>

<style>
.modal {
  background: beige;
  padding: 10px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
```

Using `Teleport` to make the `Modal` the child of the `body` element

```vue
<template>
  <div class="modals">
    <h1>Modal</h1>
    <button @click="showModal = true">Show Modal</button>

    <Teleport to="body">
      <div v-if="showModal" class="modal">
        <h1>This is a modal</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem earum
          voluptatibus modi odit voluptatem eos quas aliquam a, perferendis
          ipsum odio amet ipsa temporibus veritatis, rem necessitatibus neque
          corrupti aspernatur!
        </p>
        <button @click="showModal = false">Hide modal</button>
      </div>
    </Teleport>
  </div>
</template>
```

## 8. Child Components, props, emits

### 8.1. Child components

Create new `Modal` component at `@/components/Modal`

```vue
<template>
  <Teleport to="body">
    <div class="modal">
      <h1>This is a modal</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem earum
        voluptatibus modi odit voluptatem eos quas aliquam a, perferendis ipsum
        odio amet ipsa temporibus veritatis, rem necessitatibus neque corrupti
        aspernatur!
      </p>
      <button>Hide modal</button>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  background: beige;
  padding: 10px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
```

Import `Modal` component to `ModalView` using `option API`

```vue
<script>
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Modal,
  },
};
</script>
```

Using `composition API`, we just need to import the component

```vue
<template>
  <div class="modals">
    <h1>Modal</h1>
    <button @click="showModal = true">Show Modal</button>

    <Modal v-if="showModal"></Modal>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import Modal from "@/components/Modal.vue";

/**
 * Modals
 */
const showModal = ref(false);
</script>
```

### 8.2. Slots

For the most parts, `slots` work exactly the same way in the `composition API`

```vue
<!-- @/components/Modal.vue -->

<template>
  <Teleport to="body">
    <div class="modal">
      <slot name="title" />
      <slot />
      <button>Hide modal</button>

      <!-- <pre>{{ $slots.title() }}</pre> -->
    </div>
  </Teleport>
</template>

<script setup>
import { useSlots } from "vue";

const slots = useSlots();
// this.$slots.title();
slots.title();
</script>
```

```vue
<!-- @/views/ModalView -->

<template>
  <div class="modals">
    <h1>Modal</h1>
    <button @click="showModal = true">Show Modal</button>

    <Modal v-if="showModal">
      <template #title>
        <h1>This is a modal</h1>
      </template>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem earum
        voluptatibus modi odit voluptatem eos quas aliquam a, perferendis ipsum
        odio amet ipsa temporibus veritatis, rem necessitatibus neque corrupti
        aspernatur!
      </p>
    </Modal>
  </div>
</template>
```

### 8.3. Props

The way that we pass props down from a parent component to a child component
is exactly the same as before.

Using `option API` to receive `props`

```vue
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
```

Using `composition API`

```vue
<!-- @/components/Modal.vue -->

<template>
  <Teleport to="body">
    <div class="modal">
      <h1>{{ title }}</h1>
      <slot />
      <button>Hide modal</button>
    </div>
  </Teleport>
</template>

<script setup>
/**
 * Props
 */
// const props = defineProps(["title"]);
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

console.log(props.title);
</script>
```

### 8.4. Emits

Emitting a custom event.

Using `option API`

```vue
<script>
export default {
  emits: ["hideModal"],
};
</script>
```

Using `composition API`

```vue
<template>
  <Teleport to="body">
    <div class="modal">
      <h1>{{ title }}</h1>
      <slot />
      <button @click="$emit('hideModal')">Hide modal</button>
    </div>
  </Teleport>
</template>

<script setup>
/**
 * Props
 */
// const props = defineProps(["title"]);
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

/**
 * Emits
 */
const emit = defineEmits(["hideModal"]);
</script>
```

Emit events programmatically

```vue
<template>
  <Teleport to="body">
    <div class="modal">
      <h1>{{ title }}</h1>
      <slot />
      <button @click="handleButtonClick">Hide modal</button>
    </div>
  </Teleport>
</template>

<script setup>
/**
 * Props
 */
// const props = defineProps(["title"]);
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

/**
 * Emits
 */
const emit = defineEmits(["hideModal"]);

/**
 * handle button click
 */
const handleButtonClick = () => {
  // this.$emit('hideModal')

  emit("hideModal");
};
</script>
```

### 8.5. Dynamic components

Dynamic components allow us to switch out the component that is
being used in a particular parts of our app.

```vue
<template>
  <component :is="Modal">
    <p>Slots</p>
  </component>
</template>

<script setup>
import Modal from "@/components/Modal.vue";
</script>
```

### 8.6. Provide / Inject

We save how to pass data from a parent component to its direct child
component using props.

But what if we want to pass data down to a really deeply nested
child component?

Well, using props, we would need to pass the data from parent to
child to child to child and so on until we reach the desired child component.
And this can be a messy way to pass data around.

We can get around this by using `Provide / Inject`

```vue
<!-- @/App.vue -->

<template>
  <div class="user-data">{{ userData.name }} @{{ userData.username }}</div>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/posts">Posts</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/modals">Modals</RouterLink>
  </nav>

  <RouterView />
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { provide } from "@vue/runtime-core";

/**
 * user data will be available to all App child components
 * through inject()
 */
const userData = reactive({
  name: "Hieu",
  username: "tronghieu",
});

provide("userData", userData);
</script>
```

```vue
<!-- @/components/Modal.vue -->

<template>
  <Teleport to="body">
    <div class="modal">
      <h1>{{ title }}</h1>
      <slot />
      <button @click="handleButtonClick">Hide modal</button>

      <div>Username is: {{ userData.username }}</div>
    </div>
  </Teleport>
</template>

<script setup>
import { inject } from "@vue/runtime-core";

/**
 * user data
 */
const userData = inject("userData");
</script>
```

## 9. Composables

### 9.1. What is `composable`?

You can think of `composable` as `composition API` equivalent of `mixin`
from the `optioin API`.

They allow us to extract out `reactive` data and methods and keep them
seperate from any particular component so that we can easily reuse those
reactive data and methods accross multiple components without having to
duplicate code.

A `composable` is just a function. We can paste all of our `reactive` data,
methods, watchers, computed properties,... into this function. And then return
the stuff from this composable that we want to make avaiable.

Like `custom hooks` in `React`.

Learn more at [Vue School](https://vueschool.io/articles/vuejs-tutorials/what-is-a-vue-js-composable/)

### 9.2. Create a `composable`

Let's say we want to use our `counter` data and the related `methods` on
multiple components. We could do this using a `composable`

Create a new folder at `@/use` to store all of our composables

```js
import { computed, onMounted, onUnmounted, reactive, watch } from "vue";

export function useCounter() {
  const counterData = reactive({
    count: 0,
    title: "My Counter",
  });

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
```

### 9.3. Use `composable`

```vue
<script setup>
import { vAutofocus } from "@/directives/vAutofocus";
import { useCounter } from "@/use/useCounter";

const { counterData, decreaseCounter, increaseCounter, oddOrEven } =
  useCounter();
</script>
```

If we click to a new page, a counter value will be reset to 0.

That's because a new instance of `useCounter` method will be created
every time we change page. If we want our `counter` to be a global `counter`
that won't reset when we change pages and we can just move the `reactive`
object outside of the `useCounter` function

```js
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
```

### 9.4. Add composables from `VueUse`

```sh
npm i @vueuse/core
```

```vue
<script setup>
import { useOnline } from "@vueuse/core";

// networking statuses
const online = useOnline();
</script>
```

## 10. State management with `Pinia`

### 10.1. What is state management?

State management allows us to store all of our data and related methods to
one single centralized place which is outside of our components. But in the
way that all of our components can access all of the data and methods.

The place where we store these data and methods is called a `store`.

In `pinia` store, we have 3 main sections

- State: where we store all of our data properties
- Actions: where we store methods which can access the data and also modifying it
- Getters: where we place methods which can grab something from the state
  and then possibly modify it in some way and then return it.

A `store` is available everywhere within our app.

### 10.2. Composable state vs Vuex vs Pinia

There are 3 main ways that we can integrate state management

- Using Composable
- Using Vuex
- Using Pinia

Using composable [Youtube](https://www.youtube.com/watch?v=_k4GM5cmm68)

For a long time, Vuex has been the gold standard for state management of
Vue App. However, nowadays pinia is prefer.

### 10.3. State

We're currently using `useCounter` to manage all of the functionality of
the counter app.

Let's instead use `pinia` to setup state management for this counter app.

```js
// @/stores/counter.js

import { ref } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const counterTitle = "My Counter Title";

  return { count, counterTitle };
});
```

```vue
<!-- @/views/HomeView.vue -->

<template>
  <div class="home">
    <h2>My Amazing Counter</h2>

    <h3>{{ counter.counterTitle }}:</h3>

    <div>
      <button class="btn">-</button>
      <span class="counter">{{ count }}</span>
      <button class="btn">+</button>
    </div>

    <p>This counter is</p>

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
const { count } = counter;
</script>
```

### 10.4. Actions

Actions are basically just methods which can access the properties in our
state and modify them.

```js
// @/stores/counter

import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const counterTitle = "My Counter Title";

  function increaseCounter() {
    count.value++;
  }

  function decreaseCounter() {
    count.value--;
  }

  return {
    count,
    counterTitle,
    increaseCounter,
    decreaseCounter,
  };
});
```

```vue
@/views/HomeView.vue

<template>
  <div class="home">
    <h2>My Amazing Counter</h2>

    <h3>{{ counter.counterTitle }}:</h3>

    <div>
      <button @click="counter.decreaseCounter()" class="btn">-</button>
      <span class="counter">{{ counter.count }}</span>
      <button @click="counter.increaseCounter()" class="btn">+</button>
    </div>

    <p>This counter is</p>

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
```

### 10.5. Getters

Getters allow us to get value from our state and then modify it in
some way or generate something based on that value and then return
it, making it available to any component which is using this `store`.

```js
// @/stores/counters.js

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
```

```vue
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
```

## Noteballs: setup & routers

### Setup project

```sh
npm init vue@latest
```

Answer `no` to all questions

### Setup routers

Install `vue-router@4`: `npm install vue-router@4`

Setup router in `main.js`

```js
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [],
});

createApp(App).use(router).mount("#app");
```

Define some routes

```js
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "notes",
      component: import("@/views/NotesView.vue"),
    },
    {
      path: "/stats",
      name: "stats",
      component: import("@/views/StatsView.vue"),
    },
  ],
});

createApp(App).use(router).mount("#app");
```

Add `<router-view>` to show corresponding view based on url. The `<router-view>`
component will determine where our routes will be displayed.

```vue
<!-- @/App.vue -->

<template>
  <router-link to="/">Notes</router-link>
  <router-link to="/stats">Stats</router-link>

  <router-view></router-view>
</template>
```

Tidying up:

- Extract all of our router setup code into its own file.

```js
// @/routes/index.js

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "notes",
    component: () => import("@/views/NotesView.vue"),
  },
  {
    path: "/stats",
    name: "stats",
    component: () => import("@/views/StatsView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
```

- Import `router` in `main.js`

```js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";

createApp(App).use(router).mount("#app");
```

## Noteballs: bulma & design

### Install Bulma

```sh
npm install bulma
```

Import bulma

```vue
<template>
  <router-link to="/" class="button">Notes</router-link>
  <router-link to="/stats" class="button">Stats</router-link>

  <router-view></router-view>
</template>

<style>
@import "bulma/css/bulma.min.css";
</style>
```
