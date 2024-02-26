<script>

import axios from 'axios';
import { store } from '../store';
import { router } from '../router';


export default {
    data() {
        return {
            store,
            cusine_types: [],
            selectedCuisine: '',
            restaurants: [],
            filteredRestaurants: [],
        }
    },
    created() {
        this.fetchCuisines();
        this.fetchAllRestaurants();

    },
    watch: {
        selectedCuisine(newVal, oldVal) {
            this.filterRestaurantsByCuisine();
            console.log(newVal, oldVal);
        }
    },
    methods: {
        fetchAllRestaurants() {

            axios.get(`${this.store.baseUrl}/api/restaurants`, {
            })
                .then((resp) => {  //se risposta positiva
                    console.log(resp);
                    this.restaurants = resp.data.results.data;  // aggiorna progetti con dati da risposta
                    console.log(resp.data.results);


                })
                .catch((error) => { // risposta negativa 
                    this.error = error; // salva errori nei dati del componente 

                });
        },
        fetchCuisines() {
            axios.get(`${this.store.baseUrl}/api/cusine_types`, {

            })
                .then((resp) => {
                    console.log(resp);
                    this.cusine_types = resp.data.results;
                    console.log(resp.data.results);

                })
                .catch((error) => {
                    this.error = error;

                });
        },
        // fetchRestaurants(){
        //     console.log(this.selectedCuisine);
        //     if (!this.selectedCuisine) return;
        //     axios.get(`${this.store.baseUrl}/api/restaurants/cusine_type/${this.selectedCuisine}`, {
        //         params: {
        //             page: this.currentPage, // includi il numero pag corrente come parametro query x paginazione
        //         }
        //     })
        //         .then((resp) => {  //se risposta positiva
        //             console.log(resp);
        //             this.restaurants = resp.data.results.data;  
        //             console.log(resp.data.results);
        //             this.lastPage = resp.data.results.lastPage; // aggiorna lastpage da risposta
        //             this.total = resp.data.results.total; // aggiorna total da risposta
        //             this.isLoading = false;
        //         })
        //         .catch((error) => { // risposta negativa 
        //             this.error = error; // salva errori nei dati del componente 
        //             this.isLoading = false;
        //         });
        // },
        filterRestaurantsByCuisine() {
            //controlla se selctedcuisine è messo oppure no, se non è messo non viene effettuato filtro 
            if (!this.selectedCuisine || this.selectedCuisine === "Categories") {
                return;
            }
            //filtrare array ristoranti per inclusdere solo quei ristoranti che hanno cuisine type == selected cuisine.
            this.filteredRestaurants = this.restaurants.filter(restaurant =>
                //some: testa se almeno un elemento di cuisine type array è uguale al testo di ricerca
                restaurant.cusine_types.some(cuisine => cuisine.name === this.selectedCuisine)
            );
            console.log(this.filteredRestaurants, this.selectedCuisine);
        }
    }
}

</script>

<template>
    <!-- BG IMAGE -->
    <div class="wrap">
        <!-- IMAGE FILTER -->
        <div class="filter">
            <!-- HERO -->
            <div class="container p-5 mt-3">
                <div class="mt-5">
                    <h1 class="text-white">Discover the best food & drinks From Best Restaurants</h1>
                    <p class="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                        incididunt ut labore et.
                    </p>
                    <!-- CHEKBOX FILTER -->
                    <div class="input-group mb-3 mt-5 d-flex align-items-center justify-content-center">
                        <!-- CATEGORIES CARD -->
                        <div class="card shadow border-0 mb-5">
                            <div class="card-body p-5">
                                <h2 class=" mb-1 mb-4 text-white">Choose your categories</h2>

                                <ul class="list-group">
                                    <ul class="list-group">
                                        <div class="btn-group">
                                            <!-- BUTTON DROPDOWN -->
                                            <button type="button" class="btn btn-secondary dropdown-toggle"
                                                data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                                Categories
                                            </button>

                                            <!-- DPROPDOWN MOBILE -->
                                            <ul class="dropdown-menu dropdown-menu-lg-end list">
                                                <li class="list-group-category">
                                                    <div class="d-flex align-items-start check text-white justify-content-center my_checkbox p-4">
                                                        <div class="p-2" v-for="cusine_type in cusine_types"
                                                            :value="cusine_type.name">
                                                            <input class="" :id="'cusine_type-' + cusine_type.id" type="checkbox" v-model="selectedCuisines" :value="cusine_type.name">
                                                            <label class="" :for="'cusine_type-' + cusine_type.id">{{ cusine_type.name }}</label>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                    </ul>
                                </ul>
                            </div>

                            <!-- SEARCH BUTTON -->
                            <button class="btn btn-warning" @click="filterRestaurantsByCuisine">
                                Search
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

// MEDIA QUERY
@media screen and (max-width: 1200px) {
    .card-body {
        max-height: 200px;
    }

    .check {
        flex-direction: column;
    }
}

@media screen and (min-width: 1200px) {
    .btn-secondary {
        display: none;
    }

    .card {
        width: 100%;

        .card-body {
            margin-bottom: 80px;
        }
    }

    .dropdown-menu {
        display: block;
    }
    
}

// CHEKBOX
.my_checkbox {
    margin: 0;

    label:hover {
        color: #f2c802;
    }

    input[type="checkbox"] {
        display: none;
    }

    input[type="checkbox"]+label {
        display: block;
        position: relative;
        padding-left: 25px;
        margin-bottom: 25px;
        cursor: pointer;
    }

    input[type="checkbox"]+label:last-child {
        margin-bottom: 0;
    }

    input[type="checkbox"]+label:before {
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        border: 3px solid #f2c802;
        position: absolute;
        left: 0;
        top: 0;
        opacity: .6;
        -webkit-transition: all .12s, border-color .08s;
        transition: all .12s, border-color .08s;
    }

    input[type="checkbox"]:checked+label:before {
        width: 10px;
        top: -5px;
        left: 5px;
        border-radius: 0;
        opacity: 1;
        border-top-color: transparent;
        border-left-color: transparent;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }
}

// CARD
.card {
    background-color: #2f2626 !important;

    .btn-secondary {
        background-color: #c5aa6a !important;
    }

    .dropdown-menu {
        background-color: #2f2626 !important;
    }
}

.list {
    width: 100%;
}


// TEXTS

h1 {
    color: #ffffff !important;
    text-align: center;
}

p {
    color: #c6c1c1 !important;
    text-align: center;
}

// BACKGROUND IMAGE

.wrap {
    background-image: url('../assets/images/restaurant 2.jpg');

    .filter {
        background: rgba(0, 0, 0, 0.6);
        width: 100%;
        height: 100%;
    }

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 600px;
}

.input-group-text {
    width: 80%;
    height: 50px;
}

// BUTTON

button {
    height: 50px;
}
</style>