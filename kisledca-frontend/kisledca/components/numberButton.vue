<script setup lang="ts">
  import useTwMerge from './composables/useTwMerge';
  import useHotKey from './composables/useHotKey';

  const props = defineProps<{
    displayNumber:string
    hotkey?:string
  }>()
  const emit = defineEmits<{(e:'click',displayNumber:string):void}>()
  function emitHandler(e:Event){
    emit("click",props.hotkey??props.displayNumber)
  }
  useHotKey(props.hotkey??props.displayNumber,emitHandler)
  const {twClass} = useTwMerge("tw-btn tw-rounded")
</script>
<template>
  <button :class="twClass" @click='emit("click",props.displayNumber)' >{{props.displayNumber}}</button>
</template>
