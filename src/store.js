import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import flatted from 'flatted/esm'
import fileSystem from './file-system.json'

Vue.use(Vuex)

const LOCAL_STORAGE_KEY = 'vuex-state'

const writeToLocalStorage = _.debounce((mutation, state) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, flatted.stringify(state))
}, 1000)

const localStoragePlugin = store => {
  store.subscribe(writeToLocalStorage)
}

function getFileByPath (path) {
  let [_, ...pathArray] = path.split('/')
  let next = fileSystem
  for (const segment of pathArray) {
    next = next.contents.find(f => f.name === segment)
  }
  return next
}

const initialActiveFile = getFileByPath('~/README.md')

const initialState = {
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
  openFiles: [initialActiveFile],
  activeFile: initialActiveFile,
  disableTextSelect: false,
}

function getState () {
  const localStorageState = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (localStorageState) {
    const localStorageState_ = flatted.parse(localStorageState)

    if (localStorageState_.fileSystem.id !== fileSystem.id) {
      return initialState
    }

    return localStorageState_
  }
  return initialState
}

export default new Vuex.Store({
  plugins: [localStoragePlugin],
  state: getState(),
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
    },
    SET_ACTIVE_FILE (state, file) {
      Vue.set(state, 'activeFile', file)
    },
    OPEN_FILE (state, file) {
      if (!state.openFiles.find(f => f.id === file.id)) {
        state.openFiles.push(file)
      }
      Vue.set(state, 'activeFile', file)
    },
    CLOSE_FILE (state, file) {
      const idx = state.openFiles.findIndex(f => f.id === file.id)
      Vue.delete(state.openFiles, idx)

      if (file.id === state.activeFile.id) {
        Vue.set(state, 'activeFile', state.openFiles[idx - 1] || {})
      }
    },
    SET_OPEN_FILES (state, files) {
      Vue.set(state, 'openFiles', [...files])
    },
    TOGGLE_FOLDER (state, folder) {
      Vue.set(folder, 'expanded', !folder.expanded)
    }
  },
  actions: {}
})
