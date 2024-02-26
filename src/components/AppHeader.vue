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
        <div class="container-fluid d-flex align-items-center ">

            <div class="logo w-50">
                <a href="">
                    <img class="w-25" src="../assets/images/deliveboo-logo2.svg" alt="">
                </a>
            </div>


            <div class="collapse navbar-collapse d-flex flex-row-reverse" id="navbarTogglerDemo02">
                <ul class="navbar-nav mb-2 mb-lg-0 justify-content-end">
                    <li class="nav-item">
                        <a class="btn btn-dark text-light nav-link"
                            @click="buttonClicked('registrati', store.loginUrl)">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-dark text-light nav-link"
                            @click="buttonClicked('registrati', store.registerUrl)">Register</a>
                    </li>

                    <!-- collegato al componente Cart tramite id -->
                    <a class="ms-4 me-2 d-flex align-items-center justify-content-center" data-bs-toggle="offcanvas" href="#offcanvasCart" role="button" aria-controls="offcanvasCart"> 
                        <li class="position-relative ">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </li>
                    </a>
                </ul>
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

    .fa-cart-shopping{
        color: white;
    }
}

.login {
    background-color: #c5aa6a !important;
}

.offcanvas-header {
    background-color: #c5aa6a !important;

}

.offcanvas-body {
    background-color: #c5aa6a !important;
}

.dropdown-menu-dark {
    background-color: #c5aa6a !important;
}

.dropdown-menu {
    background-color: rgb(47 38 38) !important;
}
</style>