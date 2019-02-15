<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
       preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="640" height="640">
    <defs>
      <path d="M289.52 0L589.25 0L589.25 339.2L50.75 339.2L50.75 240.72L289.52 240.72L289.52 240.72L289.52 0ZM264.12 0L264.12 207.9L50.75 207.9L50.75 207.9L264.12 0Z"
            :id="id1"></path>
      <path d="M0 328.2L640 328.2L640 640.15L0 640.15L0 328.2Z" :id="id2"></path>
      <text :id="id3" x="167.83" y="326.52" font-size="272" font-family="Roboto" font-weight="normal"
            font-style="normal" letter-spacing="0" alignment-baseline="before-edge"
            transform="matrix(1 0 0 1 -174.26941123698907 -12.072714068954156)" style="line-height:100%"
            xml:space="preserve" dominant-baseline="text-before-edge"><tspan x="167.83" dy="0em" alignment-baseline="before-edge" dominant-baseline="text-before-edge" text-anchor="start">{{ extension }}</tspan></text>

    </defs>
    <g>
      <g>
        <g>
          <use :xlink:href="`#${id1}`" opacity="1" fill="#87939a" fill-opacity="1"></use>
        </g>
        <g>
          <use :xlink:href="`#${id2}`" opacity="1" :fill="color" fill-opacity="1"></use>
        </g>
        <g>
          <use :xlink:href="`#${id3}`" opacity="1" fill="#3b3b3b" fill-opacity="1"></use>
        </g>
      </g>
    </g>
  </svg>
</template>



<script>
  function makeid() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  export default {
    props: {
      color: {
        type: String,
        required: true
      },
      extension: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        id1: makeid(),
        id2: makeid(),
        id3: makeid()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  svg
    cursor: default
</style>
