// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import './exa/store';
// import './exa/Vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from './lib/vuex';
import App from './App.vue';
import Home from './views/index';
Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    name: 'sun',
  },
  modules: {
    sub: {
      state: {
        age: 10,
      },
      mutations: {
        getAge(state) {
          console.log(state);
        },
      },
    }
  },
  mutations: {
    setName(state, name) {
      state.name = name;
    },
  },
});

// store.commit('getAge');


const router = new VueRouter({
  routes: [
    {
      name: 'index',
      path: '/main',
      component: Home,
    }
  ],
});

new Vue({
  el: '#app',
  components: {
    App,
  },
  store,
  router,
  template: '<App />',
});



