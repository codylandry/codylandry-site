<template>
  <div class="left-tab-bar__wrapper">
    <div class="left-tab-bar">
      <panel-tab name="1:Project" extension="" color="blue" active @click.native="toggleProjectView"></panel-tab>
    </div>
  </div>
</template>

<script>
  import PanelTab from '../panel-tab'
  export default {
    components: {PanelTab},
    methods: {
      toggleProjectView () {
        this.$store.commit('SET_LEFT_SIDEBAR_VISIBILITY', !this.$store.state.layout.leftSidebar.visible)
      }
    }
  }
</script>

<style lang="stylus">
  @import "~@/stylus/variables"
  .left-tab-bar
    position: absolute;
    top: 0;
    right: 0;
    transform-origin: bottom right;
    transform: translateY(-22px) rotate(-90deg);

    &__wrapper
      position relative
      border-right 1px solid $lightborder
</style>
