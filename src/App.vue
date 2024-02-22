<script>
import HomePage from "./pages/HomePage.vue";
import AppHeader from './components/AppHeader.vue';

export default {
  data(){
    return {}
  },
  components: {
    HomePage,
    AppHeader,
  }
}

</script>

<template>
  <AppHeader />
  <router-view></router-view>
</template>

<style lang="scss">
@use './style/general.scss' as *;
@import '@fortawesome/fontawesome-free/css/all.css';
</style>
