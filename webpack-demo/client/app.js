import Vue from 'vue';
import Hello from './vue/hello.vue';
import './css/index.css';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  comments: {
    Hello,
  },
  render(h) {
    return h(Hello);
  },
});
