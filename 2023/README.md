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
  - [11. Noteballs: setup \& routers](#11-noteballs-setup--routers)
    - [11.1. Setup project](#111-setup-project)
    - [11.2. Setup routers](#112-setup-routers)
  - [12. Noteballs: bulma \& design](#12-noteballs-bulma--design)
    - [12.1. Install Bulma](#121-install-bulma)
  - [13. Noteballs: Data, Methods, Components, Computed \& Emit](#13-noteballs-data-methods-components-computed--emit)
    - [13.1. Add new note](#131-add-new-note)
    - [13.2. Note component](#132-note-component)
  - [14. Noteballs: State management](#14-noteballs-state-management)
    - [14.1. Install \& Setup `pinia`](#141-install--setup-pinia)
    - [14.2. Edit note](#142-edit-note)
    - [14.3. Fix the `focus`](#143-fix-the-focus)
    - [14.4. Add more `props`](#144-add-more-props)
    - [14.5. Get post content](#145-get-post-content)
    - [14.6. Save note](#146-save-note)
    - [14.7. Build stats page](#147-build-stats-page)
  - [15. Noteballs: Directives, watchers \& composables](#15-noteballs-directives-watchers--composables)
    - [15.1. `v-autoFocus`](#151-v-autofocus)
    - [15.2. Watchers](#152-watchers)
    - [15.3. Composables](#153-composables)
    - [15.4. Click outside composable](#154-click-outside-composable)
  - [16. Noteballs: Delete Modal](#16-noteballs-delete-modal)
    - [16.1. Setup](#161-setup)
    - [16.2. Emit events](#162-emit-events)
    - [16.3. Click outside modal](#163-click-outside-modal)
    - [16.4. Keyboard control (lifecycle hooks)](#164-keyboard-control-lifecycle-hooks)
  - [Firebase 9](#firebase-9)
    - [Introduction to Firebase](#introduction-to-firebase)
    - [Create a firebase project](#create-a-firebase-project)
    - [Create app \& install firebase](#create-app--install-firebase)
    - [Setup Firestore Database](#setup-firestore-database)
    - [Connect to DB](#connect-to-db)
  - [Firebase CRUD](#firebase-crud)
    - [Get Notes from Firestore](#get-notes-from-firestore)
    - [Get Notes in Realtime](#get-notes-in-realtime)
    - [Add new note](#add-new-note)
    - [Delete note](#delete-note)
    - [Update note](#update-note)
    - [Order notes by date](#order-notes-by-date)
    - [Display Date on Note](#display-date-on-note)
    - [Add a progress bar](#add-a-progress-bar)

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

## 11. Noteballs: setup & routers

### 11.1. Setup project

```sh
npm init vue@latest
```

Answer `no` to all questions

### 11.2. Setup routers

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

## 12. Noteballs: bulma & design

### 12.1. Install Bulma

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

## 13. Noteballs: Data, Methods, Components, Computed & Emit

### 13.1. Add new note

- 2 ways binding via `v-model`
- event handler
- reactive data
- using template ref to focus automatically

```vue
<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            v-model="newNote"
            class="textarea"
            placeholder="Add a new note"
            ref="newNoteRef"
          />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            @click="addNote"
            :disabled="!newNote"
            class="button is-link has-background-success"
          >
            Add New Note
          </button>
        </div>
      </div>
    </div>

    <div v-for="note in notes" class="card mb-4" :key="note.id">
      <div class="card-content">
        <div class="content">{{ note.content }}</div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

/**
 * Notes
 */
const newNote = ref("");
const newNoteRef = ref(null);
const notes = ref([]);

onMounted(() => {
  newNoteRef.value.focus();
});

const addNote = () => {
  const note = {
    id: new Date().getTime(),
    content: newNote.value,
  };

  notes.value.unshift(note);

  newNote.value = "";
  newNoteRef.value.focus();
};
</script>
```

### 13.2. Note component

- Define Props
- Define Emits
- Computed value
- Emit `delete` event

```vue
<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}

        <div class="has-text-right has-text-grey-light mt-2">
          <small>{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item" @click.prevent="handleDeleteClicked"
        >Delete</a
      >
    </footer>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";

/**
 * props
 */
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

/**
 * Emits
 */
const emit = defineEmits(["deleteClicked"]);

/**
 * Character length
 */
const characterLength = computed(() => {
  const length = props.note.content.length;
  if (length > 1) return `${length} characters`;
  return `${length} character`;
});

/**
 * Handle delete clicked
 */
const handleDeleteClicked = () => {
  emit("deleteClicked", props.note);
};
</script>
```

## 14. Noteballs: State management

### 14.1. Install & Setup `pinia`

```sh
npm install pinia
```

Create `pinia` store in `main.js`

```js
// @/stores/notes.js

import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref([
    {
      id: 1,
      content: "test",
    },
  ]);

  const addNote = (newNote) => {
    notes.value.unshift(newNote);
  };

  const deleteNote = (note) => {
    notes.value = notes.value.filter((n) => n.id !== note.id);
  };

  return {
    notes,
    addNote,
    deleteNote,
  };
});
```

Using `pinia` store in `NotesView` page

```vue
<!-- @/views/NotesView.vue -->

<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            v-model="newNote"
            class="textarea"
            placeholder="Add a new note"
            ref="newNoteRef"
          />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            @click="addNote"
            :disabled="!newNote"
            class="button is-link has-background-success"
          >
            Add New Note
          </button>
        </div>
      </div>
    </div>

    <Note v-for="note in notesStore.notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import Note from "@/components/Notes/Note.vue";

import { useNotesStore } from "@/stores/notes";

/**
 * Store
 */
const notesStore = useNotesStore();

/**
 * Notes
 */
const newNote = ref("");
const newNoteRef = ref(null);

onMounted(() => {
  newNoteRef.value.focus();
});

const addNote = () => {
  const note = {
    id: new Date().getTime(),
    content: newNote.value,
  };

  notesStore.addNote(note);

  newNote.value = "";
  newNoteRef.value.focus();
};
</script>
```

### 14.2. Edit note

Create `NoteForm` to reuse form

```vue
<!-- @/components/Notes/NoteForm.vue -->

<template>
  <div class="card has-background-success-dark p-4 mb-5">
    <div class="field">
      <div class="control">
        <textarea
          class="textarea"
          placeholder="Add a new note"
          ref="newNoteRef"
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>
```

Hook up textarea value with `modelValue`

```vue
<template>
  <div class="card has-background-success-dark p-4 mb-5">
    <div class="field">
      <div class="control">
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          placeholder="Add a new note"
          ref="newNoteRef"
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * props
 */
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

/**
 * emits
 */
const emit = defineEmits(["update:modelValue"]);
</script>
```

### 14.3. Fix the `focus`

Expose methods from `child component` to focus textarea element

```vue
<!-- @/components/Notes/NoteForm.vue -->

<template>
  <div class="card has-background-success-dark p-4 mb-5">
    <div class="field">
      <div class="control">
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          placeholder="Add a new note"
          ref="textareaRef"
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

/**
 * props
 */
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

/**
 * emits
 */
const emit = defineEmits(["update:modelValue"]);

/**
 * focus textarea
 */
const textareaRef = ref(null);

const focusTextarea = () => {
  textareaRef.value.focus();
};

/**
 * expose methods to parent component
 */

defineExpose({
  focusTextarea,
});
</script>
```

Invoke `exposed methods` from parent component

```vue
<!-- @/pages/NotesView.vue -->

<template>
  <div class="notes">
    <NoteForm v-model="newNote" ref="noteFormRef">
      <template #buttons>
        <button @click="addNote" class="button is-link has-background-success">
          Add New Note
        </button>
      </template>
    </NoteForm>
    <Note v-for="note in notesStore.notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

import Note from "@/components/Notes/Note.vue";
import NoteForm from "../components/Notes/NoteForm.vue";

import { useNotesStore } from "@/stores/notes";

/**
 * Store
 */
const notesStore = useNotesStore();

/**
 * Notes
 */
const newNote = ref("");
const noteFormRef = ref(null);

onMounted(() => {
  noteFormRef.value.focusTextarea();
});

const addNote = () => {
  const note = {
    id: new Date().getTime(),
    content: newNote.value,
  };

  notesStore.addNote(note);

  newNote.value = "";
  noteFormRef.value.focusTextarea();
};
</script>
```

### 14.4. Add more `props`

```vue
<!-- @/components/Notes/NoteForm.vue -->

<template>
  <div class="card p-4 mb-5" :class="`has-background-${bgColor}-dark `">
    <label v-if="label" class="label has-text-white">{{ label }}</label>

    <div class="field">
      <div class="control">
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          :placeholder="placeholder"
          ref="textareaRef"
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

/**
 * props
 */
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: "success",
  },
  placeholder: {
    type: String,
    default: "Type something...",
  },
  label: {
    type: String,
  },
});

/**
 * emits
 */
const emit = defineEmits(["update:modelValue"]);

/**
 * focus textarea
 */
const textareaRef = ref(null);

const focusTextarea = () => {
  textareaRef.value.focus();
};

/**
 * expose methods to parent component
 */

defineExpose({
  focusTextarea,
});
</script>
```

### 14.5. Get post content

```vue
<!-- @/views/EditNote.vue -->

<template>
  <div class="edit-note">
    <NoteForm
      v-model="noteContent"
      ref="noteFormRef"
      bgColor="link"
      placeholder="Edit note"
      label="Edit Note"
    >
      <template #buttons>
        <button @click="$router.back()" class="button is-link is-light">
          Cancel
        </button>

        <button
          class="button is-link has-background-link"
          :disabled="!noteContent"
        >
          Save Note
        </button>
      </template>
    </NoteForm>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { useNotesStore } from "@/stores/notes";

import NoteForm from "@/components/Notes/NoteForm.vue";

/**
 * Routes
 */
const route = useRoute();

/**
 * Store
 */
const notesStore = useNotesStore();

const noteContent = ref("");
noteContent.value = notesStore.getNoteById(+route.params.id)?.content || "";
</script>
```

### 14.6. Save note

```vue
<script setup>
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { useNotesStore } from "@/stores/notes";

import NoteForm from "@/components/Notes/NoteForm.vue";

/**
 * Routes
 */
const route = useRoute();
const router = useRouter();

/**
 * Store
 */
const notesStore = useNotesStore();

const noteContent = ref("");
noteContent.value = notesStore.getNoteById(+route.params.id)?.content || "";

/**
 * Save clicked
 */
const handleSaveClicked = () => {
  notesStore.updateNote(+route.params.id, noteContent.value);
  router.push({
    name: "notes",
  });
};
</script>
```

### 14.7. Build stats page

```vue
<!-- @/views/StatsView.vue -->

<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ notesStore.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of Character (of all notes)</td>
          <td>{{ notesStore.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useNotesStore } from "@/stores/notes";

const notesStore = useNotesStore();
</script>
```

## 15. Noteballs: Directives, watchers & composables

### 15.1. `v-autoFocus`

Define customm directive

```js
/**
 * directives
 */
const vAutofocus = {
  mounted: (element) => {
    element.focus();
  },
};
```

Using custom directive

```vue
<template>
  <div class="card p-4 mb-5" :class="`has-background-${bgColor}-dark `">
    <label v-if="label" class="label has-text-white">{{ label }}</label>

    <div class="field">
      <div class="control">
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          :placeholder="placeholder"
          ref="textareaRef"
          v-autofocus
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>
```

### 15.2. Watchers

Watch the number of new notes and show alert if it's larger than 100 characters

```vue
<script setup>
/**
 * Watch
 */
watch(newNote, (newValue, _oldValue) => {
  if (newValue.length >= 100) {
    alert("Only 100 characters allowed");
  }
});
</script>
```

### 15.3. Composables

Watch note length on both `ViewNotes` and `EditNote` pages, so instead of
duplicating code. We can use `composable` to reuse logic.

```js
import { watch } from "vue";

export const useWatchCharacters = (valueToWatch) => {
  watch(valueToWatch, (newValue, _oldValue) => {
    if (newValue.length >= 100) {
      alert("Only 100 characters allowed");
    }
  });
};
```

Using `composable`

```vue
<!-- @/views/NotesView.vue -->

<script setup>
import { ref } from "@vue/reactivity";

import Note from "@/components/Notes/Note.vue";
import NoteForm from "@/components/Notes/NoteForm.vue";

import { useNotesStore } from "@/stores/notes";
import { useWatchCharacters } from "@/use/useWatchCharacters";

/**
 * Store
 */
const notesStore = useNotesStore();

/**
 * Notes
 */
const newNote = ref("");
const noteFormRef = ref(null);

const addNote = () => {
  const note = {
    id: new Date().getTime(),
    content: newNote.value,
  };

  notesStore.addNote(note);

  newNote.value = "";
  noteFormRef.value.focusTextarea();
};

/**
 * Watch
 */
useWatchCharacters(newNote);
</script>
```

### 15.4. Click outside composable

Install `vueuse` package: `npm install @vueuse/core`

## 16. Noteballs: Delete Modal

### 16.1. Setup

```vue
<!-- @/components/Notes/DeleteModal.vue -->

<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button">Cancel</button>
        <button class="button is-danger">Delete</button>
      </footer>
    </div>
  </div>
</template>
```

```vue
<!-- @/components/Notes/Note.vue -->

<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}

        <div class="has-text-right has-text-grey-light mt-2">
          <small>{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <router-link :to="`/edit/${note.id}`" class="card-footer-item">
        Edit
      </router-link>
      <a href="#" class="card-footer-item" @click.prevent="handleDeleteClicked"
        >Delete</a
      >
    </footer>

    <DeleteModal v-if="modals.deleteNote" />
  </div>
</template>

<script setup>
import { computed, reactive } from "@vue/runtime-core";
import { useNotesStore } from "@/stores/notes";
import DeleteModal from "./DeleteModal.vue";

/**
 * store
 */
const notesStore = useNotesStore();

/**
 * props
 */
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

/**
 * Character length
 */
const characterLength = computed(() => {
  const length = props.note.content.length;
  if (length > 1) return `${length} characters`;
  return `${length} character`;
});

/**
 * Handle delete clicked
 */
const handleDeleteClicked = () => {
  modals.deleteNote = true;
};

/**
 * modals
 */
const modals = reactive({
  deleteNote: false,
  editNote: false,
});
</script>
```

### 16.2. Emit events

```vue
<!-- @/components/Notes/DeleteModal.vue -->

<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button @click="handleOnCancelClicked" class="button">Cancel</button>
        <button @click="handleOnSubmitClicked" class="button is-danger">
          Delete
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["onCancel", "onSubmit"]);

const handleOnCancelClicked = () => {
  emit("onCancel");
};

const handleOnSubmitClicked = () => {
  emit("onSubmit");
};
</script>
```

### 16.3. Click outside modal

```vue
<!-- @/components/Notes/DeleteModal.vue -->

<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button
          @click="handleOnCancelClicked"
          class="delete"
          aria-label="close"
        ></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button @click="handleOnCancelClicked" class="button">Cancel</button>
        <button @click="handleOnSubmitClicked" class="button is-danger">
          Delete
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onClickOutside } from "@vueuse/core";

/**
 * events
 */
const emit = defineEmits(["onCancel", "onSubmit"]);

const handleOnCancelClicked = () => {
  emit("onCancel");
};

const handleOnSubmitClicked = () => {
  emit("onSubmit");
};

/**
 * click outside
 */
const modalCardRef = ref(null);
onClickOutside(modalCardRef, handleOnCancelClicked);
</script>
```

### 16.4. Keyboard control (lifecycle hooks)

```vue
<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { onClickOutside } from "@vueuse/core";

/**
 * events
 */
const emit = defineEmits(["onCancel", "onSubmit"]);

const handleOnCancelClicked = () => {
  emit("onCancel");
};

const handleOnSubmitClicked = () => {
  emit("onSubmit");
};

/**
 * click outside
 */
const modalCardRef = ref(null);
onClickOutside(modalCardRef, handleOnCancelClicked);

/**
 * keyboard control
 */
const handleKeyboard = (event) => {
  if (event.key === "Escape") {
    handleOnCancelClicked();
  }
};

onMounted(() => {
  document.addEventListener("keyup", handleKeyboard);
});

onUnmounted(() => {
  document.removeEventListener("keyup", handleKeyboard);
});
</script>
```

## Firebase 9

### Introduction to Firebase

Firebase is an all in one backend solution from Google. It makes it
really easy for us to add an out of the box backend to our app without
any complicated setup.

It gives us a realtime database and there are two databases available:

- The cloud store database
- The realtime database

### Create a firebase project

- Go to firebase
- Get started
- Create new project
- Set project name
- Disable Google analytics
- Wait a couple of minutes

### Create app & install firebase

Create an app

- Create a webapp
- Set app name

Add firebase SDK

- `npm install firebase`

```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

### Setup Firestore Database

Setup

- Click Firestore Database
- Create database
- Choose Start in test mode
- Choose location

Cloud firestore database organized into `collections`, and each collection
contains `documents`

- Create new `collection` called `notes`
- Add some `documents`

### Connect to DB

[Read docs](https://firebase.google.com/docs/firestore?authuser=0&hl=en)

```js
// @/js/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTFYx5Nydmjxed0hZNfslkXk76rlhJYfs",
  authDomain: "noteball-39431.firebaseapp.com",
  projectId: "noteball-39431",
  storageBucket: "noteball-39431.appspot.com",
  messagingSenderId: "959947377005",
  appId: "1:959947377005:web:734934078fd7a67329f264",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
```

Setup `db` in `store`

```js
// @/stores/notes.js

import { db } from "@/js/firebase";
```

## Firebase CRUD

### Get Notes from Firestore

Set up `vite.config.js`

[Issue](https://github.com/firebase/firebase-js-sdk/issues/6926)

```js
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: [
      "firebase",
      "firebase/app",
      "firebase/auth",
      "firebase/firestore",
      "firebase/analytics",
    ],
  },
});
```

Query all documents from a collection at a specific time

```js
// @/stores/notes.js

import { defineStore } from "pinia";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/js/firebase";

export const useNotesStore = defineStore("notes", () => {
  const getNotes = async () => {
    const querySnapshot = await getDocs(collection(db, "notes"));

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        content: doc.data().content,
      });
    });

    notes.value = data;
  };

  return {
    getNotes,
  };
});
```

Invoke `getNotes` function on `onMounted` hook

```vue
<!-- @/App.vue -->

<script setup>
import Navbar from "@/components/Layout/Navbar.vue";
import { useNotesStore } from "@/stores/notes";
import { onMounted } from "@vue/runtime-core";

/**
 * store
 */
const notesStore = useNotesStore();

/**
 * mounted
 */
onMounted(() => {
  notesStore.getNotes();
});
</script>
```

### Get Notes in Realtime

```js
const getNotesRealtime = () => {
  const c = collection(db, "notes");

  const unsubscribe = onSnapshot(c, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        content: doc.data().content,
      });
    });

    notes.value = data;
  });

  // stop listening
  // unsubscribe()
};
```

### Add new note

```js
// auto generated id

const addNote = async (newNote) => {
  const newDoc = await addDoc(collection(db, "notes"), {
    content: newNote.content,
    createdAt: new Date(),
  });

  console.log(newDoc);
};
```

### Delete note

```js
const deleteNote = async (note) => {
  await deleteDoc(doc(collection(db, "notes"), note.id));
};
```

### Update note

```js
const updateNote = async (id, content) => {
  await updateDoc(doc(collection(db, "notes"), id), {
    content,
  });
};
```

### Order notes by date

```js
const getNotesRealtime = () => {
  const notesCollectionRef = collection(db, "notes");
  const q = query(notesCollectionRef, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        content: doc.data().content,
      });
    });

    notes.value = data;
  });

  // stop listening
  // unsubscribe()
};
```

### Display Date on Note

Using `useDateFormat` composable from `@vueuse/core`

```js
const dateFormatted = computed(() => {
  // pass timestamp to create new Date object
  const date = new Date(+props.note.createdAt);

  return useDateFormat(date, "DD-MM-YYYY HH:mm:ss").value;
});
```

### Add a progress bar

```vue
<template>
  <progress
    v-if="!notesStore.notesLoaded"
    class="progress is-large is-success"
    max="100"
  />
  <template v-else>
    <Note v-for="note in notesStore.notes" :key="note.id" :note="note" />
  </template>
</template>
```
