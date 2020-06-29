<template>
  <header class="grad-radial-primary text-white fixed w-full">
        <div class="container justify-between relative z-10">
            <div class="social-networks">
                <a href=""></a>
            </div>
            <h1 class="logo">
                <n-link to="/">
                    <img src="~assets/images/logo.svg" alt="">
                </n-link>
                <span class="alt-logo">Chicó vai a Xangai</span>
            </h1>
            <div class="menu">

            </div>
        </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// Define the component in class-style
@Component
export default class Header extends Vue {
  // Class properties will be component data
  count = 0

  // Methods will be component methods
  increment() {
    this.count++
  }

  decrement() {
    this.count--
  }
}
</script>

<style lang="scss" scoped>
    header { box-shadow: 0px 3px 6px #00000029; }

    header:before{
        content : '';
        background-image: url('~assets/images/logo-shape.png');
        position: absolute;
        left: 50%;
        bottom: 6px;
        transform: translate(-50%, 100%);
        background-size: cover;
        width: 150px;
        height: 50px;
    }

    .logo {
        margin: 15px 0 -50px 5px;
            
        .alt-logo { font-size: 0; }
    }
</style>