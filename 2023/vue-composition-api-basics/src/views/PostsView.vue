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
