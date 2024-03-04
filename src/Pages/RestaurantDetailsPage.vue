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
            selectedRestaurantSlug: null,
            selectedRestaurant: [],
            cart: JSON.parse(localStorage.getItem('cart')) || [],
            selectedRestaurantName: '',
            visible:false,
            showAlert: true,
        };
    },
    created() {

        axios.get(`${store.baseUrl}/api/restaurant/${this.$route.params.slug}`)
            .then((resp) => {
                this.selectedRestaurant = resp.data.results;
                this.selectedRestaurantId = this.selectedRestaurant.id;
                this.selectedRestaurantName = this.selectedRestaurant.name;
                console.log(this.selectedRestaurantName);
                this.selectedRestaurantSlug = this.selectedRestaurant.slug;
                console.log(this.selectedRestaurantSlug);
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

        closeAlert(){
            this.showAlert = false;
        },

        toastAdd() {
            toast("Item added to the cart", {
                "type": "success",
                "position": "top-left",
                "closeOnClick": false,
                "pauseOnHover": false,
                "pauseOnFocusLoss": false,
                "autoClose": 1500,
                "hideProgressBar": true,
                "transition": "slide",
                "dangerouslyHTMLString": true,
                "multiple": false,
            });
        },
        toastRemove() {
            toast("Item removed from the cart", {
                "type": "success",
                "position": "top-left",
                "closeOnClick": false,
                "pauseOnHover": false,
                "pauseOnFocusLoss": false,
                "autoClose": 1500,
                "hideProgressBar": true,
                "transition": "slide",
                "dangerouslyHTMLString": true,
                "multiple": false,
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
                const newItem = { ...dishe, count: 1, restaurantName: this.selectedRestaurantName, restaurantSlug: this.selectedRestaurantSlug };
                
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
                if (currentItem.count > 0) {
                    this.toastRemove();
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
        isItemInCart(food_item) {
            return this.store.cart.some(item => item.id === food_item.id);
        },
        getCartItemQuantity(food_item) {
            const cartItem = this.store.cart.find(item => item.id === food_item.id);
            return cartItem ? cartItem.count : 0;
        },
    },
    components: {
        Cart,
    },

}
</script>

<template>

    <ul id="breadcrumb" class="breadcrumbs-container container-fluid d-flex">
        <li><router-link :to="{ name: 'home' }"> <i class="fa-solid fa-house"> </i> </router-link></li>
        <li><a disabled><i class="fa-solid fa-utensils"> </i> <span class="ms-1"> {{ selectedRestaurant.name }} </span></a>
        </li>
    </ul>


    <div :class="this.showAlert ? 'alert alert-danger mx-auto mb-4 over-m' : 'd-none'"v-if="!isSameRestaurantInCart(selectedRestaurant)">
         <div class="text-center">
            <p class="m-0 mb-5">You already have another restaurant's order in progress. You can only order from one restaurant
                at a time.
            </p>
            <button class="btn btn-danger" @click="closeAlert">Close</button>
        </div>
    </div>

    <div class="container gap-2 p-3 my-2">
        <div class="row restaurant-details ">
            <div>
                <div class="card">
                    <div class="image-box">

                        <img :src="imagePath(selectedRestaurant.image)" class="img-x" :alt="`${selectedRestaurant.name} photo`">

                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ selectedRestaurant.name }}</h5>

                        <h6 v-if="selectedRestaurant.cusine_types.length === 1">Category:</h6>
                        <h6 v-else>Categories:</h6>
                        <ul class="d-flex flex-wrap gap-1">

                            <li class="badge text-bg-warning cusine" v-for="cusine_type in selectedRestaurant.cusine_types"
                                :key="cusine_type.id">
                                {{ cusine_type.name }}
                            </li>
                        

                            <li>
                                <span><i class="fa-solid fa-location-dot"></i> Address:</span> <strong> {{ selectedRestaurant.address }}</strong>
                            </li>
                            <li>
                                 <span><i class="fa-solid fa-phone"></i> Tel. Number:</span> <strong> {{ selectedRestaurant.phone_number }}</strong></li>
                            <li>
                                <span><i class="fa-solid fa-door-open"></i> Opening time:</span> <strong> {{ selectedRestaurant.opening_time.slice(0, 5) }}</strong></li>
                            <li>
                                <span><i class="fa-solid fa-door-closed"></i> Closing time:</span> <strong> {{ selectedRestaurant.closing_time.slice(0, 5) }}</strong></li>
                            <li>
                                <span><i class="fa-solid fa-circle-xmark"></i> Closure day:</span> <strong> {{ selectedRestaurant.closure_day }}</strong></li>
                            <li>
                                <span><i class="fa-solid fa-hashtag"></i> VAT Number:</span> <strong> {{ selectedRestaurant.vat_number }}</strong></li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-100 menu-section">
            <div class="card" style="width: 100">
                <div class="card-body">
                    <h5 class="card-title">{{ selectedRestaurant.name }}</h5>

                    <div v-if="selectedRestaurant.food_items.length > 0">

                        <div v-for="food_item in selectedRestaurant.food_items" :key="food_item.id"
                            class="card card-m mb-3">
                            <div class="row g-0">
                                <div class="image-box">

                                    <img :src="imagePath(food_item.image)" class="img-m" :alt="`${food_item.name} photo`">

                                </div>

                                <div class="content-box">
                                    <div class="card-body w-100">
                                        <h5 class="card-title item-name-price">
                                            <span class="item-title">
                                                {{ food_item.name }}
                                            </span>
                                            <span class="item-price">
                                                <strong>€ {{ food_item.price }}</strong>
                                            </span>
                                        </h5>
                                        <div class="descr-box">
                                            <span class="info-d">DESCRIPTION:</span>
                                            <span class="text-muted item-description">{{ food_item.description }}. </span>
                                        </div>

                                        <div class="btn-wrapper mt-2 d-flex justify-content-start">
                                            <button class="btn" @click="addToCart(food_item), toastAdd()"
                                                :disabled="!isSameRestaurantInCart(food_item.selectedRestaurant)"><i
                                                    class="fa-solid fa-plus i-m"></i></button>
                                            <button class="btn ms-1" @click="removeFromCart(food_item, index)"
                                                :disabled="!isSameRestaurantInCart(food_item.selectedRestaurantId)"><i
                                                    class="fa-solid fa-minus i-m"></i>
                                            </button>
                                            <div v-if="isItemInCart(food_item)" class="container w-100 item-details mx-2">
                                                <span class="mx-1 quantity">x{{ getCartItemQuantity(food_item) }}</span>
                                                <span class="mx-1 item-name">{{ food_item.name }}</span>
                                                <span class="mx-1 item-price">Price: <span class="fw-bold">{{
                                                    (food_item.price *
                                                        getCartItemQuantity(food_item)).toFixed(2) }}€</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <p>Menu empty.</p>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>

.image-box {
    height: 250px
}

img {
    width: 100%;
    object-fit: cover;
}

.alert-danger {
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
    background-color: rgb(47 38 38);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 500px) {
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
        text-align: center;
        .card {
            background-color: rgb(197 170 106);
        }

        @media screen and (min-width: 500px) {
            width: 35%;
        }

        @media screen and (min-width: 992px) {
            width: 60%;
        }
        img{
            border-radius: 8px 8px 0 0;
        }
        ul {
            padding-left: 0;
            list-style-type: none;
            display: flex;
            flex-direction: column;
        }

        li {
            padding: 0.8rem;
            display: flex;
            flex-direction: column;
            .cusine{
                width: 50%;
                margin: 0 auto;
            }
        }

    }

    .menu-section {
        .card {
            background-color: rgb(197 170 106);
            box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6);
            border-radius: 8px;
            overflow: hidden;


            .image-box {
                width: 40%;
                border-right: 5px double #F2C802;
                

                @media screen and (max-width: 500px) {
                    width: 100%;
                    border-bottom: 5px double #F2C802;
                    border-right: none;
                }

                .img-m {
                    width: 100%;
                    height: 100%;
                    

                    @media screen and (max-width: 500px) {
                        border-top: none;

                    }
                }
                .badge{
                    align-self: center;
                }
            }

            .content-box {
                width: 60%;

                @media screen and (max-width: 500px) {
                    width: 100%;
                }

                .item-name-price {
                    display: flex;
                    justify-content: space-between;
                    color: #ffffff;
                    width: 100%;
                    gap: 0.25rem;

                    .item-title {
                        width: 70%;
                    }

                    .item-price {
                        font-size: 1.2rem;
                        width: 30%;
                    }
                }

                .item-name-price:hover {
                    color: #F2C802;
                }

                .descr-box {
                    width: 100%;
                    margin: 1em auto;
                    border: 1px solid rgb(47 38 38);
                    border-radius: 10px;
                    padding: 0.8em;
                    position: relative;

                    .item-description {
                        font-size: 1rem;
                        font-weight: 500;
                    }

                    .info-d {
                        font-size: 0.5rem;
                        position: absolute;
                        top: 1px;
                        font-weight: bold;
                    }
                }



                .btn-wrapper {
                    width: 100%;
                    display: flex;
                    align-items: start;

                    .item-details {
                        font-size: 0.7rem;
                        margin: auto 0;
                        color: white;
                        padding: 5px;
                    }

                    .btn {
                        width: 35px;
                        height: 35px;
                        aspect-ratio: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: #F2C802;
                        border: none;
                        border-radius: 50%;
                        color: #03071E;

                        .i-m {
                            transform: translateX(-0.5px);
                        }

                        &:hover {
                            background-color: #fad507;
                            transform: scale(1.05);
                            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
                        }
                    }
                }


            }
        }


    }

    .content-box {
        width: 60%;

        .item-name-price {
            display: flex;
            justify-content: space-between;
            color: #ffffff;
            width: 100%;
            gap: 0.25rem;

            .item-title {
                width: 70%;
            }

            .item-price {
                font-size: 1.2rem;
                width: 30%;
            }
        }

        .item-name-price:hover {
            color: #F2C802;
        }

        .descr-box {
            width: 100%;
            margin: 1em auto;
            border: 1px solid rgb(47 38 38);
            border-radius: 10px;
            padding: 0.8em;
            position: relative;

            .item-description {
                font-size: 1rem;
                font-weight: 500;
            }

            .info-d {
                font-size: 0.5rem;
                position: absolute;
                top: 1px;
                font-weight: bold;
            }
        }



        .btn-wrapper {
            width: 100%;
            display: flex;
            align-items: start;

            .item-details {
                font-size: 0.7rem;
                margin: auto 0;
                color: white;
                padding: 5px;
            }

            .btn {
                width: 35px;
                height: 35px;
                aspect-ratio: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #F2C802;
                border: none;
                border-radius: 50%;
                color: #03071E;

                .i-m {
                    transform: translateX(-0.5px);
                }

                &:hover {
                    background-color: #fad507;
                    transform: scale(1.05);
                    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
                }
            }
        }


    }


    .card-title {
        color: #ffffff;
        background-color: rgb(47 38 38);
        padding: 15px;
        border-radius: 1rem;
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

.d-none{
    display: none;
}
.over-m{
    position: fixed;
    top: 30%;
    left: 25%;

    z-index: 222;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F2C802;
    border: 2px solid orangered;
    animation: pulse 2s ease-in-out infinite alternate;
    @media screen and (max-width: 500px) {
                    width: 50%;
    }
}

@keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(1.5);

        }
    }
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
}</style>