<template>
  <div class="bottom-bar">
    <terminal/>
  </div>
</template>

<script>
  import useMakeResizeable from '@/hooks/make-resizeable'
  import store from '@/store'
  import Terminal from '@/components/terminal'

  export default {
    components: {
      Terminal
    },
    hooks () {
      useMakeResizeable({
        selector: '.bottom-bar',
        edge: 'top',
        defaultheight: 100,
        onResize: (newHeight) => {
          store.commit('UPDATE_BOTTOM_BAR_HEIGHT', newHeight)
          store.commit('SET_ALLOW_TEXT_SELECT', true)
        },
        onDone: () => {
          store.commit('SET_ALLOW_TEXT_SELECT', false)
        }
      })
    }
  }
</script>

<style lang="stylus">
  @import "~@/stylus/variables"
  .bottom-bar
    background $darkgrey
</style>
