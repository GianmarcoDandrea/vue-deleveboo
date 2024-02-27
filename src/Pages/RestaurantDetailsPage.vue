<script>
import axios from 'axios';
import { store } from '../store';
import { router } from '../router';
import Cart from '../components/Cart.vue'


export default {
    inject: ['providedMethod', 'providedAddToCart', 'providedRemoveFromCart', 'providedClearCart', 'providedSaveCartToLocalStorage', 'providedLoadCartFromLocalStorage'],
    data() {
        return {
            store,
            isLoading: true,
            food_items: [],
            selectedRestaurantId: null,
            selectedRestaurant: [],
            cart: JSON.parse(localStorage.getItem('cart')) || [],
        };
    },
    created() {
        // this.providedLoadCartFromLocalStorage();
        console.log(`${store.baseUrl}/api/restaurant/${this.$route.params.slug}`);
        axios.get(`${store.baseUrl}/api/restaurant/${this.$route.params.slug}`)
            .then((resp) => {
                this.selectedRestaurant = resp.data.results;
                this.selectedRestaurantId = this.selectedRestaurant.id;
                this.foodItemsId = this.selectedRestaurant.food_items.restaurant_id;
                console.log(this.food_itemsId);
                console.log(this.selectedRestaurantId);
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
    mounted(){

        this.providedMethod(); // debug
        this.providedSaveCartToLocalStorage();
        this.providedLoadCartFromLocalStorage();
    },
    methods: {
        addFoodToCart(food_item) {
            if (this.cart.length > 0 && this.cart[0].restaurant_id !== food_item.restaurant_id) {
        console.log('finalizza l ordine');
            } else {

                this.providedAddToCart(food_item);
                this.providedSaveCartToLocalStorage();
                console.log('aggiunto', food_item.name);
            }
            
        },
        removeFoodFromCart(food_item){
            this.providedRemoveFromCart(food_item)
            console.log('rimosso', food_item.name)
        },
        clearedFromCart(food_item){
            this.providedClearCart(food_item);
            console.log('cancellato')
        },
    },
     components: {
        Cart
    },

}
</script>

<template>
    <div class="container p-5 mt-4">
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <img :src="selectedRestaurant.image" alt="">
                    <div class="card-body">
                        <h5 class="card-title">{{ selectedRestaurant.name }}</h5>
                        <!-- <div v-if="selectedRestaurant.cusine_types && selectedRestaurant.cusine_types.length > 0"> -->
                            <h6>Tipologie:</h6>
                            <ul>
                                <li v-for="cusine_type in selectedRestaurant.cusine_types" :key="cusine_type.id">{{
                                    cusine_type.name }}</li>
                            </ul>
                        <!-- </div> -->
                        <!-- <div v-else>
                            <h6>Nessuna tipologia specificato</h6>
                        </div> -->

                        <h6 class="card-subtitle mb-2">Tipo: {{ selectedRestaurant.cusine_types ? selectedRestaurant.cusine_types.name
                            : 'Nessuna tipologia specificato' }} </h6>
                        <li> Indirizzo: <strong> {{ selectedRestaurant.address }}</strong></li>
                        <li> Telefono: <strong> {{ selectedRestaurant.phone_number }}</strong></li>
                        <li> Apertura: <strong> {{ selectedRestaurant.opening_time }}</strong></li>
                        <li> Chiusura: <strong> {{ selectedRestaurant.closing_time }}</strong></li>
                        <li> Chiuso: <strong> {{ selectedRestaurant.closure_day }}</strong></li>
                        <li> Partita Iva: <strong> {{ selectedRestaurant.vat_number }}</strong></li>

                    </div>
                </div>
            </div>
        </div>

        <div class="col-6">
            <div class="card" style="width: 100">
                <div class="card-body">
                    <h5 class="card-title">{{ selectedRestaurant.name }}</h5>
                    <h6 class="card-subtitle mb-2">Tipo: {{ selectedRestaurant.cusine_types ? selectedRestaurant.cusine_types.name :
                        'Nessuna tipologia specificato' }} </h6>
                    <div v-if="selectedRestaurant.food_items.length > 0">
                        <h6>Menu:</h6>
                        <ul class="list-unstyled">
                            <li v-for="food_item in selectedRestaurant.food_items" :key="food_item.id">
                                <span class="item-name-price"> {{ food_item.name }} <strong> € {{ food_item.price
                                }}</strong></span>
                                <span class="text-muted item-description">
                                    {{ food_item.description }}
                                </span>
                                <div class="btn-wrapper">
                                    <button class="btn btn-success" @click="addFoodToCart(food_item)">+</button>
    <button class="btn btn-danger" @click="removeFoodFromCart(food_item)"> - </button>
                                </div>


                            </li>
                        </ul>
                        <Cart :cart-items="cart" @cart-item-added="providedAddToCart" @cart-item-removed="removeFoodFromCart" />
                    </div>

                    <div v-else>
                        <p>Nessun Piatto presente</p>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.container {
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}



h2 {
    color: #343a40;
    margin-bottom: 20px;
}

.card {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}

.card-title {
    color: #007bff;
    font-size: 1.5rem;
}

.card-subtitle {
    font-size: 1rem;
    color: #6c757d;
}

.card-body {
    padding: 20px;
}

.spinner-border {
    width: 3rem;
    height: 3rem;
    border-width: 4px;
}

ul {
    padding-left: 0;
    list-style-type: none;
}

li {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;

    .item-name-price {
        display: flex;
        justify-content: space-between;
    }

    .item-description {
        margin-left: 1rem;
        font-size: 0.8rem;
    }

    &:hover {
        background-color: rgba(123, 123, 122, 0.262);
    }
}

input[type="number"] {
    border: 1px solid #ced4da;
    border-radius: 4px;
    padding: .375rem .75rem;
    margin-right: 10px;
}



p {
    color: #6c757d;
}
</style>
