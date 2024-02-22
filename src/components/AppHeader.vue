<script>

export default {
    data() {
        return {

        };
    },
}
</script>



<template>
    <nav class="navbar bg-dark border-bottom border-body fixed-top" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">DeliveBoo</a>

            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
                <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i>
            </button>

            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Carrello</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    Carrello improvvisato
                </div>
            </div>
        </div>

    </nav>
</template>

<style lang="scss" scoped></style>