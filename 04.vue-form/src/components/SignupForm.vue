<template>
  <form @submit.prevent="handleSubmit">
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
    <div v-if="passwordError" class="error">{{ passwordError }}</div>

    <label for="role">Role</label>
    <select id="role" v-model="role">
      <option value="">Choose your role</option>
      <option value="developer">Web Developer</option>
      <option value="designer">Web Designer</option>
    </select>

    <label for="skills">Skills</label>
    <input type="text" v-model="tempSkill" @keyup="addSkill" />
    <div v-for="skill in skills" :key="skill" class="pill">
      <span @click="deleteSkill(skill)">{{ skill }}</span>
    </div>

    <div class="terms">
      <input id="terms" type="checkbox" required v-model="terms" />
      <label for="terms">Accept terms and conditions</label>
    </div>

    <div class="submit">
      <button>Create An Account</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      role: '',
      terms: false,
      tempSkill: '',
      skills: [],
      passwordError: '',
    }
  },
  methods: {
    addSkill(e) {
      if (e.key !== ',') return
      if (!this.tempSkill) return

      this.tempSkill = this.tempSkill.replace(',', '')
      if (this.skills.includes(this.tempSkill)) {
        this.tempSkill = ''
        return
      }

      this.skills.push(this.tempSkill)
      this.tempSkill = ''
    },
    deleteSkill(skill) {
      this.skills = this.skills.filter((s) => s !== skill)
    },
    handleSubmit() {
      // Validate password
      this.passwordError =
        this.password.length > 5
          ? ''
          : 'Password must be at least 6 characters long'

      if (this.passwordError) return

      console.log({
        email: this.email,
        password: this.password,
        role: this.role,
        skills: this.skills,
        terms_accepted: this.terms,
      })
    },
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

input[type='checkbox'] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}

.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}

button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
}

button:active,
button:focus {
  outline: none;
}

.submit {
  text-align: center;
}

.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>
