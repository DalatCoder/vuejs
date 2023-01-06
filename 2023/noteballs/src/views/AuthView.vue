<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }">
          <a @click.prevent="register = false">Login</a>
        </li>
        <li :class="{ 'is-active': register }">
          <a @click.prevent="register = true">Register</a>
        </li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ formTitle }}</div>
        <div class="content">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum non
          pariatur ipsum repellendus nam, modi, omnis neque consequuntur
          laudantium labore doloribus libero sed, voluptas perferendis explicabo
          at nisi distinctio temporibus.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

/**
 * register / login
 */
const register = ref(false);

/**
 * form title
 */
const formTitle = computed(() => {
  if (register.value) return "Register";
  return "Login";
});
</script>

<style>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
