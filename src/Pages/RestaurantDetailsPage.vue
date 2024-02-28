<script>
import axios from 'axios';
import { store } from '../store';
import { router } from '../router';
import Cart from '../components/Cart.vue'
import { computeStyles } from '@popperjs/core';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


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

        axios.get(`${store.baseUrl}/api/restaurant/${this.$route.params.slug}`)
            .then((resp) => {
                this.selectedRestaurant = resp.data.results;
                this.selectedRestaurantId = this.selectedRestaurant.id;
                this.foodItemsId = this.selectedRestaurant.food_items.restaurant_id;

                this.isLoading = false;

            })
            .catch((error) => {
                this.isLoading = false;


                this.$router.replace({ name: 'not-found' });
            });

    },
    mounted() {

        // this.providedMethod(); // debug
        // this.providedSaveCartToLocalStorage();
        // this.providedLoadCartFromLocalStorage();
    },
    methods: {

        toastAdd() {
            toast("Item added to the cart", {
                "type": "success",
                "position": "bottom-right",
                "closeOnClick": false,
                "pauseOnHover": false,
                "pauseOnFocusLoss": false,
                "autoClose": 1500,
                "hideProgressBar": true,
                "transition": "slide",
                "dangerouslyHTMLString": true,
                "limit" : 2
            });
        },
        toastRemove() {
            toast("Item removed from the cart", {
                "type": "success",
                "position": "bottom-right",
                "closeOnClick": false,
                "pauseOnHover": false,
                "pauseOnFocusLoss": false,
                "autoClose": 1500,
                "hideProgressBar": true,
                "transition": "slide",
                "dangerouslyHTMLString": true,
                "limit": 2 
            });
        },

        addFoodToCart(food_item) {
            if (this.cart.length > 0 && this.cart[0].restaurant_id !== food_item.restaurant_id) {
                console.log('finalizza l ordine');
            } else {

                this.providedAddToCart(food_item);
                this.providedSaveCartToLocalStorage();

            }
        },

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

        isSameRestaurantInCart(selectedRestaurant) {
            return this.store.cart.every((item) => item.restaurant_id === this.selectedRestaurant.id);
        },

        imagePath(imageStoragePath) {
            if (imageStoragePath != 0) {
                console.log(imageStoragePath)
                return `${store.baseUrl}/storage/${imageStoragePath}`
            } else {
                return new URL(`../assets/images/img-not-available.png`, import.meta.url).href
            }
        },
    },
    components: {
        Cart
    },

}
</script>

<template>
    <ul id="breadcrumb" class="breadcrumbs-container container-fluid d-flex">
        <li><router-link :to="{ name: 'home' }"> <i class="fa-solid fa-house"> </i> </router-link></li>
        <li><a disabled><i class="fa-solid fa-utensils"> </i> {{ selectedRestaurant.name }} </a></li>
    </ul>

    <div class="alert alert-warning mx-auto mt-5 mb-2" v-if="!isSameRestaurantInCart(selectedRestaurant)">
        <div class="text-center">
            <p class="m-0">You already have another restaurant's order. You can only order from one restaurant at a time
            </p>
        </div>
    </div>

    <div class="container gap-2 p-3 my-2">
        <div class="row restaurant-details ">
            <div>
                <div class="card">
                    <img :src="selectedRestaurant.image" alt="">
                    <div class="card-body">
                        <h5 class="card-title">{{ selectedRestaurant.name }}</h5>

                        <h6>Tipologie:</h6>
                        <ul class="d-flex flex-wrap gap-1">
                            <li class="badge text-bg-warning" v-for="cusine_type in selectedRestaurant.cusine_types"
                                :key="cusine_type.id">{{
                                    cusine_type.name }}</li>
                        </ul>

                        <li> Indirizzo: <strong> {{ selectedRestaurant.address }}</strong></li>
                        <li> Telefono: <strong> {{ selectedRestaurant.phone_number }}</strong></li>
                        <li> Apertura: <strong> {{ selectedRestaurant.opening_time.slice(0, 5) }}</strong></li>
                        <li> Chiusura: <strong> {{ selectedRestaurant.closing_time.slice(0, 5) }}</strong></li>
                        <li> Chiuso: <strong> {{ selectedRestaurant.closure_day }}</strong></li>
                        <li> Partita Iva: <strong> {{ selectedRestaurant.vat_number }}</strong></li>

                    </div>
                </div>
            </div>
        </div>

        <div class="w-100 menu-section">
            <div class="card" style="width: 100">
                <div class="card-body">
                    <h5 class="card-title">{{ selectedRestaurant.name }}</h5>

                    <div v-if="selectedRestaurant.food_items.length > 0">

                        <div v-for="food_item in selectedRestaurant.food_items" :key="food_item.id" class="card mb-3">
                            <div class="row g-0">
                                <div class="col-md-4">

                                    <img :src="imagePath(food_item.image)" class="card-img-m"
                                        :alt="`${food_item.name} photo`">

                                </div>

                                <div class="col-md-8">
                                    <div class="card-body w-100">
                                        <h5 class="card-title item-name-price"> <span class="item-title">{{ food_item.name
                                        }}</span> <span class="item-price"> <strong>€ {{ food_item.price }}
                                                </strong></span></h5>
                                        <span class="text-muted item-description">{{ food_item.description }} </span>
                                        <div class="btn-wrapper mt-2">
                                            <button class="btn" @click="addToCart(food_item), toastAdd()"
                                                :disabled="!isSameRestaurantInCart(food_item.selectedRestaurant)">+</button>
                                            <button class="btn ms-1"
                                                @click="removeFromCart(food_item, index), toastRemove()"
                                                :disabled="!isSameRestaurantInCart(food_item.selectedRestaurantId)"> -
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
img {
    max-width: 100%;
}

