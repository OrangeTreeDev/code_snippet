import Vue from 'vue';
// import Vuex from '../lib/vuex/index';
// Vue.use(Vuex); // 向Vuex.install函数传入Vue
// const store = new Vuex.Store({
//   state: {
//     name: 'sun',
//   },
//   modules: {
//     sub: {
//       state: {
//         age: 10,
//       }
//     }
//   },
//   mutations: {
//     setName(state, name) {
//       state.name = name;
//     },
//   },
// });
// // console.log(store.state.name);
// store.commit('setName', 'lixiang');
// // console.log(store.state.name);

class Store {
  constructor(option = {}) {
    this._mutations = Object.create(null);
    this.state = option.state;

    const store = this;
    const rawMutations = option.mutations || {};
    Object.keys(rawMutations).forEach((key) => {
      store._registerMutaton(store, key, rawMutations[key]);
    });
  }

  commit (type, playload) {
    const entry = this._mutations[type];
    entry(playload);
  }

  _registerMutaton(store, type, handle) {
    this._mutations[type] = function wrappedMutation (playload) {
      handle.call(store, store.state, playload);
    }
  }
}

const store = new Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

// const commit = store.commit
store.commit('increment');
console.log(store.state.count);
