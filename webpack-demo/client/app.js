import Vue from 'vue';
import Hello from './vue/hello.vue';

new Vue({
  el: '#app',
  components: { Hello },
  template: '<Hello></Hello>',
  created() {
    console.log('vue created');
  }
});