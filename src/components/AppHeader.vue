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
    }
}



</script>



<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <div class="logo w-50">
                <a href="">
                    <img class="w-25" src="../assets/images/deliveboo-logo2.svg" alt="">
                </a>
            </div>
            <button class="navbar-toggler py-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa-solid fa-bars fa-lg fa-fw text-light"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <div class="w-100 d-flex flex-row-reverse">
                    <ul class="navbar-nav mb-2 mb-lg-0 ">
                        <li class="nav-item">
                            <a class="btn btn-dark text-light nav-link"
                                @click="buttonClicked('registrati', store.loginUrl)">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="btn btn-dark text-light nav-link"
                                @click="buttonClicked('registrati', store.registerUrl)">Register</a>
                        </li>
    
                        <!-- collegato al componente Cart tramite id -->
                        <a class="ms-4 me-2 d-flex align-items-center justify-content-center" data-bs-toggle="offcanvas"
                            href="#offcanvasCart" role="button" aria-controls="offcanvasCart">
                            <li class="position-relative ">
                                <i class="fa-solid fa-cart-shopping"></i>
                            </li>
                        </a>
                    </ul>

                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.logo {
    width: 50px;
}

nav {
    background-color: #2f2626 !important;

    .navbar-toggler-icon {
        color: #ffffff;
    }
    .fa-cart-shopping {
        color: white;
    }
}

.btn  {
    &:hover {
        background-color: #c5aa6a !important;
    }   
}

.fa-cart-shopping {
    padding: 10px;
    border-radius: 1rem;
    
    &:hover {
        background-color: #c5aa6a !important;
    }  
}
</style>