<script>


export default {
    data() {
        return {}
    },
}

</script>

<template>
    <div class="wrap">
        <div class="container p-5 mt-5 ">
            <div class="mt-5">
                <h1 class="text-white">Discover the best food & drinks From Best Restaurants</h1>
                <p class="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.
                </p>
            </div>


            <div class="input-group mb-3 mt-5">
                <input type="text" class="form-control" placeholder="Search Restaurant">
                <div class="input-group-text p-0">
                    <select class="form-select form-select-lg shadow-none bg-light border-0">
                        <option>Categories</option>
                    </select>
                </div>
                <button class="input-group-text shadow-none px-4 btn-warning">
                    Search
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
h1 {
    color: #c6c1c1 !important;
    background-color: rgb(47 38 38);
    padding: 1rem;
    width: 450px;
    border-radius: 20px;
    text-align: center;
}

p {
    color: #c6c1c1 !important;
    background-color: rgb(47 38 38);
    padding: 1rem;
    width: 450px;
    border-radius: 20px;
    text-align: center;
}
.wrap {
    background-image: url('../assets/images/restaurant 2.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 600px;

}
</style>