<template>
    <div>
        <img :src="cover" alt="">
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CBoxProfile extends Vue {
    @Prop() cover!: String
    @Prop() permalink!: String
}
</script>

<style lang='scss' scoped>
</style>