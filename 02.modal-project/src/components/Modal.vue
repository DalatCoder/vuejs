<template>
    <div class="backdrop" @click.self="closeModal">
        <div class="modal" :class="{ sale: theme === 'sale' }">
            <slot></slot>

            <div class="actions">
                <slot name="links"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'theme' ],
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
.modal .actions {
    text-align: center;
    margin: 30px 0 10px 0;
}
.modal .actions a {
    color: #333;
    padding: 8px;
    border: 1px solid #eee;
    border-radius: 4px;
    text-decoration: none;
    margin: 10px;
}
</style>
