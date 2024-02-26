<script>
import { store } from '../store';
import axios from 'axios';
export default {
    data() {
        return {
            store,
       
            customers_name: '',
            customers_phone_number: '',
            customers_address: '',
            customers_email: '',
        };
    },
    
   props: {
        addItemToCart: Function,
        cartItems: Array,
    },

    computed: {
        totalPrice() {
            return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
        
        }
    },
    mounted() {
        this.initializeCartFromLocalStorage();
    },
    methods: {
        initializeCartFromLocalStorage() {
            const storedCart = localStorage.getItem('cartItems');
            if (storedCart) {
                this.cartItems = JSON.parse(storedCart);
            }
        },
        updateLocalStorage() {
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        },
        updateCartItem(index) {
            
            this.cartItems[index].quantity = Math.max(this.cartItems[index].quantity, 1);
            console.log('Prodotti:', this.cartItems);
            this.updateLocalStorage();
           
        },
        removeItemFromCart(index) {
            console.log('click');
            this.cartItems.splice(index, 1); 
            this.updateLocalStorage();
            
        },
        checkout() {
            
            console.log('click su checkout', this.cartItems);
            const orderData = {
                customers_name: this.customers_name,
                customers_phone_number: this.customers_phone_number,
                customers_address: this.customers_address,
                customers_email: this.customers_email,
                food_items: this.cartItems.map(item => ({
                    id: item.id,
                    quantity: item.quantity ,
                    price: item.price
                })),
                
            };
            console.log(orderData);
            console.log(this.customers_address);
            
            axios.post(`${this.store.baseUrl}/api/restaurant/${this.restaurant.slug}/orders`, orderData)
                .then(response => {
                    console.log('Ordine inviato', response.data);
                    
                })
                .catch(error => {
                    console.error('Ordine non inviato :', error.response.data);
                    
                });
            
        }
    }
}
</script>


<template>

    <div class="container">
        <h3>Your Cart</h3>
        <div v-if="cartItems.length > 0">
            <ul class="list-group">
                <li class="list-group-item" v-for="(item, index) in cartItems" :key="item.id">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{{ item.name }}</h5>
                            <p>Qty: <input type="number" v-model.number="item.quantity" @change="updateCartItem(index)"
                                    min="1"></p>
                            <p>Price: {{ item.price }}</p>
                        </div>
                        <button class="btn btn-danger" @click="removeItemFromCart(index)">Remove</button>
                    </div>
                </li>
            </ul>
            <div class="customer-information">
                    <h4>Customer Information</h4>
                    <div class="form-group">
                        <label for="customers_name">Name:</label>
                        <input type="text" id="customers_name" v-model="customers_name" placeholder="Your name">
                    </div>
                    <div class="form-group">
                        <label for="customers_phone">Phone Number:</label>
                        <input type="tel" id="customers_phone_number" v-model="customers_phone_number" placeholder="Your phone number">
                    </div>
                    <div class="form-group">
                        <label for="customers_address">Address:</label>
                        <input type="text" id="customers_address" v-model="customers_address" placeholder="Your address">
                    </div>
                    <div class="form-group">
                        <label for="customerEmail">Email:</label>
                        <input type="email" id="customers_email" v-model="customers_email" placeholder="Your email">
                    </div>
                </div>
            <div class="mt-3">
                <h4>Total: {{ totalPrice }}</h4>

                <button class="btn btn-primary" @click="checkout">Checkout</button>
            </div>
        </div>
        <div v-else>
            <p>Your cart is empty.</p>
        </div>
    </div>
</template>

<style lang="scss">

</style>