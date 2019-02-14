<template>
  <div class="left-sidebar">
    <project-view/>
  </div>
</template>

<script>
  import ProjectView from '@/components/project-view'
  import useMakeResizeable from '@/hooks/make-resizeable'
  import store from '@/store'
  export default {
    components: {
      ProjectView
    },
    hooks () {
      useMakeResizeable({
        selector: '.left-sidebar',
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

<style lang="stylus" scoped>
  @import "~@/stylus/variables"
  .left-sidebar
    background $grey
</style>
