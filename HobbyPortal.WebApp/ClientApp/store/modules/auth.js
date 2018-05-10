import { api } from '../../http/api'
import router from '../../router'

const state = {
  token: null,
  expiration: null
}

const getters = {
  token(state) {
    return state.token
  },
  isAuthenticated(state) {
    return state.token !== null
  }
}

const mutations = {
  setToken(state, payload) {
    localStorage.setItem('token', payload)
    state.token = payload
  },
  clearToken(state, payload) {
    localStorage.removeItem('token')
    state.token = null
  },
  setExpiration(state, payload) {
    state.expiration = payload
  }
}

const actions = {
  register({ commit, dispatch }, payload) {
    api.post('/auth/register', payload).then(response => {
      commit('setToken', response.data.token)
      dispatch('setExpirationTime', response.data.expiration)
      router.push('/my-clubs')
    })
  },
  login({ commit, dispatch }, payload) {
    api.post('/auth/login', payload).then(response => {
      commit('setToken', response.data.token)
      dispatch('setExpirationTime', response.data.expiration)
      router.push('/my-clubs')
    })
  },
  logout({ commit }) {
    commit('clearToken')
    router.push('/')
  },
  setExpirationTime({ commit, dispatch }, payload) {
    let now = new Date()
    let expirationDate = new Date(payload)
    let expirationTime = expirationDate.getTime() - now.getTime()
    commit('setExpiration', expirationDate)
    setTimeout(() => {
      dispatch('logout')
    }, expirationTime)
  },
  restoreTokenFromStorage({ commit }) {
    let token = localStorage.getItem('token')
    if (token) {
      commit('setToken', token)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
