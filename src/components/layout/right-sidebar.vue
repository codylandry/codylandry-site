<template>
  <div class="right-sidebar">

  </div>
</template>

<script>
  import useMakeResizeable from '@/hooks/make-resizeable'
  import store from '@/store'
  export default {
    hooks () {
      useMakeResizeable({
        selector: '.right-sidebar',
        edge: 'left',
        defaultwidth: 225,
        onResize: (newWidth) => {
          store.commit('UPDATE_RIGHT_SIDEBAR_WIDTH', newWidth)
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
  .right-sidebar
    background $grey
</style>
