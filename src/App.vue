<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import Cart from './components/Cart.vue';


export default {
  data(){
    return {}
  },
  components: {
    AppHeader,
    AppFooter,
    Cart
}
}

</script>

<template>
  <AppHeader />
  <Cart />

  <router-view></router-view>
  
  <AppFooter />
</template>

<style lang="scss">
@use './style/general.scss' as *;
@import '@fortawesome/fontawesome-free/css/all.css';
</style>
