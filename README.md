# Build Web Apps with Vue JS 3 & Firebase

## Chapter 1. Introducing and Setup

### 1.1. What is Vue?

- Frontend, Javascript/Typescript framework
- Used to create dynamic & data-driven websites (SPA's)
- Can also be used to create stand-alone widgets

### 1.2. Vue widgets

`Vue component`: Create a widget and drop it into multiple place in HTML

These widgets would be self-contained and all of the code and logic required to power that widget
would generally be inside of the view component itself.

### 1.3. Vue websites

- Vue is used to create a whole website with multiple pages & components
- These website are normally called Single Page Applications
- All routing is done in the browser & not on the server

### 1.4. Single Page Application (SPA)

- Only a single HTML page sent (initally) to the browser
- Vue intercepts subsequent requests and handles "page" changes in the browser by swapping what
  components are shown on the page
- Results in a much faster and smoother website experience

### 1.5. Vue 3 new features

#### The composition API

- Improves on reusability, organization & readability
- It does this by giving us a new `setup` function

#### Multiple root elements

- Can have many root elements side-by-side in a component

```js
<template>
  <div>First root element</div>
  <div>Second root element</div>
</template>
```

#### Teleport component

- Render content from one component in a different place in the DOM
- Useful for things like modals

#### Suspense component

- Used to handle asynchorous components easily
- Can provide fall-back content (e.g. a spinner) until data is loaded

#### Typescript support

- Can now write Vue application using Typescript

#### More changes

- Multiple `v-models` for custom components
- Improved reactivity
- Performance gains

### 1.5. Environment Setup

- VSCode

  - Live-server
  - Vetur

- [Source code](https://github.com/iamshaunjp/Vue-3-Firebase)

## Chapter 2: Vue Basics

Going to create a VueJS standalone component and inject it to static HTML page.

Install through CDN:

```html
< src="https://unpkg.com/vue@3.0.2"></script>
```

[VueJS documentation](https://v3.vuejs.org/guide/introduction.html)

Creating a Vue App

```html
<div id="app"></div>
```

```js
const app = Vue.createApp({
  template: '<h2>VueJS Template</h2>',
});

app.mount('#app');
```

Render dynamic data

```js
const app = Vue.createApp({
  data() {
    return {
      name: 'Trong Hieu',
    };
  },
});

app.mount('#app');
```

```html
<div id="app">Hello {{ name }}</div>
```

Methods and Click events

Using `v-on:[event]` directly on root template

```html
<div id="app">Hello {{ name }}</div>
<button v-on:click="name = 'Thi Ha'">Change name</button>
```

Using `@` symbol

```html
<div id="app">Hello {{ name }}</div>
<button @click="name = 'Thi Ha'">Change name</button>
```

Using a method

```html
<div id="app">Hello {{ name }}</div>
<button @click="changeName">Change name</button>
```

```js
const app = Vue.createApp({
  data() {
    return {
      name: 'Trong Hieu',
    };
  },
  methods: {
    changeName() {
      this.name = 'Thi Ha';
    },
  },
});

app.mount('#app');
```

Using a method with some given `args`

```html
<div id="app">Hello {{ name }}</div>
<button @click="changeName('Thi Ha')">Change name</button>
```

```js
const app = Vue.createApp({
  data() {
    return {
      name: 'Trong Hieu',
    };
  },
  methods: {
    changeName(name) {
      this.name = name;
    },
  },
});

app.mount('#app');
```

Conditional redering

```html
<div id="app">
  <div v-if="showName">
    <p>Hello {{ name }}</p>
  </div>

  <div>
    <button @click="toggleNameDisplay">
      <span v-if="showName">Hide Name</span>
      <span v-else>Show Name</span>
    </button>
  </div>

  <div v-show="showName">
    <p>Currently showing name</p>
  </div>
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      showName: true,
      name: 'Trong Hieu',
    };
  },
  methods: {
    toggleNameDisplay() {
      this.showName = !this.showName;
    },
  },
});

app.mount('#app');
```

- `v-if`: If `false`, then remove completely the element from the DOM. And inject them into the DOM again when `true`
- `v-show`: Using `CSS` to show and hide element. `display: block` when showing, and `display: none` when hiding

Outputing a list

```js
const app = Vue.createApp({
  data() {
    return {
      books: [
        { title: 'Book 1', author: 'Author 1' },
        { title: 'Book 2', author: 'Author 2' },
        { title: 'Book 3', author: 'Author 3' },
      ],
    };
  },
});

app.mount('#app');
```

```html
<ul>
  <li v-for="item in books">
    <h3>{{ item.title }}</h3>
    <p>{{ item.author }}</p>
  </li>
</ul>
```

Attributes binding

Bind dynamic value to HTML attribute.

```js
const app = Vue.createApp({
  data() {
    return {
      url: 'https://dalatcoder.com',
    };
  },
});

app.mount('#app');
```

```html
<div>
  <a v-bind:href="url">Binding link</a>
</div>
<!-- The same at -->
<div>
  <a :href="url">Binding link</a>
</div>
```

```js
const app = Vue.createApp({
  data() {
    return {
      books: [
        { title: 'Book 1', author: 'Author 1', img: 'assets/1.jpg' },
        { title: 'Book 2', author: 'Author 2', img: 'assets/2.jpg' },
        { title: 'Book 3', author: 'Author 3', img: 'assets/3.jpg' },
      ],
    };
  },
});

app.mount('#app');
```

```html
<ul>
  <li v-for="item in books">
    <img :src="item.img" :alt="item.title" />
    <h3>{{ item.title }}</h3>
    <p>{{ item.author }}</p>
  </li>
</ul>
```

Dynamic classes

```js
const app = Vue.createApp({
  data() {
    return {
      books: [
        { title: 'Book 1', author: 'Author 1', img: 'assets/1.jpg', isFav = true },
        { title: 'Book 2', author: 'Author 2', img: 'assets/2.jpg', isFav = false },
        { title: 'Book 3', author: 'Author 3', img: 'assets/3.jpg', isFav = true },
      ],
    };
  },
});

app.mount('#app');
```

Class `fav` will be applied if `book.isFav` is `true`

```html
<ul>
  <li v-for="item in books" :class="{ fav: book.isFav }">
    <img :src="item.img" :alt="item.title" />
    <h3>{{ item.title }}</h3>
    <p>{{ item.author }}</p>
  </li>
</ul>
```
