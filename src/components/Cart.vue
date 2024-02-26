<script>
import axios from 'axios';
import { store } from '../store'

export default {
    data() {
        return {
            store,
            cart: [],
            restaurants: [],
            food_items: [],
            selectedRestaurantId: null,
        }
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
};
</script>


<template>
    <div class="offcanvas offcanvas-end p-4" tabindex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
        <div class="offcanvas-header text-center p-4 mb-3">
            <h3 class="offcanvas-title fw-bold text-center" id="offcanvasCartLabel">Your shopping cart</h3>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body px-4 py-0">
            <div v-if="store.cart.length === 0">
            <p class="message p-1 text-center">No product in your shopping cart</p>
        </div>
            <div v-else class="container p-0">
                <div v-for=" item  in  store.cart " :key="item.id" class="list-unstyled">
                    <div class="row d-flex">
                        <div class="col-8">
                            <h3 class="m-0">{{ item.name }}</h3>
                            <p class="m-0">Price: <span class="fw-bold">{{ item.price }}€</span></p>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center">
                            <button @click="removeFromCart(item)" class="btn btn-remove fw-bold">
                                -
                            </button>
                            <span class="quantity mx-2 fw-bold">{{ item.count }}</span>
                            <button @click="addToCart(item)" class="btn btn-add fw-bold">
                                +
                            </button>
                        </div>
                    </div>
                    <hr class="my-3">
                </div>
            </div>
        </div>
        <div  v-if="store.cart.length > 0" class="total-price px-4 py-3 text-end">
            <h3 class="m-0">Total: {{ cartTotal }}€</h3>
        </div>
        <div v-if="store.cart.length > 0" class="pay d-flex align-items-center justify-content-center gap-2 p-4 pt-0">
            <button @click="clearCart" class="btn fw-bold">Empty cart</button>
            <router-link to="/payment" class="btn fw-bold"> Go to Payment </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.offcanvas-header {
    .btn-close {
        background-color: #F2C802;
        border-radius: 15px;

        &:hover {
            background-color: #FAA307;
        }
    }
}

.offcanvas-body::-webkit-scrollbar {
    background-color: transparent;
    border-radius: 10px;
    width: 8px;
}

.offcanvas-body::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
}

.offcanvas-body::-webkit-scrollbar-thumb {
    background-color: #F2C802;
    border-radius: 10px;

    &:hover {
        background-color: #FAA307;
    }
}

.offcanvas-body {
    overflow-y: scroll;
    
    h3 {
        font-size: 1.3rem;
    }

    .btn-remove ,
    .btn-add {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        padding: 5px 12px;
        width: 30%;
        aspect-ratio: 1;
    }

    .quantity {
        text-align: center;
        width: 30%;
    }

    hr {
        border: 1px solid #F2C802;
    }
}

.message {
    background-color: #F2C802;
    border-radius: 5px;
}

.btn {
    // padding: 5px 10px;
    background-color: #F2C802;
    border-radius: 10px;
    color: #03071E;

    &:hover {
        background-color: #fad507;
        transform: scale(1.05);
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
    }

}
</style>