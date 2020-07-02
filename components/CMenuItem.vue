<template>
    <ul :class="{ 'parent' : parent == '0' }" v-if="items && filteredItems.length">
        <li v-for="item in filteredItems" :key="item.ID">
            <a :href="item.permalink" :target="getTarget(item.permalink)" v-html="getItemHtml(item)" ></a>
            <CMenuItem :items="items" :icon="icon" :parent="item.ID"></CMenuItem>
        </li>
    </ul>
</template>

<script lang='ts'>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import CMenuItemChild from './CMenuItem.vue';

class MenuItem {
    parent !: String | Number
    title !: String
    slug !: String
    permalink !: String
}

@Component({
    name : 'CMenuItem',
    components : { CMenuItemChild },
})
export default class CMenuItem extends Vue{
    @Prop() items!: Array<MenuItem>
    @Prop() parent!: String
    @Prop() icon!: Boolean
    
    get filteredItems() {
        return this.items ? this.items.filter( i => i.parent == this.parent ) : []
    }
    
    getItemHtml( item : MenuItem ) : String {
        if (!this.icon) {
            return item.title
        }

        let iconRepo = [ 'facebook', 'twitter', 'youtube', 'spotify', 'instagram', 'amazon', 'itunes', 'github', 'linkedin', 'pinterest', 'slack', 'snapchat', 'whatsapp', 'telegram' ]
        let icon = iconRepo.filter( i => i == item.slug)
        return icon.length ? `<i class="fab fa-${icon}"></i>` : item.title
    }

    getTarget( url : String ) {
        if(process.browser) {
            return url.indexOf(window.location.host) > -1 || url.indexOf('/') == 0 ? '_self' : '_blank'
        }
    }
}
</script>

<style lang="scss" scoped>
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        text-align: center;

        li a { 
            font-weight: 400; 
            padding: 5px 0;
            display: inline-block;

            i { font-size: 23px !important; }
        }

        &.parent {
            > li { margin: 0 10px; }
            > li > a {
                font-weight: 700;
                font-size: 19px;
            }
        }
    }
</style>