<template>
<div id="app">
  <div class="hello">
    {{ echo }}
  </div>
</div>
</template>

<script>
export default {
  name: 'Hello',
  data() {
    return {
      echo: 'Hello Vue',
    };
  },  
};
</script>

<style lang="css">
.hello {
  color: blue;
}
</style>
