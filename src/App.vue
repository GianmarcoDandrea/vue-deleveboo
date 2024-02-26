<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import Cart from './components/Cart.vue';


export default {
  data(){
    return {}
  },
  methods: {
    addToCart(food_item) {
      const existingItem = this.store.cart.find((item) => item.id === food_item.id);
      if (existingItem) {
        existingItem.count++;
      } else {
        const newItem = { ...food_item, count: 1 };
        this.store.cart.push(newItem);
      }
      if (
        this.selectedRestaurant && this.selectedRestaurant.id === food_item.restaurantId
      ) {
        this.selectedRestaurant.food_items = this.selectedRestaurant.food_items.map((d) => {
          if (d.id === food_item.id) {
            return { ...d, count: existingItem ? existingItem.count : 1 };
          }
          return d;
        }
        );
      }
      this.saveCartToLocalStorage();
      this.$emit('cart-item-added', item);
    },
    removeFromCart(food_item) {
      const index = this.store.cart.findIndex((cartItem) => cartItem.id === food_item.id);
      if (index !== -1) {
        const currentItem = this.store.cart[index];

        if (currentItem.count > 1) {
          currentItem.count--;
        } else {
          this.store.cart.splice(index, 1);
        }
      }
      this.saveCartToLocalStorage();
    },
    clearCart() {
      this.store.cart = [];
      this.saveCartToLocalStorage();
    },
    loadCartFromLocalStorage() {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        this.store.cart = JSON.parse(cartData);
      }
    },
    saveCartToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.store.cart));
    },
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
