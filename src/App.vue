<template>
  <div id="app"
       class="app"
       :class="classes"
       :style="appStyle">
    <editor class="app__editor"/>
    <tool-bar class="app__tool-bar"/>
    <path-bar class="app__path-bar"/>
    <left-sidebar class="app__left-sidebar"/>
    <right-sidebar class="app__right-sidebar"/>
    <bottom-bar class="app__bottom-bar"/>
    <context-bar class="app__context-bar"/>
    <bottom-bar-tabs class="app__bottom-bar-tabs"/>
    <left-tab-bar class="app__left-tab-bar"/>
    <right-tab-bar class="app__right-tab-bar"/>
  </div>
</template>

<script>
import ToolBar from '@/components/layout/tool-bar'
import PathBar from '@/components/layout/path-bar'
import LeftTabBar from '@/components/layout/left-tab-bar'
import RightTabBar from '@/components/layout/right-tab-bar'
import Editor from '@/components/layout/editor'
import LeftSidebar from '@/components/layout/left-sidebar'
import RightSidebar from '@/components/layout/right-sidebar'
import BottomBar from '@/components/layout/bottom-bar'
import ContextBar from '@/components/layout/context-bar'
import BottomBarTabs from '@/components/layout/bottom-bar-tabs'

export default {
  name: 'app',
  components: {
    Editor,
    LeftSidebar,
    RightSidebar,
    BottomBar,
    ContextBar,
    BottomBarTabs,
    LeftTabBar,
    RightTabBar,
    PathBar,
    ToolBar,
  },
  computed: {
    appGridTemplateColumns () {
      const { leftSidebar, rightSidebar } = this.$store.state.layout
      const rightBar = rightSidebar.visible ? rightSidebar.width : 0
      const leftBar = leftSidebar.visible ? leftSidebar.width : 0

      const editorWidth = leftBar + rightBar + 40
      return `20px ${leftBar}px calc(100vw - ${editorWidth}px) ${rightBar}px 20px`
    },
    appGridTemplateRows () {
      const { bottomBar } = this.$store.state.layout
      const editorHeight = 100 + bottomBar.height
      return `25px 25px calc(100vh - ${editorHeight}px) ${bottomBar.height}px 25px 25px`
    },
    appGridTemplateAreas () {
      return `
        "tool-bar         tool-bar          tool-bar          tool-bar              tool-bar"
        "path-bar         path-bar          path-bar          path-bar              path-bar"
        "left-tab-bar     left-sidebar      editor            right-sidebar         right-tab-bar"
        "left-tab-bar     bottom-bar        bottom-bar        bottom-bar            right-tab-bar"
        "bottom-bar-tabs  bottom-bar-tabs   bottom-bar-tabs   bottom-bar-tabs       bottom-bar-tabs"
        "context-bar      context-bar       context-bar       context-bar           context-bar"
      `
    },
    appStyle () {
      return {
        'grid-template-columns': this.appGridTemplateColumns,
        'grid-template-rows': this.appGridTemplateRows,
        'grid-template-areas': this.appGridTemplateAreas
      }
    },
    classes () {
      return [
        (this.$store.state.disableTextSelect ? 'app--disable-user-select': '')
      ]
    }
  }
}
</script>

<style lang="stylus">
@import "~@/stylus/variables"
.app
  height 100vh
  display grid
  background $grey

  &--disable-user-select *
    user-select none

  &__editor
    grid-area editor
    z-index 1

  &__file-opts
    grid-area file-opts

  &__left-sidebar
    grid-area left-sidebar

  &__right-sidebar
    grid-area right-sidebar

  &__context-bar
    grid-area context-bar
    z-index 2

  &__tab-bar
    grid-area tab-bar

  &__bottom-bar
    grid-area bottom-bar
    z-index 2

  &__bottom-bar-tabs
    grid-area bottom-bar-tabs
    z-index 2

  &__left-tab-bar
    grid-area left-tab-bar

  &__right-tab-bar
    grid-area right-tab-bar

  &__path-bar
    grid-area path-bar

  &__tool-bar
    grid-area tool-bar


</style>
