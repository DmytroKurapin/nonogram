<script setup>
import {ref, onMounted, onUpdated} from 'vue'
import svgParsing from '../assets/scripts/svgParsing.js'

defineProps({
  svgHtml: {
    type: String,
    default: ''
  },
})
const emit = defineEmits(['ready'])

const svgRef = ref(null)
const testTxt = ref('')

onMounted(async () => {
  testTxt.value = svgRef.value
  const newSvg = svgParsing(testTxt.value.querySelector('svg'))
  emit('ready', newSvg)
})
</script>

<template>
  <div v-html="svgHtml" ref="svgRef"></div>
</template>

<style scoped>

</style>
