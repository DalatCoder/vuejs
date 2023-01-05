<template>
  <div class="posts-detail">
    <h1>This is a post detail page</h1>
    <p>Display the content of post with ID of {{ $route.params.id }}</p>

    <div>
      <button @click="showPostId">Show Post ID</button>
    </div>

    <div>
      <button @click="goHome">Go Home</button>
    </div>

    <p>
      <router-link to="/posts">&lt; Back</router-link>
    </p>
  </div>
</template>

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
