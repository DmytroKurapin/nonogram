<script setup>
import { ref } from 'vue'
import SvgPreview from './SvgPreview.vue'


defineProps({
  msg: String,
})

// const count = ref(0)
const svgHtml = ref('')
const openFile = ({ target }) => {
  const fileTypes = ['svg'];

  if (target.files && target.files[0]) {
    const extension = target.files[0].name.split('.').pop().toLowerCase(),
      isSuccess = fileTypes.indexOf(extension) > -1;

    if (isSuccess) {
      const reader = new FileReader()

      if (extension === "svg") {
        reader.onload = () => {
          svgHtml.value = reader.result
        }
        reader.readAsText(target.files[0])
      }
      else {
        // proceed the other image types
        // eslint-disable-next-line
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~')
        // eslint-disable-next-line
        console.log('incorrect image type - ', extension)
        // eslint-disable-next-line
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~')
      }
    }
    else {
      console.log('Wrong image type - ', extension)
    }
  }
}

const downloadFile = () => {
  const svgBlob = new Blob([svgHtml.value], { type:'image/svg+xml;charset=utf-8' })
  const svgUrl = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = "final.svg";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}


</script>

<template>
  <h1>{{ msg }}</h1>
  <SvgPreview v-if="svgHtml" :svg-html="svgHtml" @ready="svgHtml = $event.outerHTML"></SvgPreview>
  <input type="file" id="file-input" accept="image/*" @input="openFile($event)">
  <button @click="downloadFile">Download</button>
</template>

<style scoped>
</style>
