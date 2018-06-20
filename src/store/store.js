import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    syncInfo: {
      hash: 'QmWJcCR1v9HvjJ4yUQZFYYNoSbE6y9ZhHveUxcSKdm9tsV',
      path: 'data'
    }
  },
  getters: {
    hash: state => {
      return state.syncInfo.hash
    },
    path: state => {
      return state.syncInfo.path
    },
    syncInfo: state => {
      return state.syncInfo
    }
  },
  mutations: {
    setHash: (state, hash) => {
      state.syncInfo.hash = hash
    },
    setPath: (state, path) => {
      state.syncInfo.path = path
    },
    setSyncInfo: (state, syncInfo) => {
      state.syncInfo = syncInfo
    }
  },
  actions: {
    setHash: ({commit}, hash) => {
      commit('setHash', hash)
    },
    setPath: ({commit}, path) => {
      commit('setPath', path)
    },
    setSyncInfo: ({commit}, syncInfo) => {
      commit('setSyncInfo', syncInfo)
    }
  }
})
