<template>
    <div class="backdrop" @click="closeModal">
        <div class="modal" :class="{ sale: theme === 'sale' }">
            <h1>{{ header }}</h1>
            <p>{{ text }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'header',
        'text',
        'theme'
    ],
    methods: {
        closeModal() {
            this.$emit('closeModal')
        }
    }
}
</script>

<style>
.modal {
    width: 500px;
    padding: 20px;
    margin: 100px auto;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 10px -3px rgba(0, 0, 0, 0.3);
}

.backdrop {
    top: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
}

.modal.sale {
    background: crimson;
    color: white;
}
.modal.sale h1 {
    color: white;
}
</style>
