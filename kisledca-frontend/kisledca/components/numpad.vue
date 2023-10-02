<script setup lang="ts">
import NumberButton from './numberButton.vue';

  const numeric=["7","8","9","4","5","6","1","2","3",".","0"]
  const functional=["<","C"]
  const emit = defineEmits<{(e:'click', button:string):void}>()
</script>
<template>
  <div class="tw-grid tw-gird-cols-4 tw-grid-rows-4 tw-gap-4">
    <div class="tw-gap-4 tw-grid tw-grid-cols-3 tw-col-span-3 tw-grid-rows-4 tw-row-span-4">
      <template v-for="num in numeric">
        <NumberButton class="tw-bg-primary" :display-number="num" @click="(e)=>emit('click',e)" />
      </template>
    </div>
    <div class="tw-grid tw-grid-cols-1 tw-col-span-1 tw-col-start-4 tw-grid-rows-4 tw-row-span-4 tw-gap-4">
      <template v-for="fun in functional">
        <NumberButton class="tw-bg-secondary" :display-number="fun" @click="(e)=>emit('click',e)" />
      </template>
    </div>
  </div>
</template>