.alert-warning {
    width: 75%;

    @media screen and (min-width: 768px) {
        width: 50%;
    }

    @media screen and (min-width: 992px) {
        width: 50%;
    }
}

.container {
    width: 100%;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 425px) {
        width: 100%;
        flex-direction: row;
    }

    @media screen and (min-width: 992px) {
        flex-direction: row;
    }

    h2 {
        color: #343a40;
        margin-bottom: 20px;
    }


    .restaurant-details {
        width: 100%;

        @media screen and (min-width: 500px) {
            width: 35%;
        }

        @media screen and (min-width: 992px) {
            width: 60%;
        }

        ul {
            padding-left: 0;
            list-style-type: none;
        }

        li {
            padding: 0.5rem;
            display: flex;
            flex-direction: column;
        }

    }

    .menu-section {

        .item-name-price {
            display: flex;
            justify-content: space-between;
            color: #000000;
            width: 100%;
            gap: 0.25rem;

            .item-title {
                width: 70%;
            }

            .item-price {
                font-size: 1.2rem;
                color: #000000;
                width: 30%;
            }
        }

        .item-description {
            margin-left: 1rem;
            font-size: 0.8rem;
        }

        .btn-wrapper {
            width: 30%;
            display: flex;

            .btn {
                width: 30%;
                aspect-ratio: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #F2C802;
                border: none;
                border-radius: 500px;
                color: #03071E;

                &:hover {
                    background-color: #fad507;
                    transform: scale(1.05);
                    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
                }
            }
        }
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
        padding: 15px;
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
}





// breadcrumb
$yellow: rgba(47, 38, 38, 0.3);
$yellow-darken: darken(rgba(47, 38, 38, 0.4), 20%);
$hover-color: darken(rgba(47, 38, 38, 0.5), 20%);
$active-color: #f2c802;


#breadcrumb {
    list-style: none;
    display: block;

    .icon {
        font-size: 14px;
    }

    li {
        float: left;
        padding: 10px 0 10px 0px;

        a {
            color: #fff;
            display: block;
            background: $yellow;
            text-decoration: none;
            position: relative;
            height: 20.80px;
            line-height: 20.80px;
            padding: 0 10px 0 2px;
            text-align: center;
            font-size: 0.8rem;
            margin-right: 8px;
        }

        &:nth-child(even) {
            a {
                background-color: $yellow-darken;

                &:before {
                    border-color: $yellow-darken;
                    border-left-color: transparent;
                }

                &:after {
                    border-left-color: $yellow-darken;
                }
            }
        }

        &:first-child {
            a {
                padding-left: 15px;
                border-radius: 4px 0 0 4px;

                &:before {
                    border: none;
                }
            }
        }

        &:last-child {
            a {
                padding-right: 15px;
                padding-left: 15px;
                border-radius: 4px;

                &:after {
                    border: none;
                }
            }
        }

        a {

            // &:before,
            &:after {
                content: "";
                position: absolute;
                top: 0;
                border: 0 solid $yellow;
                border-width: 10.4px 4.8px;
                width: 0;
                height: 0;
                display: block;
            }

            // &:before{
            //     left: -9%;
            //     border-left-color:transparent;
            //     border-right-color:$yellow;
            // }
            &:after {
                left: 100%;
                border-color: transparent;
                border-left-color: $yellow;
            }

            &:hover {
                background-color: $hover-color;

                //   &:before{
                //     border-color:$hover-color;
                //     border-left-color:transparent;
                //    }
                &:after {
                    border-left-color: $hover-color;
                }
            }

            &:active {
                background-color: $active-color;

                //   &:before{
                //     border-color:$active-color;
                //     border-left-color:transparent;
                //    }
                &:after {
                    border-left-color: $active-color;
                }
            }
        }
    }
}
</style>