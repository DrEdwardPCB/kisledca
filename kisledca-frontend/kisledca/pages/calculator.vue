<script setup lang="ts">
  import {ref} from "vue"
  const validInputRegex = /^(\d+|\d+\.|\.\d+|\.|\d+\.\d+)$/
  const {$store} = useNuxtApp()
  const onInput = (e:string)=>{
    let preupdate = String($store.state.calculator.input)
    if(e==="<"){
      preupdate = preupdate.slice(0,-1)
      $store.commit('calculator/updateInput',preupdate)
    }
    else if(e==="C"){
      preupdate = ""
        $store.commit('calculator/updateInput',preupdate)

    }else{
      preupdate = `${preupdate}${e}`
      if(validInputRegex.test(preupdate)){
        $store.commit('calculator/updateInput',preupdate)
      }
    }
  }
</script>
<template>
  <div class="p-4 flex flex-col">
    <div class="flex-1 outline-1 outline-white rounded-xl p-4">
      <div class = "w-full">
        <!-- placeholder -->
      </div>
      <div class = "w-full">
        <!-- input -->
        <div class="outline-1 outline-white rounded p-4">
          <p>{{$store?.state?.calculator?.input??""}}</p>
        </div>
      </div>
      <div class = "w-full">
        <!-- tax -->
      </div >
      <div class = "w-full">
        <!-- tips -->
      </div>
      <div class = "w-full">
        <!-- total -->
      </div>
    </div>
    <div class = "flex-1 p-4">
      <div>
        <!-- selector -->
      </div>
      <div>
        <!-- calculator input button -->
        <Numpad @click="onInput"></Numpad>
      </div>
    </div>
  </div>
</template>
