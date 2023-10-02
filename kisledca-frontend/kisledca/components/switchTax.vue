import { ETipsCalMethod } from '../plugins/store/calculator';
<script setup lang="ts">
import { ETipsCalMethod } from "../plugins/store/calculator"
const { $store } = useNuxtApp()
const toggle = ref(0)
watchEffect(() => {
    if (toggle.value === 0) {
        $store.commit("calculator/updateTipsMode", ETipsCalMethod.BEFORE_TAX)
    } else {
        $store.commit("calculator/updateTipsMode", ETipsCalMethod.AFTER_TAX)
    }
    console.log($store.state.calculator.tipsMode)
})
</script>
<template>
    <v-btn-toggle v-model="toggle" shaped mandatory>
        <v-btn>
            <v-tooltip activator="parent" location="left" text="calculate tips based on before tax value"></v-tooltip>
            <v-icon>mdi-currency-usd-off</v-icon>
            <p>Before Tax</p>
        </v-btn>

        <v-btn>
            <v-tooltip activator="parent" location="right" text="calculate tips based on after tax value"></v-tooltip>
            <v-icon>mdi-currency-usd</v-icon>
            <p>After Tax</p>
        </v-btn>
    </v-btn-toggle>
</template>