<script setup lang="ts" generic="T">
const props = defineProps<{
    items: T[],
    selected: T
}
>()
const emit = defineEmits<(e: "select", selectedId: T) => void>()

</script>
<template>
    <div class="tw-flex tw-gap-2">
        <template v-for="item in items">
            <v-chip color="primary" v-if="item === selected" class="tw-flex-none">
                <v-icon start icon="mdi-check-circle-outline"></v-icon>
                {{ item }}
            </v-chip>
            <v-chip color="secondary" v-else @click='emit("select", item)' class="tw-flex-none">{{ item }}
            </v-chip>
        </template>
    </div>
</template>