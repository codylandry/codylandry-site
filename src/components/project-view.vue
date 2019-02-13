<template>
  <div class="project-view">
    <div class="file-opts">
      <div class="tabs">
        <div class="tab"></div>
      </div>
    </div>
    <div class="file-tree">
      <div class="file-tree__folder">
      <span class="file-tree__folder__icon">
        <i class="fa fa-caret-down"></i>
        <i class="fa fa-folder"></i>
      </span>
        <span class="file-tree__folder__name">codylandry.com</span>
      </div>
      <div class="file-tree__file file-tree__file--selected depth-1">
      <span class="file-tree__file__icon">
        <file-icon style="height: 14px; width: 14px;"/>
      </span>
        <span class="file-tree__folder__name">README.md</span>
      </div>
      <!--<div class="file-tree__handle" @mousedown="startTrackingMouse"></div>-->
    </div>
  </div>
</template>

<script>
  import FileIcon from './file-icon'
  import useMakeResizeable from '../hooks/make-resizeable'
  import store from '../store'

  export default {
    components: {FileIcon},
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

  .file-opts
    background: $grey
    border: 1px solid $darkborder

  .file-tree
    padding: 2px
    overflow: auto
    font-weight: 400
    font-size: 13px
    letter-spacing: 0.4px
    border-right: 1px solid $darkborder
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

    &__folder,
    &__file
      display: flex
      align-items: center
      padding-top: 3px
      white-space nowrap

      &--selected
        background: rgb(1, 41, 64)

      &__icon
        margin-right: 5px

        .fa.fa-file
          color: #87939a

        .fab.fa-markdown
          bottom: 0.4em
          left: 50%
          transform: translateX(-50%)
          line-height: 0
          font-size: 1.5em
          color: #3f93b0

      &__name
        color: $lightgrey

      .fa.fa-folder
        color: #87939a

      .fa.fa-caret-down,
      .fa.fa-caret-right
        color: #adadad
        padding-right: 5px

  for num in 1..6
    .depth-{num}
      padding-left 30px * num
</style>
