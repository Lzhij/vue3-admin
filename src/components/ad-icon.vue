<template>
  <span class="iconfont" :class="`icon-${name}`" :style="{ fontSize: size }" />
</template>

<script>
export default {
  name: 'AdIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#666'
    },
    size: {
      type: String,
      default: '16px'
    }
  }
}

</script>

<style lang="less" scoped>
.iconfont {
  color: v-bind(color)
}
</style>
