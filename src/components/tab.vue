<template>
  <div class="tab tab--selected">
    <file-icon style="height: 14px; width: 14px"/>
    <span class="tab__name">README.md</span>
    <i class="fa fa-times tab__close"></i>
  </div>
</template>

<script>
  import FileIcon from './file-icon'
  export default {
    components: {
      FileIcon
    }
  }
</script>
