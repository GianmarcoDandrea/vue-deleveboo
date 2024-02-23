<script>
import axios from 'axios';
import { store } from '../store';
import { router } from '../router';
import TestCartPage from './TestCartPage.vue';

export default {
    data() {
        return {
            store,
            isLoading: true,
            curRestaurant: [],
            cart: [], 
        };
    },
    created() {
        console.log(`${store.baseUrl}/api/restaurant/${this.$route.params.slug}`);
        axios.get(`${store.baseUrl}/api/restaurant/${this.$route.params.slug}`)
            .then((resp) => {
                this.curRestaurant = resp.data.results;
                console.log(resp.data.results);
                this.isLoading = false;
                console.log(`${store.baseUrl}/api/restaurant/${this.$route.params.slug}`);
                console.log(this.$route.params.slug);
            })
            .catch((error) => {
                this.isLoading = false;
                console.log("Error:", error);

                this.$router.replace({ name: 'not-found' });
            });

    },
    methods: {
        addItemToCart(food_item) {
            const existingItem = this.cart.find(item => item.id === food_item.id);
            if (existingItem) {
               
                existingItem.quantity += parseInt(food_item.quantity, 10);
            } else {
                
                this.cart.push({
                    ...food_item,
                    quantity: parseInt(food_item.quantity, 10) || 1 
                });
            }
            console.log(this.cart); 
        }
    },
    components: {
        TestCartPage
    }
    
}
</script>

<template>
    <div class="container p-5 mt-4">
        <h2> Dettagli </h2>
        <div v-if="isLoading" class="text-center mt-3">
            <p>Caricamento in corso</p>
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">{{ curRestaurant.name }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{ curRestaurant.address }}</h6>
                    <h6 class="card-subtitle mb-2">Tipo: {{ curRestaurant.cusine_types ? curRestaurant.cusine_types.name : 'Nessuna tipologia specificato' }}.</h6>
                    <div v-if="curRestaurant.food_items.length > 0">
                        <h6>Menu:</h6>
                        <ul class="list-unstyled">
                            <li v-for="food_item in curRestaurant.food_items" :key="food_item.id">
                                
                                    {{ food_item.name }} 
                                <input type="number" v-model="food_item.quantity" min="1">
                                <button @click="addItemToCart(food_item)">Add to Cart</button>
                           
                            </li>
                        </ul>
                        <TestCartPage :add-item-to-cart="addItemToCart" :cart-items="cart" />
                    </div>
                    
                    <div v-else>
                        <p>Nessun Piatto presente</p>
                    </div>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                        card's content.</p>

                </div>
            </div>
        </div>
    </div>
    
</template>

<style lang="scss" scoped></style>