<template>
  <div class="example">
    <p>{{ msg }}</p>
    <Other></Other>
  </div>
</template>

<script>
export default {
  components: {
    Other: () => import('./other.vue'),
  },
  data() {
    return {
      msg: 'Hello world!',
    };
  },
};
</script>

<style lang="less" scoped>
.example {
  background: linear-gradient(to bottom, white, black);
  color: red;
}
</style>
