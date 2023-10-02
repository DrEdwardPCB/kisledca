
<template>
    <slot />
    <v-bottom-navigation>
        <nuxt-link to="/calculator">
            <v-btn value="recent">
                <v-icon>mdi-calculator</v-icon>
                <span>Currency Calc</span>
            </v-btn>
        </nuxt-link>
        <nuxt-link to="/settings/calculator">
            <v-btn value="favorites">
                <v-icon>mdi-cog</v-icon>
                <span>Settings</span>
            </v-btn>
        </nuxt-link>
    </v-bottom-navigation>
</template>