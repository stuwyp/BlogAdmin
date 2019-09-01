import auth from '@/api/auth'

const state = {
  user: null,
  isLogin: false,
  token: '',
  name: ''
}

const getters = {
  user: state => state.user,
  name: state => state.name,
  isLogin: state => state.isLogin,
  token: state => {
    if (state.token === '') {
      state.token = window.localStorage.getItem('jwt_token')
    }
    return state.token
  }
}

const mutations = {
  setUser(state, payload) {
    state.user = payload.user
  },
  setName(state, payload) {
    state.name = payload.name
  },
  setLogin(state, payload) {
    state.isLogin = payload.isLogin
  },

  setToken(state, payload) {
    window.localStorage.setItem('jwt_token', payload.token)
    state.token = payload.token
  }
}

const actions = {
  login({ commit }, { username, password }) {
    return auth.login({ username, password })
      .then(res => {
        // console.log('data ', res)
        commit('setUser', { user: res.data })
        commit('setName', { name: res.data.username })
        commit('setLogin', { isLogin: true })
        commit('setToken', { token: res.token })
      })
  },

  register({ commit }, { username, password, email }) {
    auth.register({ username, password, email }).then(res => console.log(res))
    return auth.login({ username, password })
      .then(res => {
        // console.log("data ", res)
        commit('setUser', { user: res.data })
        commit('setLogin', { isLogin: true })
        commit('setToken', { token: res.token })
        commit('setName', { name: res.data.username })
        // console.log("Set ", state.isLogin, state.user, state.token)
      })
  },

  logout({ commit }) {
    commit('setUser', { user: null })
    commit('setLogin', { isLogin: false })
    commit('setToken', { token: '' })
    commit('setName', { name: '' })
  },

  async checkLogin({ commit, state }) {
    // console.log("checking")
    if (state.isLogin) return true

    try {
      const res = await auth.getInfo()
      // console.log("auth res",res)
      commit('setLogin', { isLogin: res.isLogin })
      if (!res.isLogin) return false
      commit('setUser', { user: res.data })
      commit('setName', { name: res.data.username })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('setToken', { token: '' })
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
