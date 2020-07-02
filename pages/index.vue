<template>
    <div class="container">
      <v-runtime-template :template="'<div class=col-md-12>'+$store.state.page.content+'</div>'"></v-runtime-template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import api from '../api'

import VRuntimeTemplate from "v-runtime-template"

@Component({
    components : { VRuntimeTemplate }
})
export default class Index extends Vue {

    async asyncData( { store } : any ) {
        let fetchedContent: any[] = [];

        const page = await api.get(store.state.blog.homepage_json)
        await store.commit('SET_PAGE', page)
        await store.commit('CLEAR_CONTENT')

        if(typeof page === 'object' && Object.keys(page).indexOf('scripts') > -1 && page.scripts) {
            await Promise.all(Object.keys(page.scripts).map( async hash => {
                if( Object.keys(page.scripts[hash]).indexOf('relations') > -1 ) {
                    const relations = page.scripts[hash].relations;

                    await Promise.all(relations.map( async (url : string) => {
                        if(fetchedContent.indexOf(url) == -1) {
                            fetchedContent = [...fetchedContent, url ]

                            let content = await api.get(`${url.charCodeAt(0)}/${url.charCodeAt(1)}/${url}.json`)
                            await store.commit('ADD_CONTENT', content)
                        }
                    } ))
                }
            }))
        }
    }

    head() {
        return {
            title: this.$store.state.blog.title,
            meta: [
                { hid: 'description', name: 'description', content: this.$store.state.blog.description }
            ]
        }
    }

    mounted () {
        this.$store.state.blog.header.css.map( (path : string) => {
            this.createLinkTag({
                as : 'style',
                rel : 'stylesheet preload prefetch',
                href : path,
                type : 'text/css',
                crossorigin : "anonymous",
            })
        } )

        this.createStylesTag( this.$store.state.blog.header.styles )
    }

    createLinkTag( props : any ) {
        let link : any = document.createElement('link');

        link.id = `link_${Math.floor(Math.random() * 100)}`

        if(props) {
            Object.keys(props).map((key : string) => {
                link[key] = props[key]
            })
        }

        document.head.appendChild(link);
    }

    createStylesTag( styles : string ) {
        let head = document.head || document.getElementsByTagName('head')[0], style = document.createElement('style');

        style = document.createElement('style');
        head.appendChild(style);
        style.type = 'text/css';
        style.appendChild(document.createTextNode(styles));
    }
}
</script>


<style lang='scss' scoped>
</style>