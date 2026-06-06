<template>
  <section class="egg select-none" aria-hidden="true">
    <img src="/art-egg.png" alt="" class="egg-img" />
  </section>
</template>

<style scoped>
.egg {
  position: relative;
  width: 100%;
  height: clamp(360px, 52vh, 600px);
  overflow: hidden;
  background: #c9b48f;
}

.egg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 80%;
}
</style>
