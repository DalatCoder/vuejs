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

<style scoped>
ul {
  margin-bottom: 30px;
  list-style: none;
}
</style>
