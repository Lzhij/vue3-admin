<template>
  <component :is="curIcon" />
</template>
<script>
export default {
  name: 'AIcon'
}
</script>

<script setup>
import { defineProps, createVNode, computed } from 'vue'
import * as icons from '@ant-design/icons-vue'

const props = defineProps({
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
})


const curIcon = computed(() => createVNode(icons[props.name], { style: { color: props.color, fontSize: props.size } }))
</script>

<style lang="less" scoped></style>
