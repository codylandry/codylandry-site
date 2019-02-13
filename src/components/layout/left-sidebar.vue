<template>
  <div class="left-sidebar">

  </div>
</template>

<script>
  import useMakeResizeable from '@/hooks/make-resizeable'
  import store from '@/store'
  export default {
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
