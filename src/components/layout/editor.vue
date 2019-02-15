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
            mode: {name: modeMap[this.activeFile.extension], json: true},
            theme: 'darcula',
            lineNumbers: true,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
          })
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
