<script>
import { store } from '../store';
import axios from 'axios';
export default {
    inject: ['providedMethod', 'providedAddToCart', 'providedRemoveFromCart', 'providedClearCart', 'providedSaveCartToLocalStorage', 'providedLoadCartFromLocalStorage'],
    data() {
        return {
            store,
            cart: [],
            customers_name: '',
            customers_phone_number: '',
            customers_address: '',
            customers_email: '',
            localSelectedRestaurantSlug: this.selectedRestaurantSlug,
        };
    },
     mounted() {
        console.log(this.localSelectedRestaurantSlug);;
        this.initializeDropin();
        this.providedLoadCartFromLocalStorage();
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
            console.log(this.cart);
        }
    },
    computed: {
        cartTotal() {
            const totalAmount = this.cart.reduce(
                (total, item) => total + parseFloat(item.price * item.count),
                0
            );
            return totalAmount.toFixed(2);
        },
    },    
    watch: {
        selectedRestaurantSlug(newSlug) {
            this.localSelectedRestaurantSlug = newSlug;
        }
       
    },
    methods: {
        async initializeDropin() {
            try {
                const response = await fetch(`${this.store.baseUrl}/api/payment/token`);
                const { token } = await response.json();
                console.log('Authorization Token:', token);
                braintree.dropin.create({
                    authorization: token,
                    container: '#dropin-container',
                }, (error, dropinInstance) => {
                    if (error) {
                        console.error('drop in errore:', error);
                        return;
                    }
                    this.dropinInstance = dropinInstance; 
                });
            } catch (error) {
                console.error('errore client token:', error);
            }
        },
        async submitCheckout() {
            if (!this.dropinInstance) {
                alert('Payment system not ready.');
                return;
            }
            

            this.dropinInstance.requestPaymentMethod(async (error, payload) => {
                if (error) {
                    console.error('Error requesting payment method:', error);
                    return;
                }
        

                   const paymentData = {
                    payment_method_nonce: payload.nonce,
                    amount: this.cartTotal 
                };
                console.log('Payload:', payload);

                try {
                   
                    const paymentResponse = await axios.post(`${this.store.baseUrl}/api/payment/checkout`, paymentData);
                    console.log('Payment Response:', paymentResponse);

                   
                    if (paymentResponse.data.success) {
        
                    
                        const orderData = this.prepareOrderData();
                        const combinedData = {
                            order: orderData,
                            paymentMethodNonce: payload.nonce, 
                        };
                        console.log(combinedData);
                        console.log(orderData);
                        try {
                            const orderResponse = await this.submitOrderToBackend(orderData);
                            console.log('Ordine effettuato:', orderResponse.data);
                        } catch (error) {
                            console.error('Ordine non effettuato',  error.response.data);
                            console.error('Request failed:', error.response);
                        }
                        this.payment_method_nonce = null;
                    } else {
                    
                        console.error('pagamento fallito', paymentResponse.data.message);
                    }
                } catch (error) {
                    console.log('errore nel pagamento:', error);
                    console.error('Request failed:', error.response);
                }
            });
         
        },
        prepareOrderData() {
            return {
                customers_name: this.customers_name,
                customers_phone_number: this.customers_phone_number,
                 customers_address: this.customers_address,
                 customers_email: this.customers_email,
                 food_items: this.cart.map(item => ({
                    //  restaurantId: this.selectedRestaurantId, 
                     id: item.id,
                     quantity: item.count,
                     price: item.price
                 })),
                }
            },
        async submitOrderToBackend(orderData) {
            return axios.post(`${this.store.baseUrl}/api/restaurant/ristorante-della-luna/orders`, orderData);
            
        }
        // checkout() {
        //     console.log('click su checkout', this.cart);

        //     // prendi il client token
        //     fetch('/payment/token')
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log('Client Token:', data.token);

        //             // prepara l'ordine
        //             const orderData = {
        //                 customers_name: this.customers_name,
        //                 customers_phone_number: this.customers_phone_number,
        //                 customers_address: this.customers_address,
        //                 customers_email: this.customers_email,
        //                 items: this.cart.map(item => ({
        //                     restaurantId: this.selectedRestaurantId, 
        //                     id: item.id,
        //                     quantity: item.quantity,
        //                     price: item.price
        //                 })),
                        
        //             };

        //             // Nmanda dati al banckend
        //             axios.post(`${this.store.baseUrl}/api/restaurant/${this.restaurant.slug}/orders`, {
        //                 ...orderData,
        //                 token: data.token 
        //             })
        //                 .then(response => {
        //                     console.log('Ordine inviato', response.data);
                            
        //                 })
        //                 .catch(error => {
        //                     console.error('Ordine non inviato:', error.response.data);
                            
        //                 });
        //         })
        //         .catch(error => console.error('Errore client token:', error));
        // }

    },
    props: {
        selectedRestaurantId: String,
        selectedRestaurant : String,
        selectedRestaurantSlug: String,
        
    }
}
</script>


<template>
    <div class="container">
        <h3>Your Cart</h3>
        <div class="order-container">
            <ul class="list-group">
                <li class="list-group-item" v-for="(item, index) in store.cart" :key="item.id">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{{ item.name }}</h5>
                            <p>Qty: {{item.count}} </p>
                            <p>Price: {{ item.price }}</p>
                        </div>>
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
                    <input type="tel" id="customers_phone_number" v-model="customers_phone_number"
                        placeholder="Your phone number">
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
                <h4>Total: {{ cartTotal }}</h4>

                <button class="btn btn-primary" type="button" @click="initializeDropin">Checkout</button>
            </div>
            <!-- Drop-in UI container -->
            <div id="dropin-container"></div>
                
            </div>
                <button id="submit-button" @click="submitCheckout">Invia pagamento</button>
    </div>
</template>

<style lang="scss"></style>