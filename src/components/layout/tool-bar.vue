<template>
<div class="tool-bar">
  <div class="icon-wrapper"><i class="fas fa-folder-open"></i></div>
  <div class="icon-wrapper"><i class="fas fa-save"></i></div>
  <div class="icon-wrapper"><i class="fas fa-sync-alt"></i></div>
  <span class="bar">|</span>
  <div class="icon-wrapper"><i class="fas fa-long-arrow-alt-left"></i></div>
  <div class="icon-wrapper"><i class="fas fa-long-arrow-alt-right"></i></div>
  <span class="bar">|</span>
  <div class="run-configuration">
    <i class="fab fa-js"></i>
    <span>serve</span>
    <i class="fas fa-caret-down"></i>
  </div>
  <div class="icon-wrapper"><i class="color-green fas fa-redo"></i></div>
  <div class="icon-wrapper"><i class="color-green fas fa-bug"></i></div>
  <div class="icon-wrapper"><i class="color-red fas fa-stop"></i></div>
  <span class="bar">|</span>
  <div class="icon-wrapper"><i class="color-blue rotate-neg-45 fas fa-long-arrow-alt-left"></i></div>
  <div class="icon-wrapper"><i class="color-green fas fa-check"></i></div>
  <div class="icon-wrapper"><i class="fas fa-exchange-alt"></i></div>
  <div class="icon-wrapper"><i class="far fa-clock"></i></div>
  <div class="icon-wrapper"><i class="fas fa-undo"></i></div>
  <span class="bar">|</span>
  <div class="icon-wrapper"><i class="fas fa-wrench"></i></div>
  <span class="bar">|</span>
  <div class="icon-wrapper"><i class="fas fa-search"></i></div>
</div>
</template>

<script>
  export default {
    name: 'tool-bar'
  }
</script>

<style lang="stylus" scoped>
@import "~@/stylus/variables"
.tool-bar
  color $lightgrey
  display flex
  height 25px
  align-items center
  font-size 13px
  padding-left 10px

  .run-configuration
    padding: 2px 5px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    border 1px solid #52585b
    margin-left 6px

    .fab.fa-js
      padding-right: 6px;
      color #feca29

    .fas.fa-caret-down
      padding-left: 6px;

  .icon-wrapper
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    padding: 3px 0;
    border-radius: 4px;

    &:hover
      background #52585b

  .bar
    padding-right 0
    padding-left 0
    font-size: 20px;
    font-weight: 100;
    color: #d3d3d336;

  & > *
    padding-left 10px

  .color-green
    color #499c54

  .color-red
    color #c75450

  .color-blue
    color #3592c4

  .rotate-neg-45
    transform: rotate(-45deg);
    font-size: 17px;

</style>
