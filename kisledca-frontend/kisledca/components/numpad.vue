<script setup lang="ts">
import NumberButton from './numberButton.vue';

  const numeric=["7","8","9","4","5","6","1","2","3",".","0"]
  const functional=["<","C"]
  const emit = defineEmits<{(e:'click', button:string):void}>()
</script>
<template>
  <div class="grid gird-cols-4 grid-rows-4 gap-4">
    <div class="grid grid-cols-3 grid-rows-4 col-span-3 row-span-4 gap-4">
      <template v-for="num in numeric">
        <NumberButton class="bg-primary" :display-number="num" @click="(e)=>emit('click',e)" />
      </template>
    </div>
    <div class="grid grid-cols-1 grid-rows-4 col-span-1 row-span-4 gap-4 col-start-4">
      <template v-for="fun in functional">
        <NumberButton class="bg-secondary" :display-number="fun" @click="(e)=>emit('click',e)" />
      </template>
    </div>
  </div>
</template>
