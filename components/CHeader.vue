<template>
    <section class="header__wrapper">
        <header class="grad-radial-primary text-white fixed text-2xl w-full top-0">
            <div class="container justify-between relative z-10">
                <div class="social-networks flex-1 flex items-center">
                    <CMenuItem :items="menus['redes-sociais'].items" :icon="true" parent="0"></CMenuItem>
                </div>
                <h1 class="logo flex-1 flex justify-center pb-4">
                    <n-link to="/">
                        <img src="~assets/images/logo.svg" alt="">
                    </n-link>
                    <span class="alt-logo">Chicó vai a Xangai</span>
                </h1>
                <div class="header__toggles text-right flex-1 flex justify-end items-center">
                    <a href="javascript:void(0);" @click="active = active == 'search' ? false : 'search'" class="p-6">
                        <i :class="`fas fa-${active != 'search' ? 'search' : 'times'}`"></i>
                    </a>
                    <a href="javascript:void(0);" @click="active = active == 'menu' ? false : 'menu'" class="p-6">
                        <i :class="`fas fa-${active != 'menu' ? 'bars' : 'times'}`"></i>
                    </a>
                </div>
            </div>
        </header>

        <nav class="menu__wrapper" v-if="active == 'menu'" @click="active = false">
            <nav class="container menu menu-principal" v-if="menus && Object.keys(menus).indexOf('menu-principal') > -1">
                <CMenuItem :items="menus['menu-principal'].items" parent="0"></CMenuItem>
            </nav>

            <div class="container menu social-networks">
                <p class="text-center"><strong> Siga-nos nas redes sociais </strong></p>
                <CMenuItem :items="menus['redes-sociais'].items" :icon="true" parent="0"></CMenuItem>
            </div>
        </nav>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import CMenuItem from './CMenuItem.vue';

@Component({
    components : { CMenuItem }
})
export default class CHeader extends Vue {
  active : boolean = false
  menus = this.$store.state.menus
}
</script>

<style lang="scss" scoped>
    .header__wrapper {
        margin-bottom: 87px;
    }

    header { 
        box-shadow: 0px 3px 6px #00000029; 
    }

    header:before{
        content : '';
        background-image: url('~assets/images/logo-shape.png');
        position: absolute;
        left: 50%;
        bottom: 6px;
        transform: translate(-50%, 100%);
        background-size: cover;
        width: 130px;
        height: 50px;

        @screen lg {
            width: 150px;
        }
    }

    .logo {
        margin: 15px 0 -50px 5px;
        img { 
            max-width: 65px; 
            
            @screen lg {
                max-width: none; 
            }
        }
            
        .alt-logo { font-size: 0; }
    }

    .social-networks /deep/ {
        ul { 
            display: flex;
         }
    }

    .menu {
        max-width: 850px;
        border-bottom: 1px solid black;
        padding-bottom: 15px;

        @screen sm { max-width: calc(100% - 30px); }

        &:last-child { border-bottom: none; }

        &__wrapper {
            position: fixed;
            width: 100vw;
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            top: 90px;
            z-index: 9;

            background: LInear-gradient(whitesmoke,  rgba(245, 245, 245, 0.95));
            box-shadow: 0 10px 10px 0px #00000026;
            backdrop-filter: blur(3px);

            transform: translateY(-120px);
            transition: all .6s;
            opacity: 0;
            pointer-events: none;

            @screen sm {
                top: 65px;
                justify-content: flex-start;
                overflow-y: auto;
                padding-top: 40px;
            }

            &.active {
                height: 500px;
                pointer-events: all;
                opacity: 1;
                transform: translateY(0);

                @screen sm {
                    height: 80vh;
                }
            }

            .brand-links {
                padding-bottom: 10px;
                margin: 20px auto 16px auto;
                max-width: calc(100% - 30px);
                display: flex;
                flex-wrap: wrap;
                text-align: center;

                a {
                    flex: 0 0 100%;
                    max-width: 100%;
                    padding: 4px;
                    text-transform: uppercase;
                    font-size: 14px;
                }
            }
        }

        &__links a {
            text-transform: uppercase;
            font-size: 14px !important;
            margin: 0 15px;
        }
    }
</style>