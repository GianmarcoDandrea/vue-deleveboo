<script>
import axios from 'axios';
import { store } from '../store';
import { router } from '../router';
import Cart from '../components/Cart.vue'


export default {
    props: {
        // addToCart: Function,
        
        cart: {
            type: Array,
            default: () => [],
    
        },
        
    },
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
        console.log(`${store.baseUrl}/api/restaurant/${this.$route.params.slug}`);
        axios.get(`${store.baseUrl}/api/restaurant/${this.$route.params.slug}`)
            .then((resp) => {
                this.selectedRestaurant = resp.data.results;
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
    mounted() {
        this.loadCartFromLocalStorage();
    },
    computed: {
        cartTotal() {
            const totalAmount = this.store.cart.reduce(
                (total, item) => total + parseFloat(item.price * item.count),
                0
            );
            return totalAmount.toFixed(2);
        },
    },
    methods: {
        addToCart(dishe) {
            const existingItem = this.store.cart.find((item) => item.id === dishe.id);
            if (existingItem) {
                existingItem.count++;
            } else {
                const newItem = { ...dishe, count: 1 };
                this.store.cart.push(newItem);
            }

            if (
                this.selectedRestaurant &&
                this.selectedRestaurant.id === dishe.restaurantId
            ) {
                this.selectedRestaurant.dishes = this.selectedRestaurant.dishes.map((d) => {
                    if (d.id === dishe.id) {
                        return { ...d, count: existingItem ? existingItem.count : 1 };
                    }
                    return d;
                });
            }
            console.log(this.store.cart);
            this.saveCartToLocalStorage();
        },
        removeFromCart(dishe) {
            const index = this.store.cart.findIndex((cartItem) => cartItem.id === dishe.id);
            if (index !== -1) {
                const currentItem = this.store.cart[index];

                if (currentItem.count > 1) {
                    currentItem.count--;
                } else {
                    this.store.cart.splice(index, 1);
                }

                if (
                    this.selectedRestaurant &&
                    this.selectedRestaurant.id === dishe.restaurantId
                ) {
                    this.selectedRestaurant.dishes = this.selectedRestaurant.dishes.map(
                        (d) => {
                            if (d.id === dishe.id) {
                                return { ...d, count: currentItem.count };
                            }
                            return d;
                        }
                    );
                }
            }
            this.saveCartToLocalStorage();
        },
        clearCart() {
            this.store.cart = [];
            this.saveCartToLocalStorage();
        },
        loadCartFromLocalStorage() {
            const cartData = localStorage.getItem("cart");
            if (cartData) {
                this.store.cart = JSON.parse(cartData);
            }
        },
        saveCartToLocalStorage() {
            localStorage.setItem("cart", JSON.stringify(this.store.cart));
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
        Cart
    }

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
                                    <button class="btn btn-success" @click="addToCart(food_item)">+</button>
                                    <button class="btn btn-danger" @click="removeItemFromCart(food_item, index)"> - </button>
                                </div>


                            </li>
                        </ul>
                        <Cart :add-to-cart="addToCart" :cart-items="cart" />
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
