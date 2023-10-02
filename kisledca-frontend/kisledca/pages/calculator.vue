<script setup lang="ts">
import ItemSelector from "~/components/itemSelector.vue";
import { ECurrency, ITaxTips, ETipsCalMethod } from '../plugins/store/calculator';
definePageMeta({
  middleware: 'load-store-middleware'
})
const validInputRegex = /^(\d+|\d+\.|\.\d+|\.|\d+\.\d+)$/
const { $store } = useNuxtApp()

const onInput = (e: string) => {
  let preupdate = String($store.state.calculator.input)
  if (e === "<") {
    preupdate = preupdate.slice(0, -1)
    $store.commit('calculator/updateInput', preupdate)
  }
  else if (e === "C") {
    preupdate = ""
    $store.commit('calculator/updateInput', preupdate)

  } else {
    preupdate = `${preupdate}${e}`
    if (validInputRegex.test(preupdate)) {
      $store.commit('calculator/updateInput', preupdate)
    }
  }
}
const onSelectTax = (selectedId: string | number) => {
  $store.commit('calculator/selectTax', selectedId)
}
const onSelectTips = (selectedId: string | number) => {
  $store.commit('calculator/selectTips', selectedId)
}
const updateSrcCurrency = (selectedId: ECurrency) => {
  $store.commit('calculator/updateSrcCurrency', selectedId)
}
const updateTargetCurrency = (selectedId: ECurrency) => {
  $store.commit('calculator/updateTargetCurrency', selectedId)
}
const tax = computed<number>(() => {
  const taxRateOrFee = $store.getters['calculator/getTaxRateOrFee']
  if (taxRateOrFee.mode === "rate") {
    return taxRateOrFee.value * $store.getters['calculator/getNumericInput']
  } else {
    return taxRateOrFee.value
  }
})
const taxCurrency = computed<number>(() => {
  return tax.value * $store.getters['calculator/conversionRate']
})
const tips = computed<number>(() => {
  const taxRateOrFee = $store.getters['calculator/getTipsRateOrFee']
  if ($store.state.calculator.tipsMode === ETipsCalMethod.BEFORE_TAX) {

    if (taxRateOrFee.mode === "rate") {
      return taxRateOrFee.value * $store.getters['calculator/getNumericInput']
    } else {
      return taxRateOrFee.value
    }
  } else {
    if (taxRateOrFee.mode === "rate") {
      return taxRateOrFee.value * (tax.value + $store.getters['calculator/getNumericInput'])
    } else {
      return taxRateOrFee.value
    }
  }
})
const tipsCurrency = computed<number>(() => {
  return tips.value * $store.getters['calculator/conversionRate']
})
const total = computed<number>(() => {
  return $store.getters['calculator/getNumericInput'] + tax.value + tips.value
})
const totalCurrency = computed<number>(() => {
  return total.value * $store.getters['calculator/conversionRate']
})
const inputCurrency = computed<number>(() => {
  return $store.getters['calculator/getNumericInput'] * $store.getters['calculator/conversionRate']
})
</script>
<template>
  <div class="tw-flex tw-flex-col tw-p-4">
    <div class="tw-flex-1 tw-p-4 tw-outline tw-outline-1 tw-outline-white tw-rounded-xl">
      <div class="tw-w-full tw-flex tw-gap-4">
        <!-- placeholder -->
        <p class="tw-text-center tw-flex-1">Currency</p>
        <p class="tw-text-center tw-flex-1">{{ $store.state.calculator.srcCurrency }}</p>
        <p class="tw-text-center tw-flex-1">{{ $store.state.calculator.targetCurrency }}</p>
      </div>
      <hr />
      <div class="tw-w-full tw-flex tw-gap-4">
        <!-- input -->

        <p class="tw-text-center tw-flex-1">Input</p>
        <p class="tw-text-center tw-flex-1 tw-font-bold">{{ $store.state.calculator.input || "0.00" }}</p>
        <p class="tw-text-center tw-flex-1">{{ inputCurrency.toFixed(2) }}</p>
      </div>
      <hr />

      <div class="tw-w-full tw-flex tw-gap-4">
        <!-- tax -->
        <p class="tw-text-center tw-flex-1">Tax</p>
        <p class="tw-text-center tw-flex-1 tw-font-bold">{{ tax.toFixed(2) }}</p>
        <p class="tw-text-center tw-flex-1">{{ taxCurrency.toFixed(2) }}</p>
      </div>
      <hr />

      <div class="tw-w-full tw-flex tw-gap-4">
        <!-- tips -->
        <p class="tw-text-center tw-flex-1">Tips</p>
        <p class="tw-text-center tw-flex-1 tw-font-bold">{{ tips.toFixed(2) }}</p>
        <p class="tw-text-center tw-flex-1">{{ tipsCurrency.toFixed(2) }}</p>
      </div>
      <hr />

      <div class="tw-w-full tw-flex tw-gap-4">
        <!-- total -->
        <p class="tw-text-center tw-flex-1">Total</p>
        <p class="tw-text-center tw-flex-1 tw-font-bold">{{ total.toFixed(2) }}</p>
        <p class="tw-text-center tw-flex-1">{{ totalCurrency.toFixed(2) }}</p>
      </div>
    </div>
    <div class="tw-flex-1 tw-p-4 tw-gap-4 tw-flex tw-flex-col">
      <div class="tw-flex tw-flex-col tw-gap-2">
        <!-- selector -->
        <div class="tw-flex tw-flex-wrap tw-gap-2">
          <div class="tw-w-full lg:tw-w-[calc(50%-5rem)]">
            <p>Src Currency:</p>
            <div class="tw-overflow-x-scroll tw-w-full">
              <PrimativeSelect :items="Object.values(ECurrency)" :selected="$store.state.calculator.srcCurrency"
                @select="updateSrcCurrency"></PrimativeSelect>
            </div>
          </div>
          <div class="tw-w-full lg:tw-w-[calc(50%-0.5rem)]">
            <p>Target Currency:</p>
            <div class="tw-overflow-x-scroll tw-w-full">
              <PrimativeSelect :items="Object.values(ECurrency)" :selected="$store.state.calculator.targetCurrency"
                @select="updateTargetCurrency"></PrimativeSelect>
            </div>
          </div>
        </div>
        <div class="tw-flex tw-gap-2 tw-items-center tw-flex-wrap">
          <p>Tax:</p>
          <div class="tw-overflow-x-scroll">

            <ItemSelector :items="($store.state.calculator.tax as ITaxTips[]).filter(e => e.shown) ?? []"
              :id-extractor="(e: ITaxTips) => e.shorthand" :determine-selected="(e: ITaxTips) => e.selected"
              :title-extractor="(e: ITaxTips) => e.shorthand" @select="onSelectTax"
              :tooltip-extractor="(e: ITaxTips) => e.description"></ItemSelector>
          </div>
        </div>
        <div class="tw-flex tw-gap-2 tw-items-center tw-flex-wrap">
          <p>Tips:</p>
          <SwitchTax></SwitchTax>
          <div class="tw-overflow-x-scroll">

            <ItemSelector :items="($store.state.calculator.tips as ITaxTips[]).filter(e => e.shown) ?? []"
              :id-extractor="(e: ITaxTips) => e.shorthand" :determine-selected="(e: ITaxTips) => e.selected"
              :title-extractor="(e: ITaxTips) => e.shorthand" @select="onSelectTips"
              :tooltip-extractor="(e: ITaxTips) => e.description"></ItemSelector>
          </div>
        </div>
      </div>
      <div>
        <!-- calculator input button -->
        <Numpad @click="onInput"></Numpad>
      </div>
    </div>
  </div>
</template>
