<template>
  <div id="app">
    <img src="./assets/logo.png"/>
    <p>{{ getAged }}</p>
    <p>{{ getName }}</p>
    <button @click="changeAgeHandle">change age</button>
    <ul>
      <li v-for="item in items">{{item}}</li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
   data() {
    return {
      age: {
        val: 10,
      },
      items: [1, 2],
    };
  },
  computed: {
    getName() {
      return this.$store.state.name;
    },
    getAged() {
      return this.age.val;
    },
  },
  watch: {
    'getAged': (val, oldVal) => {
      console.log(val, oldVal);
    },
    arr(val, oldVal) {
      console.log('arr', val, oldVal);
    },
  },
  methods: {
    changeAgeHandle() {
      // this.age.val = 20;
      this.items.splice(0, 1, 20);
    },
  },
  created() {
    axios.interceptors.response.use((response) => {
      console.log('response', response);
    }, (error) => {
      console.log('error', error);
    });
    axios.get('http://127.0.0.1:7001').then(() => console.log('end'));
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
