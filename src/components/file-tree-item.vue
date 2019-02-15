<template>
  <div class="file-tree-item__wrapper">
    <div class="file-tree-item" :class="classes">
        <span v-if="isDirectory" class="file-tree__folder__icon">
          <img v-if="item.expanded" src="../assets/img/arrow-down.svg" @click="toggleExpanded">
          <img v-else src="../assets/img/arrow-right.svg" @click="toggleExpanded">
          <i class="fa fa-folder"></i>
        </span>
        <span v-else class="file-tree__file__icon" @click="openFile">
          <file-icon style="height: 14px; width: 14px;" :name="item.name" :color="item.iconColor" :extension="item.extension"/>
        </span>
        <span class="file-tree-item__name" @click="openFile">{{ item.name }}</span>
    </div>
    <template v-if="item.expanded">
      <file-tree-item
          v-for="i in filterLinks(item.contents)"
          :key="i.name"
          :item="i"
      ></file-tree-item>
    </template>
  </div>
</template>

<script>
  import FileIcon from './file-icon'

  export default {
    name: 'file-tree-item',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    components: {FileIcon},
    data () {
      return {
        expanded: false
      }
    },
    methods: {
      itemContents (item) {
        return Array.isArray(item.contents)
          ? item.contents
          : []
      },
      filterLinks (contents) {
        return contents.filter(item => !item.name.startsWith('.'))
      },
      openFile () {
        if (this.item.type === 'dir') return
        this.$store.commit('OPEN_FILE', this.item)
      },
      toggleExpanded () {
        this.$store.commit('TOGGLE_FOLDER', this.item)
      }
    },
    computed: {
      classes () {
        const typeClass = this.item.type === 'dir'
          ? 'file-tree__folder'
          : 'file-tree__file'

        const selectedClass = this.activeFile.id === this.item.id
          ? `${typeClass}--selected`
          : ''

        return `${typeClass} depth-${this.item.depth} ${selectedClass}`
      },
      activeFile () {
        return this.$store.state.activeFile
      },
      isDirectory () {
        return this.item.type === 'dir'
      }
    }
  }
</script>

<style lang="stylus">
  @import "~@/stylus/variables"

  .file-opts
    background: $grey
    border: 1px solid $darkborder

  .file-tree-item
    display inline-flex
    align-items center
    overflow visible
    white-space nowrap
    width 100%
    &__wrapper
      overflow visible
    &__name
      color: $lightgrey
      cursor default


  .file-tree
    overflow-x: visible;
    overflow-y: auto;

    for num in 1..20
      &__folder.depth-{num}
        padding-left 20px * num
      &__file.depth-{num}
        padding-left 15px + (20px * num)


    &__folder,
    &__file
      &--selected
        background: rgb(1, 41, 64)

      &__icon
        margin-right: 5px

        & > img
          width: 9px;
          margin-right: 5px;
          cursor default

        .fa.fa-file
          color: #87939a

        .fab.fa-markdown
          bottom: 0.4em
          left: 50%
          transform: translateX(-50%)
          line-height: 0
          font-size: 1.5em
          color: #3f93b0

      .fa.fa-folder
        color: #87939a
        font-size 16px

      .fa.fa-caret-down,
      .fa.fa-caret-right
        color: #adadad
        padding-right: 5px

</style>
