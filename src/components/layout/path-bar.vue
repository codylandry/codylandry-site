<template>
  <div class="path-bar">
    <template v-for="part in pathFolders">
      <i class="fa fa-folder"></i>
      <span>{{part}}</span>
      <i class="fas fa-chevron-right"></i>
    </template>
    <file-icon style="height: 16px; width: 16px;" :extension="activeFile.extension" :color="activeFile.iconColor"></file-icon>
    <span>{{ activeFile.name }}</span>
  </div>
</template>

<script>
  import FileIcon from '../file-icon'
  export default {
    name: 'path-bar',
    components: {FileIcon},
    computed: {
      activeFile () {
        return this.$store.state.activeFile
      },
      path () {
        return (this.activeFile.path || '').split('/')
      },
      pathFolders () {
        return this.path.slice(0, this.path.length - 1)
      }
    },
    methods: {

    }
  }
</script>

<style lang="stylus" scoped>
@import "~@/stylus/variables"
.path-bar
  display flex
  align-items center
  color $lightgrey
  font-weight 300
  letter-spacing 0.4px
  font-size 12px
  height 25px
  padding-left 7px
  border-top 1px solid $lightborder

  & > span:first-of-type
    font-weight 700

  & > *
    padding-left 3px

  .fa.fa-folder
    color #87939a
    font-size 15px

  .fas.fa-chevron-right
    color $lightgrey
</style>
