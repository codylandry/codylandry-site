<template>
  <div class="project-view">
    <div class="file-opts">
      <div class="tabs">
        <div class="tab"></div>
      </div>
    </div>
    <div class="file-tree">
      <file-tree-item
          :key="fileSystem.id"
          :item="fileSystem"
      ></file-tree-item>
    </div>
  </div>
</template>

<script>
  import FileTreeItem from './file-tree-item'
  import useMakeResizeable from '../hooks/make-resizeable'
  import store from '../store'

  export default {
    components: {FileTreeItem},
    computed: {
      fileSystem () {
        return this.$store.state.fileSystem
      }
    },
    methods: {
      itemContents (item) {
        return Array.isArray(item.contents)
          ? item.contents
          : []
      },
      filterLinks (contents) {
        return contents.filter(item => !item.name.startsWith('.'))
      }
    },
    hooks () {
      useMakeResizeable({
        selector: '.file-tree',
        edge: 'right',
        defaultwidth: 225,
        onResize: (newWidth) => {
          store.commit('UPDATE_LEFT_SIDEBAR_WIDTH', newWidth)
          store.commit('SET_ALLOW_TEXT_SELECT', true)
        },
        onDone: () => {
          store.commit('SET_ALLOW_TEXT_SELECT', false)
        }
      })
    },
  }
</script>

<style lang="stylus">
  @import "~@/stylus/variables"

  .project-view
    max-height 100%

  .file-opts
    background: $grey
    border: 1px solid $darkborder

  .file-tree
    padding: 2px
    overflow: visible
    font-weight: 400
    font-size: 13px
    letter-spacing: 0.4px
    background $grey
    position: relative
    height: 100%

    &__handle
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      width: 4px;
      cursor ew-resize
</style>
