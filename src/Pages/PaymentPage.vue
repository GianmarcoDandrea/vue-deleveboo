<script>
import { store } from '../store';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import PrintReceiptComponent from '../components/PrintReceiptComponent.vue';
export default {
    inject: ['providedMethod', 'providedAddToCart', 'providedRemoveFromCart', 'providedClearCart', 'providedSaveCartToLocalStorage', 'providedLoadCartFromLocalStorage'],
       name: "App",
    data() {
        return {

            store,
            cart: [],
            customers_name: '',
            customers_phone_number: '',
            customers_address: '',
            customers_email: '',
            selectedRestaurantId: '',
            isOrderSuccessful : false,
            orderData: {},

            
        };
    },
     mounted() {
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
         totalItemCount() {
            return this.cart.reduce((total, item) => total + item.count, 0);

        },
        orderRoute() {
            
            if (this.cart.length > 0 && this.cart[0].restaurant_id) {
                const restaurantId = this.cart[0].restaurant_id;
                return `${this.store.baseUrl}/api/restaurant/${restaurantId}/orders`;
            }
            return null; 
        },

    },    
    
    methods: {
        notifySuccess() {
            toast("Pagamento effettuato, ordine inviato correttamente!", {
                autoClose: 5000, 
                type: "success" 
            });
        },
        notifyError(message) {
            toast(message, {
                autoClose: 5000,
                type: "error" 
            });
        },
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
                alert('Sistema di pagamento non pronto.');
                return;
            }
            

            this.dropinInstance.requestPaymentMethod(async (error, payload) => {
                if (error) {
                    console.error('Errore nella richiesta del metodo di pagamento:', error);
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
                     
                        const orderResponse = await this.submitOrderToBackend(orderData);
                        this.providedClearCart();
                        this.providedSaveCartToLocalStorage();
                        console.log('Ordine effettuato:', orderData, 'Carrello svuotato');
                        this.orderData = this.prepareOrderData();
                        this.isOrderSuccessful = true;
                        this.customers_name = '';
                        this.customers_phone_number = '';
                        this.customers_address = '';
                        this.customers_email = '';
                        this.notifySuccess();

                
                        this.payment_method_nonce = null;
                    } else {
                        this.notifyError();
                    
                        console.error('pagamento fallito', paymentResponse);
                    }
                } catch (error) {
                    console.log('errore nel pagamento:', error);
                    console.error('richiesta fallita:', error);
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
           const route = this.orderRoute;
           console.log(this.orderRoute)
            if (!route) {
                console.error('rotta undefined');
                return;
            }

            try {
                const response = await axios.post(route, orderData);
                console.log(response);

            } catch (error) {
                console.error(error);

            }
            
        },
  
      
    },
    props: {
        selectedRestaurantId: String,
        selectedRestaurant : String,
        selectedRestaurantSlug: String,
        
    },
    components: {
        PrintReceiptComponent

    },
}
</script>


