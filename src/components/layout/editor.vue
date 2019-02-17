<template>
  <div class="editor" @keydown.stop @keypress.stop>
    <div class="tab-bar">
      <draggable v-model="openFiles" class="tabs">
        <panel-tab v-for="(file, $index) in openFiles"
                   class="editor-tab"
                   :active="activeFile.id === file.id"
                   :key="$index"
                   :name="file.name"
                   @close="closeFile(file)"
                   :color="file.iconColor"
                   @click.native="openFile(file)"
                   :extension="file.extension"/>
      </draggable>
    </div>
    <div style="height: 100%; position: relative;" ref="files" :key="activeFile.id">
      <div v-if="!activeFile.id && !openFiles.length" class="no-files">
        <div><span class="no-files__txt">Search Everywhere</span><span class="no-files__key">Double ↑</span></div>
        <div><span class="no-files__txt">Go to File</span><span class="no-files__key">⇧⌘O</span></div>
        <div><span class="no-files__txt">Recent Files</span><span class="no-files__key">⌘E</span></div>
        <div><span class="no-files__txt">Navigation Bar</span><span class="no-files__key">⌘↑</span></div>
        <div><span class="no-files__txt">Drop Files Here to Open</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
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
    components: {PanelTab, Draggable},
    computed: {
      openFiles: {
        get () {
          return this.$store.state.openFiles
        },
        set (val) {
          this.$store.commit('SET_OPEN_FILES', val)
        }
      },
      activeFile () {
        return this.$store.state.activeFile
      },
      openFiles () {
        return this.$store.state.openFiles
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
        if (this.$refs.files && this.activeFile.id) {
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

    .no-files
      position: absolute;
      left: 50%;
      top: 50%;
      color: white;
      transform: translate(-50%, -50%);
      user-select none

      & > div:not(:last-of-type)
        padding-bottom 20px

      &__txt
        color #8f8f8f

      &__key
        color #589DF6
        margin-left 20px

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
