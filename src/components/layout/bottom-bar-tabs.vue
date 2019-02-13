<template>
  <div class="bottom-bar-tabs">
    <div class="bottom-bar__tab">
      <i class="fab fa-docker" style="color: #0FAADB"></i>
      <span class="bottom-bar__tab__label">Docker</span>
    </div>
    <div class="bottom-bar__tab bottom-bar__tab--active">
      <i class="fas fa-terminal"></i>
      <span class="bottom-bar__tab__label">Terminal</span>
    </div>
    <div class="bottom-bar__tab">
      <i class="fas fa-play"></i>
      <span class="bottom-bar__tab__label">Run</span>
    </div>
    <div class="bottom-bar__tab">
      <i class="fas fa-list-ul"></i>
      <span class="bottom-bar__tab__label">TODO</span>
    </div>
    <div class="bottom-bar__tab bottom-bar__tab--right">
      <i class="far fa-comment fa-flip-horizontal"></i>
      <span class="bottom-bar__tab__label">Event Log</span>
    </div>
  </div>
</template>

<script>
  export default {
    components: {

    }
  }
</script>

<style lang="stylus" scoped>
  @import "~@/stylus/variables"
  .bottom-bar-tabs
    background $grey
    border-top 1px solid $lightborder
    padding 0 25px
    display flex
    align-items center
    color $lightgrey

  .bottom-bar__tab
    display flex
    align-items center
    color $lightgrey
    padding 0 10px
    height 100%
    font-size 12px

    &__label
      padding-left 6px

    &--active
      background $darkgrey

    &--right
      margin-left auto
</style>
