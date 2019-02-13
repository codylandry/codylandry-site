import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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

    fileSystem: {
      'name': '~',
      'type': 'dir',
      'contents': [
        {
          'name': 'file1',
          'type': 'text',
          'contents': 'Hello World!',
          'description': 'FOOO'
        },
        {
          'name': 'pic.jpg',
          'type': 'img',
          'contents': '/images/penguin.png',
          'caption': 'What a beautiful penguin.'
        },
        {
          'name': 'dir1',
          'type': 'dir',
          'contents': [
            {
              'name': 'file2',
              'type': 'text',
              'contents': 'foo'
            },
            {
              'name': 'foo',
              'type': 'dir',
              'contents': [
                {
                  'name': 'file3',
                  'type': 'exec',
                  'contents': 'http://google.com',
                  'description': 'blahblah'
                }
              ]
            }
          ]
        }
      ]
    }
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
