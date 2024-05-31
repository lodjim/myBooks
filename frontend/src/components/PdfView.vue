<template>
  <div class="pdf-preview">
    <canvas ref="pdfCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import '../pdfWorker';

// Define props
const props = defineProps({
  pdfUrl: {
    type: String,
    required: true
  }
});

const pdfCanvas = ref(null);

const loadPdf = async () => {
  const loadingTask = pdfjsLib.getDocument(props.pdfUrl);
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);
  
  const scale = 1.5;
  const viewport = page.getViewport({ scale });
  
  const canvas = pdfCanvas.value;
  const context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport
  };
  await page.render(renderContext).promise;
};

onMounted(() => {
  loadPdf();
});
</script>

<style scoped>
.pdf-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
canvas {
  border: 1px solid #ccc;
}
</style>
