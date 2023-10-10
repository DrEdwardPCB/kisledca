<script setup lang="ts">
definePageMeta({
    middleware: 'load-store-middleware'
})
const { $store } = useNuxtApp()
function onResetCalculatorStorage() {
    $store.commit("calculator/factoryReset")
}
</script>
<template>
    <div class="tw-w-full tw-p-4 tw-flex tw-justify-between">
        <p>reset calculator stored data</p>
        <button class="tw-btn tw-btn-primary" @click="onResetCalculatorStorage">
            reset
        </button>
    </div>
    <hr />
</template>