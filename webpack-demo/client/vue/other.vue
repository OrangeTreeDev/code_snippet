<template>
  <div class="example">
    {{ msg }}
    <div>{{ now }}</div>
  </div>
</template>

<script>
import { now } from '../js/util';

export default {
  data() {
    return {
      msg: 'Hello async component!',
      now: now(),
    };
  },
};
</script>

<style lang="less" scoped>
.example {
  color: blue;
}
</style>
