<template>
  <div class="editor">
    <div class="tab-bar">
      <div class="tabs">
        <panel-tab v-for="(file, $index) in openFiles"
             :active="activeFile.id === file.id"
             :key="$index"
             :name="file.name"
             @close="closeFile(file)"
             :color="file.iconColor"
             @click.native="openFile(file)"
             :extension="file.extension"/>
      </div>
    </div>
    <!--<pre v-if="activeFile" ref="files" :key="activeFile.name">-->
<!--<code :class="`language-${activeFile.extension}`">{{ activeFile.contents }}</code>-->
    <!--</pre>-->
    <div style="height: 100%" ref="files" :key="activeFile.id">

    </div>
  </div>
</template>

<script>
  import PanelTab from '@/components/panel-tab'
  import CodeMirror from 'codemirror'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/addon/fold/foldgutter.js'
  import 'codemirror/addon/fold/comment-fold'
  import 'codemirror/addon/fold/foldcode'
  import 'codemirror/addon/fold/brace-fold'
  import 'codemirror/addon/fold/indent-fold'
  import 'codemirror/addon/fold/markdown-fold'
  import 'codemirror/addon/fold/foldgutter.css'
  import 'codemirror/mode/javascript/javascript'
  import 'codemirror/mode/xml/xml'
  import 'codemirror/mode/css/css'
  import 'codemirror/mode/vue/vue'
  import 'codemirror/mode/htmlmixed/htmlmixed'
  import 'codemirror/mode/stylus/stylus'
  import 'codemirror/mode/python/python'
  import 'codemirror/mode/markdown/markdown'

  export default {
    components: {PanelTab},
    computed: {
      openFiles () {
        return this.$store.state.openFiles
      },
      activeFile () {
        return this.$store.state.activeFile
      },
      highlightWatches () {
        return {...this.openFiles, ...this.activeFile}
      }
    },
    watch: {
      highlightWatches: {
        immediate: true,
        deep: true,
        handler () {
          this.highlight()
        }
      }
    },
    methods: {
      async highlight () {
        await this.$nextTick()
        if (this.$refs.files) {
          // hljs.highlightBlock(this.$refs.files)
          // hljs.lineNumbersBlock(this.$refs.files)
          const modeMap = {
            VUE: 'vue',
            HTML: 'htmlmixed',
            JS: 'javascript',
            STYL: 'css',
            CSS: 'css',
            SVG: 'xml',
            JSON: 'javascript',
            MD: 'markdown'
          }

          var myCodeMirror = CodeMirror(this.$refs.files, {
            value: this.activeFile.contents,
            mode:  {name: modeMap[this.activeFile.extension], json: true},
            theme: 'darcula',
            lineNumbers: true,
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
          });
        }
      },
      openFile (file) {
        this.$store.commit('SET_ACTIVE_FILE', file)
      },
      closeFile (file) {
        this.$store.commit('CLOSE_FILE', file)
      }
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
      overflow auto

      code.hljs
        height: 100%

        > table
          height: 100%

  table.hljs-ln
    width: 100%
    height 100%

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
    overflow: hidden

    .tabs
      display: flex
      justify-content: flex-start
      align-items: stretch
      height: 100%
      overflow: scroll;
      margin-bottom: -17px;
      padding-bottom: 17px;

</style>
