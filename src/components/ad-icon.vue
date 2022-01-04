<template>
  <span class="iconfont" :class="`icon-${name}`" :style="style" />
</template>

<script>
export default {
  name: 'AdIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    style: {
      type: Object,
      default: () => {}
    }
  }
}

</script>

<style lang="less" scoped>
.iconfont {
  font-size: 16px;
}
</style>
