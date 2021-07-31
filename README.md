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
<script src="https://unpkg.com/vue@3.0.2"></script>
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
