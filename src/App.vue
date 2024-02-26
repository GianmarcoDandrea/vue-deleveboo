<script>
import AppHeader from './components/AppHeader.vue';
import HomePage from './pages/HomePage.vue';
import RestaurantsList from './pages/RestaurantsList.vue';
import AppFooter from './components/AppFooter.vue';


export default {
  data(){
    return {}
  },
  components: {
    HomePage,
    AppHeader,
    RestaurantsList,
    AppFooter
}
}

</script>

<template>
  <AppHeader />
  <HomePage />
  <RestaurantsList />
  <AppFooter />
</template>

<style lang="scss">
@use './style/general.scss' as *;
@import '@fortawesome/fontawesome-free/css/all.css';
</style>
