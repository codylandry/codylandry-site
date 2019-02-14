<template>
  <div class="terminal">
    <div class="tabs">
      <span>Terminal:</span>
    </div>
    <div id="js-terminal"></div>
  </div>
</template>

<script>
  import { Terminal } from '@/lib/jsterm'
  import { commands } from '@/lib/commands'

  export default {
    async mounted () {
      await this.$nextTick()
      const prompt = (cwd) => `<span class="user">cody</span>@<span class="host">codylandry.com</span>:<span class="cwd">${cwd}</span>$ `

      const term = new Terminal(
        {prompt},
        this.$store.state.fileSystem,
        commands
      )

      term.enqueue('cd codylandry')
        .begin(document.getElementById('js-terminal'))
    }
  }
</script>

<style lang="stylus">
  @import "~@/stylus/variables"
  .terminal
    background $darkgrey
    color $lightgrey
    max-height 100%
    overflow auto
    font-weight 300
    font-size 13px

    .tabs
      background $grey
      position absolute
      top 0
      left 0
      width 100%
      height 25px
      display flex
      align-items center
      padding 0 10px
      font-weight 400
      border 1px solid $darkborder

  #js-terminal *
    font-family: "Fira Code", monospace
    font-feature-settings: "calt" 1
    font-weight 200
    font-size 13px
    margin-top 4px

  .jsterm a {
    color: #E0E0E0;
    text-decoration: none;
  }

  .jsterm a:hover {
    text-decoration: underline;
  }

  div.jsterm {
    font-family: "Fira Code", monospace;
    font-size: 16px;
    color: #E0E0E0;
    white-space: pre-wrap;
    padding: 10px;
  }

  div.jsterm .host, div.jsterm .host a {
    color: #479cf0;
    font-weight: bold;
  }

  div.jsterm .user, div.jsterm .user a {
    color: #f96966;
    font-weight: bold;
  }

  div.jsterm .cwd, div.jsterm .cwd a {
    color: #ffff55;
    font-weight: bold;
  }

  div.jsterm .dir, div.jsterm .dir a {
    color: #479cf0;
    font-weight: bold;
  }

  div.jsterm .link, div.jsterm .link a {
    color: #479cf0;
    font-weight: bold;
  }

  div.jsterm .exec, div.jsterm .exec a {
    color: #55ff55;
    font-weight: bold;
  }

  div.jsterm .img, div.jsterm .img a {
    color: #ff55ff;
    font-weight: bold;
  }

  #blinker {
    line-height: .9em;
  }

</style>
