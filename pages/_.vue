<template>
    <div class="container page-wrapper" v-if="page">
        <div class="w-full mt-16">
            <h1 class="text-center font-display font-thin text-3xl" v-html="page.title"></h1>
            <div class="page-excerpt text-center" v-html="page.excerpt"></div>

                <div class="page-categories d-flex justify-content-center" v-if="page.type != 'page'">
                <a 
                v-for="page_category in page.categories" :key="page_category.ID"
                :href="page_category.permalink" 
                class="page-category"
                v-if="page_category && ['Saúde', 'Fitness', 'Nutrição'].indexOf(page_category.title) == -1"
                >
                {{ page_category.title }}
                </a>
            </div>

            <div class="page-meta text-center" v-if="page.type != 'page'">
                por <span v-html="getAuthor(page)"></span> ●  <span v-html="getDate(page.time)"></span>
            </div>
            <div class="page-content">
                <img class="page-image mb-4" v-if="page.thumbnail && page.thumbnail.file" :src="page.thumbnail.file" alt="">
                <v-runtime-template :template="`<article>${page.content}</article>`"></v-runtime-template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import { $gutenberg } from '~/dom.js'
import { pages, head, postInfos } from '~/mixins'
import VRuntimeTemplate from "v-runtime-template"

import CBoxProfile from '~/components/CBoxProfile.vue'

@Component({
    components : { CBoxProfile, VRuntimeTemplate },
    mixins : [ pages, head, postInfos ] 
})
export default class Post extends Vue {
    @Prop() cover!: String
    @Prop() permalink!: String

    async asyncData( context : any ) {
        return await pages.methods.fetchJSON(context);
    } 

    layout({ store } : any) { 
        return store.state.page.type
    }

    // head() {
    //     return head.methods.head(this.$store.state)
    // }

    mounted () {
        // this.$store.commit( 'SET_HEADER_COLOR', '#F5F5F5' )
        // if( $nuxt.layoutName != this.$store.state.page.type ) {
        //     $nuxt.setLayout(this.$store.state.page.type)
        // }
        $gutenberg()
    }
}
</script>

<style>
</style>
