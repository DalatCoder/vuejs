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
import NoteForm from "@/components/Notes/NoteForm.vue";
import { ref } from "@vue/reactivity";

const noteContent = ref("");
</script>
