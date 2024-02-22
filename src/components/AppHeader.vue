<script>

export default {
    data() {
        return {

        };
    },
}
</script>



<template>
    <nav class="navbar navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
            <div>
            <img class="logo" src='../assets/images/DeliveBooLogo.jpg' alt="">
            <a class="navbar-brand ms-3" href="#">DeliveBoo</a>
        </div>

            <div>
                <button type="button" class="btn me-3 login">Sign In</button>

                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>

            <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar"
                aria-labelledby="offcanvasDarkNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Actions</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Sign Up</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Orders</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Contacts
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark">
                                <li><a class="dropdown-item" href="#">Telephone number :</a></li>
                                <li><a class="dropdown-item" href="#">Email: </a></li>
                            </ul>
                        </li>
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