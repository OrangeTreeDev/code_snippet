<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello async component!',
    };
  },
};
</script>

<style lang="less" scoped>
.example {
  color: blue;
}
</style>
