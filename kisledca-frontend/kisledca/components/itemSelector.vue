<script setup lang="ts" generic="T">
import { isNil } from 'lodash';
const props = defineProps<{
    items: T[],
    determineSelected: (item: T) => boolean,
    titleExtractor: (item: T) => string,
    idExtractor: (item: T) => string | number,
    tooltipExtractor?: (item: T) => string,
}
>()
const emit = defineEmits<(e: "select", selectedId: string | number) => void>()
</script>
<template>
    <div class="tw-flex tw-gap-2 ">
        <template v-for="item in items">
            <v-chip color="primary" v-if="determineSelected(item)" class="tw-flex-none">
                <v-icon start icon="mdi-check-circle-outline"></v-icon>
                {{
                    props.titleExtractor(item) }}
                <v-tooltip v-if="!isNil(props.tooltipExtractor)" activator="parent" location="bottom"
                    :text="props.tooltipExtractor(item)"></v-tooltip>
            </v-chip>
            <v-chip color="secondary" v-else @click='emit("select", props.idExtractor(item))' class="tw-flex-none">{{
                props.titleExtractor(item)
            }}
                <v-tooltip v-if="!isNil(props.tooltipExtractor)" activator="parent" location="bottom"
                    :text="props.tooltipExtractor(item)"></v-tooltip>
            </v-chip>
        </template>
    </div>
</template>