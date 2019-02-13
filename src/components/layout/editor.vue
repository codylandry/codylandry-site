<template>
  <div class="editor">
    <div class="tab-bar">
      <div class="tabs">
        <tab/>
      </div>
    </div>
    <pre>
<code class="language-markdown">
# Cody Landry
----------------

- Javascript
- Python
</code>
    </pre>
  </div>
</template>

<script>
  import Tab from '@/components/tab'

  export default {
    components: {Tab},
    async mounted () {
      await this.$nextTick()
      // eslint-disable-next-line
      hljs.initHighlightingOnLoad()
      // eslint-disable-next-line
      hljs.initLineNumbersOnLoad()
    }
  }
</script>

<style lang="stylus">
  @import "~@/stylus/variables"

  .editor
    background: $darkgrey

    pre
      padding: 0
      margin: 0
      height: 100%

      code.hljs
        height: 100%

        > table
          height: 100%

  table.hljs-ln
    width: 100%

    > tbody > tr:last-of-type
      height: 100%

      > td.hljs-ln-code
        vertical-align: text-top

  /* for block of numbers */
  .hljs-ln td.hljs-ln-numbers
    -webkit-touch-callout: none
    -webkit-user-select: none
    -khtml-user-select: none
    -moz-user-select: none
    -ms-user-select: none
    user-select: none
    text-align: center
    color: rgba(93, 97, 100, 1)
    border-right: 1px solid rgba(85, 85, 85, 1)
    vertical-align: top
    padding-right: 30px
    background: rgb(49, 51, 53)
    font-weight: 100
    min-width: 30px
    max-width: 30px
    width: 30px

  .hljs-ln td.hljs-ln-numbers .hljs-ln-line.hljs-ln-n
    font-family: "Fira Code Light", sans-serif
    font-size: 12px

  .hljs-ln-line.hljs-ln-n
    min-width: 30px
    max-width: 30px

  /* for block of code */
  .hljs-ln td.hljs-ln-code
    padding-left: 8px
    background: $darkgrey

  code.hljs
    padding: 0

  .tab-bar
    background: $grey
    border: 1px solid $lightborder
    border-left: none
    border-right: none

    .tabs
      display: flex
      justify-content: flex-start
      align-items: stretch
      height: 100%

      .tab
        display: flex
        align-items: center
        justify-content: space-around
        color: $lightgrey
        font-weight: 400
        font-size: 13px
        letter-spacing: 0.4px
        padding: 3px 8px
        border-right: 1px solid $lightborder

        &--selected
          background: rgb(80, 86, 88)
          border-bottom: 3px solid $blue

        &__icon
          margin-right: 5px

        &__close
          font-size: 11px
          margin-left: 5px
          color: #5e696e
          position: relative
          top: 1px

        &__name
          font-size: 11px
          position: relative
          top: 2px
</style>
