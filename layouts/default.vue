<template>
    <div>
        <CHeader></CHeader>
        <Nuxt />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CHeader from '~/components/CHeader.vue'

export default Vue.extend({
    components :  { CHeader }
})
</script>

<style lang="scss">
</style>
