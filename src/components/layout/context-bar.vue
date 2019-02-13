<template>
  <div class="context-bar">
    <!--<i class="fa fa-box context-bar__hide-tabs"></i>-->
    <img class="context-bar__hide-tabs" src="../../assets/hidetabs.svg">
    <span class="context-bar__text">
      <span>6:13</span>
      <span>
        <span>LF</span>
        <span class="fa-stack">
          <i class="fa fa-sort-up fa-stack-1x"></i>
          <i class="fa fa-sort-down fa-stack-1x"></i>
        </span>
      </span>
      <span>
        <span>UTF-8</span>
        <span class="fa-stack">
          <i class="fa fa-sort-up fa-stack-1x"></i>
          <i class="fa fa-sort-down fa-stack-1x"></i>
        </span>
      </span>
      <span>
        <span>2 spaces</span>
        <span class="fa-stack">
          <i class="fa fa-sort-up fa-stack-1x"></i>
          <i class="fa fa-sort-down fa-stack-1x"></i>
        </span>
      </span>
      <i class="fa fa-lock-open"></i>
      <i class="fas fa-user-secret"></i>
      <i class="fas fa-cogs"></i>
    </span>
  </div>
</template>

<style lang="stylus" scoped>
  @import "~@/stylus/variables"
  .context-bar
    display flex
    justify-content space-between
    align-items center
    background $grey
    border-top 1px solid $lightborder

    .fa-stack
      width 1em
      font-size 9px
      padding-left 2px

    &__hide-tabs
      width: 15px;
      margin-left: 5px;

    &__text
      font-size: 11px;
      color: #B9B9B9;
      font-weight: 400;
      padding-right 3px

      & > *
        padding 0 3px
</style>
