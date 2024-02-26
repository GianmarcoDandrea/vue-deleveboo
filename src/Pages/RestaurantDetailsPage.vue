<script>
import axios from 'axios';
import { store } from '../store';
import { router } from '../router';
import TestCartComponent from '../components/TestCartComponent.vue'


export default {
     props: {
        cart: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            store,
            isLoading: true,
            curRestaurant: [],
            // cart: JSON.parse(localStorage.getItem('cart')) || [],
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
            const existingItemIndex = this.cart.findIndex(item => item.id === food_item.id);
             if (existingItemIndex !== -1) {
                this.cart[existingItemIndex].quantity += parseInt(food_item.quantity, 10);
            } else {
                this.cart.push({
                    ...food_item,
                    quantity: parseInt(food_item.quantity, 10) || 1,
                });
            }
            console.log(this.cart); 
            localStorage.setItem('cart', JSON.stringify(this.cart));
            
        },
        removeItemFromCart(index) {
            this.cart.splice(index, 1);
            
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        clearCart() {
            this.cart = [];
           
            localStorage.removeItem('cart');
        },
    },
    components: {
     TestCartComponent
    }
    
}
</script>

<template>
    <div class="container p-5 mt-4">
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <img :src="curRestaurant.image" alt="">
                        <div class="card-body">
                            <h5 class="card-title">{{ curRestaurant.name }}</h5>
                                <div v-if="curRestaurant.cusine_types && curRestaurant.cusine_types.length">
                                    <h6>Tipologie:</h6>
                                        <ul>
                                            <li v-for="cusine_type in curRestaurant.cusine_types" :key="cusine_type.id">{{ cusine_type.name }}</li>
                                        </ul>
                                </div>
                                <div v-else>
                                    <h6>Nessuna tipologia specificato</h6>
                                </div>

                                    <h6 class="card-subtitle mb-2">Tipo: {{ curRestaurant.cusine_types ? curRestaurant.cusine_types.name : 'Nessuna tipologia specificato' }} </h6>
                                    <li> Indirizzo: <strong> {{ curRestaurant.address }}</strong></li>
                                    <li> Telefono: <strong> {{ curRestaurant.phone_number }}</strong></li>
                                    <li> Apertura: <strong> {{ curRestaurant.opening_time }}</strong></li>
                                    <li> Chiusura: <strong> {{ curRestaurant.closing_time }}</strong></li>
                                    <li> Chiuso: <strong> {{ curRestaurant.closure_day }}</strong></li>
                                    <li> Partita Iva: <strong> {{ curRestaurant.vat_number }}</strong></li>

                                </div>
                        </div>
                 </div>
            </div>

            <div class="col-6">
                <div class="card" style="width: 100">
                    <div class="card-body">
                        <h5 class="card-title">{{ curRestaurant.name }}</h5>
                        <h6 class="card-subtitle mb-2">Tipo: {{ curRestaurant.cusine_types ? curRestaurant.cusine_types.name : 'Nessuna tipologia specificato' }} </h6>
                        <div v-if="curRestaurant.food_items.length > 0">
                            <h6>Menu:</h6>
                            <ul class="list-unstyled">
                                <li v-for="food_item in curRestaurant.food_items" :key="food_item.id">
                                    <span class="item-name-price"> {{ food_item.name }} <strong> € {{ food_item.price }}</strong></span>
                                    <span class="text-muted item-description">
                                        {{ food_item.description }}
                                    </span>
                                    <div class="btn-wrapper">
                                        <button class="btn btn-danger" @click="addItemToCart" >+</button>
                                        <button class="btn btn-danger" @click="removeItemFromCart" ></button>
                                    </div>
                                    
                                
                                </li>
                            </ul>
                                 <TestCartComponent :add-item-to-cart="addItemToCart" :cart-items="cart" />
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
    .item-name-price{
        display:flex;
        justify-content: space-between;
    }
    .item-description{
        margin-left: 1rem;
        font-size:  0.8rem;
    }
    &:hover{
        background-color: rgba(123, 123, 122, 0.262)
;
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
