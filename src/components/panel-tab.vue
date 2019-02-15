<template>
  <div class="tab" :class="active ? 'tab--selected' : ''">
    <slot name="icon">
      <file-icon v-if="showIcon" style="height: 14px; width: 14px" :color="color" :extension="extension"/>
    </slot>
    <span class="tab__name">{{ name }}</span>
    <i v-if="showClose" @click.stop="$emit('close')" class="fa fa-times tab__close"></i>
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
      },
      showIcon: {
        type: Boolean,
        'default': true
      },
      showClose: {
        type: Boolean,
        'default': true
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
    border-right: 1px solid $lightborder
    white-space nowrap

    &--selected
      background: rgb(80, 86, 88)
      border-bottom: 3px solid $blue

    &:not(&--selected)
      border-bottom: 3px solid transparent

    &__icon
      margin-right: 5px

    &__close
      font-size: 11px
      margin-left: 5px
      color: #5e696e
      position: relative
      top: 1px

    &__name
      padding-left 5px
      font-size: 11px
      position: relative
      top: 2px
</style>
