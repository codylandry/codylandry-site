<template>
  <div class="right-tab-bar__wrapper">
    <div class="right-tab-bar">
      <panel-tab class="bar-tab" name="Database" :active="databaseViewVisible" :show-close="false" @click.native="toggleProjectView">
        <template slot="icon">
          <i class="fas fa-database"></i>
        </template>
      </panel-tab>
    </div>
  </div>
</template>

<script>
  import PanelTab from '../panel-tab'
  export default {
    components: {PanelTab},
    computed: {
      databaseViewVisible () {
        return this.$store.state.layout.rightSidebar.visible
      }
    },
    methods: {
      toggleProjectView () {
        this.$store.commit('SET_RIGHT_SIDEBAR_VISIBILITY', !this.$store.state.layout.rightSidebar.visible)
      }
    }
  }
</script>

<style lang="stylus">
  @import "~@/stylus/variables"
  .right-tab-bar
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: bottom left;
    transform: translateY(-22px) rotate(90deg);

    &__wrapper
      position relative
      border-left 1px solid $lightborder

    .fas.fa-database
      transform: rotate(-90deg) translateX(-2px);

</style>
