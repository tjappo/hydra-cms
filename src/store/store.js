import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    syncInfo: {
      hash: 'QmWJcCR1v9HvjJ4yUQZFYYNoSbE6y9ZhHveUxcSKdm9tsV',
      path: 'data'
    },
    dataRoutes: []
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
    },
    dataRoutes: state => {
      return state.dataRoutes
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
    },
    addDataRoute: (state, newRoute) => {
      state.dataRoutes.push(newRoute)
    },
    removeDataRoute: (state, routeToRemove) => {
      state.dataRoutes = state.dataRoutes.filter((item) => item !== routeToRemove)
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
    },
    addDataRoute: ({commit}, newRoute) => {
      commit('addDataRoute', newRoute)
    },
    removeDataRoute: ({commit}, routeToRemove) => {
      commit('removeDataRoute', routeToRemove)
    }
  }
})
