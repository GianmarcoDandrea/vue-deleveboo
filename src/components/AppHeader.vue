<script>
import { store } from '../store'
export default {
    data() {
        return {
            store,
        };
    },
    methods: {
        buttonClicked(button, link) {
            window.open(link, '_blank');
        },

        quantityCart() {
            let quantity = 0;
            this.store.cart.forEach(food_item => {
                quantity += food_item.count;
            });
            if (quantity > 99) {
                return '99+';
            }
            return quantity;
        }
    }
}
</script>



<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-navbar">
        <div class="container-fluid">
            <div class="logo">
                <a href="/">
                    <img class="logo-image " src="../assets/images/deliveboo-logo2.svg" alt="">
                </a>
            </div>
            <button class="navbar-toggler py-2" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                aria-label="Toggle navigation">
                <i class="fa-solid fa-bars fa-lg fa-fw text-light"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <div class="w-100 d-flex flex-row-reverse">
                    <ul class="navbar-nav mb-2 mb-lg-0 ">
                        <li class="nav-item">
                            <a class="btn btn-dark text-warning nav-link"
                                @click="buttonClicked('registrati', store.loginUrl)">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="btn btn-dark text-warning nav-link"
                                @click="buttonClicked('registrati', store.registerUrl)">Register</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- collegato al componente Cart tramite id -->
        <button class="d-flex align-items-center justify-content-center cart-link" data-bs-toggle="offcanvas"
            href="#offcanvasCart" role="button" aria-controls="offcanvasCart">
            
                <i class="fa-solid fa-cart-shopping"></i>
                <span v-if="store.cart.length > 0" class="cart-item-count translate-middle badge rounded-pill bg-danger">
                    {{ quantityCart() }}
                </span>
            
        </button>
    </nav>
</template>

<style lang="scss" scoped>
.sticky-navbar {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1000;
}

nav {
    background-color: #2f2626 !important;
    border-bottom: 4px solid rgb(255 193 7);

    .logo {
        margin-left: 0.5rem;
        padding: 0.5rem;
        width: 70%;

        .logo-image {
            width: 60%;
        }
    }

    .navbar-toggler {
        border: 1px solid white;
        padding: 1rem;
        padding-top: 1rem;
        color: #ffffff;
    }

    .fa-cart-shopping {
        color: white;
    }

    .btn {
        color: rgb(255, 255, 255) !important;

        &:hover {
            background-color: rgb(255 193 7) !important;
            color: rgb(0, 0, 0) !important;
        }
    }
}

.cart-link {
    position: fixed;
    bottom: 35px;
    right: 20px;
    z-index: 100;
    display: none;
    border-radius: 50%;
    border: none;
    background-color: transparent;
    height: 40px;
    width: 40px;
    background-color: rgba(242, 200, 2, 0.95);
    box-shadow: 2.5px 3px 15px 2px rgba(0, 0, 0, 1);
    transition: background-color 0.3s, box-shadow 0.3s;
    & i {
        font-size: 20px;
        color: black;
        border-radius: 50%;
        cursor: pointer;
        &:hover {
            color: #fff;
        }
    }
    &:hover {
            background-color: rgba(255, 213, 53, 0.95);
            box-shadow: 2.5px 3px 20px 3px rgba(0, 0, 0, 0.7);
    }
    .cart-item-count {
    position: absolute;
    top: 10%;
    left: 100%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    color: white;
}
}


@media screen and (min-width: 768px) {
    .cart-link {
        transform: scale(1.3);
        right: 30px;
    }
}

@media screen and (min-width: 1024px) {
    .cart-link {
        transform: scale(1.5);
        right: 40px;
    }
}

@media screen and (min-width: 1440px) {
    .cart-link {
        transform: scale(1.8);
        right: 60px;
        bottom: 55px;
    }
}

@media screen and (min-width: 600px) {
    nav {
        .logo {
            margin-left: 0.5rem;
            padding: 0.5rem;
            width: 40%;

            .logo-image {
                width: 50%;
            }
        }

    }

    ;
}


// Responsive Desktop
@media screen and (min-width: 992px) {
    nav {
        .logo {
            margin-left: 0.5rem;
            padding: 0.5rem;
            width: 25%;

            .logo-image {
                width: 40%;
            }
        }
    }

    ;

}
</style>
