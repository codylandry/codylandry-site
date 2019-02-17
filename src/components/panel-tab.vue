<template>
  <div class="tab" :class="classes">
    <slot name="icon">
      <file-icon class="tab__icon" style="height: 14px; width: 14px" :color="color" :extension="extension"/>
    </slot>
    <span class="tab__name">{{ name }}</span>
    <i @click.stop="$emit('close')" class="fa fa-times tab__close"></i>
  </div>
</template>

<script>
  import FileIcon from './file-icon'
  export default {
    components: {
      FileIcon
    },
    props: {
      name: {
        type: String,
        required: true
      },
      color: {
        type: String
      },
      extension: {
        type: String
      },
      active: {
        type: Boolean
      }
    },
    computed: {
      classes () {
        return [
          this.active ? 'tab--selected' : '',
        ]
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~@/stylus/variables"
  .tab
    display: flex
    user-select none
    align-items: center
    justify-content: space-around
    color: $lightgrey
    font-weight: 400
    font-size: 13px
    letter-spacing: 0.4px
    padding: 3px 8px
    white-space nowrap

    &__icon
      display none

    &__close
      display none

    &__name
      padding-left 5px
      font-size: 11px
      position: relative
      top: 2px

    &.bar-tab
      background rgba(0, 0, 0, 0.30)
      border-bottom: 3px solid transparent
      padding 3px 10px

      .tab__close
        display block
        font-size: 11px
        margin-left: 5px
        color: #5e696e
        position: relative
        top: 1px

    &.editor-tab
      border-right: 1px solid $lightborder

      &.tab--selected
        background: rgb(80, 86, 88)
        border-bottom: 3px solid $blue

      &.tab:not(.tab--selected)
        border-bottom: 3px solid transparent

      .tab__icon
        display block
        margin-right: 5px

      .tab__close
        display block
        font-size: 11px
        margin-left: 5px
        color: #5e696e
        position: relative
        top: 1px

      .tab__name
        padding-left 5px
        font-size: 11px
        position: relative
        top: 2px
</style>
