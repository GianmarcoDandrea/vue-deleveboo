<script>
import AppHeader from './components/AppHeader.vue';
import HomePage from './pages/HomePage.vue';
import AppFooter from './components/AppFooter.vue';


export default {
  data(){
    return {}
  },
  components: {
    HomePage,
    AppHeader,
    AppFooter
}
}

</script>

<template>
  <AppHeader />
  <router-view></router-view>
  <AppFooter />
</template>

<style lang="scss">
@use './style/general.scss' as *;
@import '@fortawesome/fontawesome-free/css/all.css';
</style>
