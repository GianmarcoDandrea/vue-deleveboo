<script>
import axios from 'axios';
import { store } from '../store'

export default {
    props: ['selectedRestaurantId', 'selectedRestaurant', 'selectedRestaurantSlug'],
    inject: ['providedMethod', 'providedAddToCart', 'providedRemoveFromCart', 'providedClearCart', 'providedSaveCartToLocalStorage', 'providedLoadCartFromLocalStorage'],
    data() {

        return {
            store,
            cart: [],
            restaurants: [],
            food_items: [],
            restaurantName: '',
            showConfirmModal: false,
        }
    },
    mounted() {
        this.providedLoadCartFromLocalStorage();
        console.log(this.store.cart);
    },
    computed: {
        cartTotal() {
            const totalAmount = this.store.cart.reduce(
                (total, item) => total + parseFloat(item.price * item.count),
                0
            );
            return totalAmount.toFixed(2);
        },
         restaurantName() {
            if (this.store.cart.length > 0) {
                return this.store.cart[0].restaurantName;
            }
        },
    },
    methods: {

        addFoodToCart(food_item) {
            if (this.selectedRestaurantId !== food_item.selectedRestaurantI) {
                console.log('Finalizza ordine attuale prima di ordinare da un altro ristorante')

            } else {
                this.providedAddToCart(food_item);
                console.log('aggiunto', food_item.name)
                this.providedSaveCartToLocalStorage();
            }


        },
        removeFoodFromCart(food_item) {
            this.providedRemoveFromCart(food_item);
            console.log('eliminato', food_item.name)
            this.providedSaveCartToLocalStorage();
        },
        clearedFromCart(food_item) {
            this.providedClearCart(food_item);
            this.providedSaveCartToLocalStorage();
        },
        saveCartToLocalStorage() {
            this.providedSaveCartToLocalStorage();
        },
        loadCartFromLocalStorage() {
            const cartData = localStorage.getItem('cart');
            if (cartData) {
                this.cart = JSON.parse(cartData);
                this.providedLoadCartFromLocalStorage();
            }
        },


        addToCart(food_item) {
            const existingItem = this.store.cart.find((item) => item.id === food_item.id);
            if (existingItem) {
                existingItem.count++;
            } else {
                const newItem = { ...food_item, count: 1 };
                this.store.cart.push(newItem);
            }
            if (
                this.selectedRestaurant &&
                this.selectedRestaurant.id === food_item.restaurantId
            ) {
                this.selectedRestaurant.food_items = this.selectedRestaurant.food_items.map(
                    (d) => {
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
        showConfirmationModal() {
            this.showConfirmModal = true;
        },
        hideConfirmationModal() {
            this.showConfirmModal = false;
        },
        confirmClearCart() {
            this.clearedFromCart();
            this.hideConfirmationModal();
            window.location.reload();
        },
        cancelClearCart() {
            this.hideConfirmationModal();
        },
    },
};
</script>


<template>
    <div class="offcanvas offcanvas-end p-4" tabindex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
        <div class="offcanvas-header text-center p-4 mb-3">
            <h3 class="offcanvas-title fw-bold text-center title" id="offcanvasCartLabel">Your shopping cart</h3>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body px-4 py-0">
            <div v-if="store.cart.length === 0">
                <p class="message p-1 text-center">No products in your shopping cart</p>
            </div>
            <div v-else class="container p-0">
                <small>{{ restaurantName }}</small>
                <p>Order in progress:</p>
                <div v-for=" item  in  store.cart " :key="item.id" class="list-unstyled">
                    <div class="row d-flex">
                        <div class="col-8">
                            <h3 class="m-0">{{ item.name }}</h3>
                            <p class="m-0">Price: <span class="fw-bold">{{ item.price }}€</span></p>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center">
                            <button @click="removeFromCart(item)" class="btn btn-remove btn-c fw-bold">
                                -
                            </button>
                            <span class="quantity mx-2 fw-bold">{{ item.count }}</span>
                            <button @click="addToCart(item)" class="btn btn-add btn-c fw-bold">
                                +
                            </button>
                        </div>
                    </div>
                    <hr class="my-3">
                </div>
            </div>
        </div>
        <div v-if="store.cart.length > 0" class="total-price px-4 py-3 text-end">
            <div v-if="showConfirmModal" class="fmodal-confirm mb-3 alert-danger alert ">
                <p class="text-start text-danger">Your Cart is going to be empty. <br> Are you sure?</p>
                <div class="d-flex gap-2">
                    <button @click="confirmClearCart()" class="btn btn-outline-danger">Confirm</button>
                    <button @click="cancelClearCart()" class="btn btn-outline-success">Close</button>
                </div>
            </div>
            <h3 class="m-0">Total: {{ cartTotal }}€</h3>
        </div>
        <div v-if="store.cart.length > 0" class="pay d-flex align-items-center justify-content-center gap-2 p-4 pt-0">

            <button @click="showConfirmationModal()" class="btn btn-c fw-bold">Empty your cart</button>
            <router-link to="/payments" class="btn btn-c fw-bold"><span data-bs-dismiss="offcanvas"> Go to Payment </span>
            </router-link>


        </div>
    </div>
</template>

<style lang="scss" scoped>
.offcanvas {
    z-index: 999999;
    background-color: rgb(197 170 106);
}

.title {
    background-color: rgb(47 38 38);
    padding: 10px;
    border-radius: 1rem;
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

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

    .btn-remove,
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
        border: 1px solid #000000;
    }
}

.message {
    background-color: #F2C802;
    border-radius: 5px;
}

.btn-c {
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