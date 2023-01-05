<template>
  <div class="posts">
    <h1 ref="titleRef">Posts</h1>

    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const postData = [1, 2, 3, 4, 5, 6, 7].map((id) => ({
  id,
  title: `Post ${id}`,
}));
const posts = ref(postData);

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

<style scoped>
ul {
  margin-bottom: 30px;
  list-style: none;
}
</style>
