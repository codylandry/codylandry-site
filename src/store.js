import Vue from 'vue'
import Vuex from 'vuex'
import fileSystem from './fileSystem.json'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileSystem,
    layout: {
      leftSidebar: {
        width: 225,
        visible: true
      },
      bottomBar: {
        height: 100,
        visible: true
      },
      rightSidebar: {
        width: 225,
        visible: false
      }
    },

    editor: {
      tabs: [],
      activeTab: null
    },

    disableTextSelect: false,

  },
  mutations: {
    UPDATE_LEFT_SIDEBAR_WIDTH (state, newWidth) {
      Vue.set(state.layout.leftSidebar, 'width', newWidth)
    },
    UPDATE_RIGHT_SIDEBAR_WIDTH (state, newWidth) {
      Vue.set(state.layout.rightSidebar, 'width', newWidth)
    },
    UPDATE_BOTTOM_BAR_HEIGHT (state, newHeight) {
      Vue.set(state.layout.bottomBar, 'height', newHeight)
    },
    SET_LEFT_SIDEBAR_VISIBILITY (state, val) {
      Vue.set(state.layout.leftSidebar, 'visible', !!val)
    },
    SET_RIGHT_SIDEBAR_VISIBILITY (state, val) {
      Vue.set(state.layout.rightSidebar, 'visible', !!val)
    },
    SET_BOTTOM_BAR_VISIBILITY (state, val) {
      Vue.set(state.layout.bottomBar, 'visible', !!val)
    },
    SET_ALLOW_TEXT_SELECT (state, val) {
      Vue.set(state, 'disableTextSelect', !!val)
    }
  },
  actions: {}
})
