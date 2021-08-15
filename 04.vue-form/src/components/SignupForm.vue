<template>
  <form>
    <label for="email">Email</label>
    <input
      type="email"
      placeholder="Enter your email"
      required
      v-model="email"
    />

    <label for="password">Password</label>
    <input
      type="password"
      placeholder="Enter your password"
      required
      v-model="password"
    />

    <label for="role">Role</label>
    <select id="role" v-model="role">
      <option value="">Choose your role</option>
      <option value="developer">Web Developer</option>
      <option value="designer">Web Designer</option>
    </select>
  </form>

  <p>Email: {{ email }}</p>
  <p>Password: {{ password }}</p>
  <p>Role: {{ role }}</p>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      role: '',
    }
  },
}
</script>

<style>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 10px -3px rgba(0, 0, 0, 0.3);
}

label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}

input:focus,
input:active,
select:active,
select:focus {
  outline: 1px solid #ccc;
  border-bottom-color: transparent;
}
</style>
