<template>
  <Teleport to="body">
    <div class="modal">
      <h1>This is a modal</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem earum
        voluptatibus modi odit voluptatem eos quas aliquam a, perferendis ipsum
        odio amet ipsa temporibus veritatis, rem necessitatibus neque corrupti
        aspernatur!
      </p>
      <button>Hide modal</button>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  background: beige;
  padding: 10px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
