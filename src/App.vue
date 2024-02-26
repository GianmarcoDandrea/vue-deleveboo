<script>
import AppHeader from './components/AppHeader.vue';
import HomePage from './pages/HomePage.vue';


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
  <HomePage />
</template>

<style lang="scss">
@use './style/general.scss' as *;
@import '@fortawesome/fontawesome-free/css/all.css';
</style>