<template>
    <section class="h-100 p-3" style="background-color: rgb(255 193 7);">
        <div class="container py-5 h-100" style="background-color: rgb(47 38 38)">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col">
                    <div class="card">
                        <div class="card-body p-4">

                            <div class="row">

                                <div class="col-lg-7">
                                    <h5 class="mb-3">

                                        <!-- * MENU ROUTE -->
                                        <!-- TODO: aggiungere la rotta che riporti al menu -->
                                        <router-link class="text-body" :to="{ name: 'home' }">
                                            <i class="fas fa-long-arrow-alt-left me-2"></i>
                                            Continue shopping
                                        </router-link>
                                    </h5>
                                    <hr>

                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div>
                                            <h3 class="mb-2">Order Summary</h3>

                                            <!-- * CART ITEMS COUNT -->
                                            <!-- TODO: aggiungere il count degli items presenti nel ordine -->
                                            <p class="mb-0">You have {{ totalItemCount }} items in your cart</p>
                                        </div>
                                    </div>

                                    <hr>

                                    <!-- * CART ITEMS SUMMARY CARD  -->
                                    <!-- TODO: aggiungere il v-for per gli elementi presenti nel carrello -->
                                    <div class="card mb-3 mt-4" v-for="item in store.cart">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between">
                                                <div class="d-flex flex-row align-items-center">
                                                    <div>
                                                        <img src="" class="img-fluid rounded-3" alt="DISH IMAGE"
                                                            style="width: 65px;">
                                                    </div>
                                                    <div class="ms-3">
                                                        <h5>{{ item.name }}</h5>
                                                        <p class="small mb-0">{{ item.description }}</p>
                                                    </div>
                                                </div>
                                                <div
                                                    class="d-flex flex-row align-items-center justify-content-center text-center">
                                                    <div style="width: 50px;">
                                                        <h5 class="fw-normal mb-0">QTY</h5>
                                                        <p> {{ item.count }}</p>
                                                    </div>
                                                    <div style="width: 80px;">
                                                        <h5 class="mb-0">PRICE</h5>
                                                        <p> {{ item.price }}</p>
                                                    </div>
                                                    <a href="#!" style="color: #cecece;"><i
                                                            class="fas fa-trash-alt"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <PrintReceiptComponent :isVisible="isOrderSuccessful" :orderData="orderData" @close="isOrderSuccessful = false"></PrintReceiptComponent>

                                </div>

                                <!-- * CHECKOUT  -->
                                <div class="col-lg-5">
                                    <div class="card bg-warning rounded-3">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center mb-4">
                                                <h3 class="mb-0">Checkout</h3>

                                                <!-- * LOGO -->
                                                <img src="" class="img-fluid rounded-3" style="width: 60px;" alt="LOGO">
                                            </div>

                                            <!-- * CARD TYPES ICONS -->
                                            <h4 class="small mb-2">Card type</h4>
                                            <a href="#!" type="submit" class="text-white"><i
                                                    class="fab fa-cc-mastercard fa-2x me-2"></i></a>
                                            <a href="#!" type="submit" class="text-white"><i
                                                    class="fab fa-cc-visa fa-2x me-2"></i></a>
                                            <a href="#!" type="submit" class="text-white"><i
                                                    class="fab fa-cc-amex fa-2x me-2"></i></a>
                                            <a href="#!" type="submit" class="text-white"><i
                                                    class="fab fa-cc-paypal fa-2x"></i></a>


                                            <div class="mt-4">
                                                <!-- * CARDHOLDER NAME INPUT-->
                                                <div class="form-outline form-white mb-2">
                                                    <input type="text" id="customers_name" v-model="customers_name"
                                                        class="form-control form-control-lg" siez="17"
                                                        placeholder="Your Name" />
                                                    <label class="form-label ms-2 mt-1" for="customers_name">First name and
                                                        last Name</label>
                                                </div>

                                                <!-- * CARD NUMBER INPUT-->
                                                <div class="form-outline form-white mb-2">
                                                    <input type="tel" id="customers_phone_number"
                                                        v-model="customers_phone_number"
                                                        class="form-control form-control-lg" siez="17"
                                                        placeholder="Phone number" minlength="19" maxlength="19" />
                                                    <label class="form-label ms-2 mt-1" for="customers_phone_number">Phone
                                                        Number</label>
                                                </div>

                                                <!-- * CARD EXPIRATION DATE INPUT-->


                                                <div class="form-outline form-white mb-2">
                                                    <input type="text" id="customers_address" v-model="customers_address"
                                                        class="form-control form-control-lg" placeholder="Your address"
                                                        size="17" />
                                                    <label class="form-label ms-2 mt-1"
                                                        for="customers_address">Address</label>
                                                </div>


                                                <!-- * CVV INPUT-->

                                                <div class="form-outline form-white mb-2">
                                                    <input type="email" id="customers_email" v-model="customers_email"
                                                        class="form-control form-control-lg" placeholder="email" size="7" />
                                                    <label class="form-label ms-2 mt-1" for="typeText">Email</label>
                                                </div>

                                            </div>

                                            <hr class="my-4">

                                            <!-- * TOTAL PRICE -->
                                            <!-- TODO: aggiungere il prezzo totale degli items nel carrello -->
                                            <div class="d-flex justify-content-between mb-3">
                                                <h5 class="mb-2">Total (Incl. taxes)</h5>
                                                <h5 class="mb-2">{{ cartTotal }}</h5>
                                            </div>

                                            <!-- * CHECKOUT BUTTON -->

                                            <!-- Drop-in UI container -->
                                            <div id="dropin-container">

                                            </div>
                                            <!-- TODO: aggiungere il reindirizzamento del pagamento -->
                                            <button type="button" id="submit-button" @click="submitCheckout"
                                                class="btn btn-success btn-block btn-lg">
                                                <span>Checkout</span>
                                            </button>

                                        </div>
                                    </div>

                                </div>
                                

                            </div>

                        </div>
                    </div>
                </div>
            </div>
    </div>
</section></template>


<style lang="scss"></style>