<template>
  <div class="file-tree-item__wrapper">
    <div class="file-tree-item" :class="classes">
        <span v-if="isDirectory" class="file-tree__folder__icon">
          <i class="fa fa-caret-down"></i>
          <i class="fa fa-folder"></i>
        </span>
        <span v-else class="file-tree__file__icon">
          <file-icon style="height: 14px; width: 14px;"/>
        </span>
        <span class="file-tree-item__name">{{ name }}</span>
    </div>
    <file-tree-item
        v-for="item in filterLinks(contents)"
        :key="item.name"
        :name="item.name"
        :depth="item.depth"
        :type="item.type"
        :contents="itemContents(item)"
    ></file-tree-item>
  </div>
</template>

<script>
  import FileIcon from './file-icon'

  export default {
    name: 'file-tree-item',
    props: {
      name: {
        type: String,
        required: true
      },
      depth: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      contents: {
        type: Array,
        'default': () => []
      }
    },
    components: {FileIcon},
    methods: {
      itemContents (item) {
        return Array.isArray(item.contents)
          ? item.contents
          : []
      },
      filterLinks (contents) {
        return contents.filter(item => !item.name.startsWith('.'))
      }
    },
    computed: {
      classes () {
        const typeClass = this.type === 'dir'
          ? 'file-tree__folder'
          : 'file-tree__file'

        return `${typeClass} depth-${this.depth}`
      },
      isDirectory () {
        return this.type === 'dir'
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
    overflow visible
    white-space nowrap
    &__wrapper
      overflow visible
    &__name
      color: $lightgrey


  .file-tree

    &__folder,
    &__file
      &--selected
        background: rgb(1, 41, 64)

      &__icon
        margin-right: 5px

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

      .fa.fa-caret-down,
      .fa.fa-caret-right
        color: #adadad
        padding-right: 5px

  for num in 1..6
    .depth-{num}
      padding-left 20px * num
</style>
