<template>
  <div class="left-tab-bar__wrapper">
    <div class="left-tab-bar">
      <panel-tab class="bar-tab" name="1:Project" :show-close="false" :active="projectViewVisible" @click.native="toggleProjectView">
        <template slot="icon"><i class="fa fa-folder"></i></template>
      </panel-tab>
    </div>
  </div>
</template>

<script>
  import PanelTab from '../panel-tab'
  export default {
    components: {PanelTab},
    computed: {
      projectViewVisible () {
        return this.$store.state.layout.leftSidebar.visible
      }
    },
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

    .fa.fa-folder
      transform: rotate(90deg) translateX(2px);
</style>
