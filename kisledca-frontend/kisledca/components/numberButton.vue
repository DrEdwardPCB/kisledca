<script setup lang="ts">
  import { twMerge, ClassNameValue } from 'tailwind-merge';
  import { useAttrs, computed } from 'vue';

  const props = defineProps<{
    displayNumber:string
  }>()
  const emit = defineEmits<{(e:'click',displayNumber:string):void}>()
  const onKeyDown=(e:KeyboardEvent)=>{
    if(e.key==="displayNumber"){
      emit("click",props.displayNumber)
    }
  }
  const attr = useAttrs()
	const twClass = computed(()=>twMerge("btn rounded", attr.class as ClassNameValue))
  console.log(attr.class)
</script>
<template>
  <button :class="twClass" @click='emit("click",props.displayNumber)' @keydown="onKeyDown">{{props.displayNumber}}</button>
</template>
