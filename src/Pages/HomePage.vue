<script>

import axios from 'axios';
import { store } from '../store';
import { router } from '../router';
import RestaurantsList from '../components/RestaurantsList.vue';
import RestaurantsCarousel from '../components/RestaurantsCarousel.vue';

export default {
    data() {
        return {
            store,
            cusine_types: [],
            selectedCusines: {},
            restaurants: [],
            filteredRestaurants: [],
            carouselRestaurants: [],
            showRestaurants: false,
        }
    },
    components: { RestaurantsList, RestaurantsCarousel },
    created() {
        this.fetchCusines();
        this.fetchAllRestaurants();
        this.fetchCarouselRestaurants();
    },
    computed: {
        debugSelectedCusines() {
            console.log('selectedCusines:', this.selectedCusines);
            return Object.values(this.selectedCusines);
        }
    },
    watch: {
        selectedCusines(oldVal, Newval) {
            // this.filterRestaurantsByCusine();
            console.log( this.selectedCusines, oldVal, Newval);
        }
    },
    methods: {
        fetchCarouselRestaurants() {
            axios.get(`${this.store.baseUrl}/api/restaurants?limit=10`)
                .then((resp) => {
                    console.log(resp);
                    this.carouselRestaurants = resp.data.results.data;
                    console.log(this.carouselRestaurants);
                })
                .catch((error) => {
                    console.error('Error fetching restaurants for carousel:', error);
                    this.$router.push({ name: 'not-found' });
                });
        },

        fetchAllRestaurants() {

            axios.get(`${this.store.baseUrl}/api/restaurants`, {
            })
                .then((resp) => {  //se risposta positiva
                    //console.log(resp);
                    this.restaurants = resp.data.results.data;  // aggiorna progetti con dati da risposta
                    console.log(this.restaurants);


                })
                .catch((error) => { // risposta negativa 
                    this.error = error; // salva errori nei dati del componente 

                });
        },
        fetchCusines() {
            axios.get(`${this.store.baseUrl}/api/cusine_types`, {

            })
                .then((resp) => {
                    //console.log(resp);
                    this.cusine_types = resp.data.results;
                    console.log(this.cusine_types);

                })
                .catch((error) => {
                    this.error = error;

                });
        },

        filterRestaurantsByCusine() {

            //oggetto: estrarre le fottutissime chiavi dal fottutissimo oggetto e lo trasforma in un fottutissimo array
            const selectedCusinesArray = Object.keys(this.selectedCusines).filter(key => this.selectedCusines[key]);
            ///se nessun filtro è impostato, ritorna tutti i ristoranti
            // console.log('selectedCusines:', this.selectedCusines, Array.isArray(this.selectedCusines));
            if (selectedCusinesArray.length === 0) {
                this.filteredRestaurants = this.restaurants;
            } else {
                //se ci sono filtri impostati, filtra i ristoranti
                this.filteredRestaurants = this.restaurants.filter(restaurant =>
                    selectedCusinesArray.every(selectedCusine => restaurant.cusine_types.some(cusine => cusine.name === selectedCusine))
                );
            }
            this.showRestaurants = true
            console.log(this.filteredRestaurants, this.selectedCusines);
            //se nessun ristorante, messaggio
            if (this.filteredRestaurants.length === 0) {
                this.noRestaurantsMessage = "nessun ristorante trovato"
                console.log(this.noRestaurantsMessage)
            } else {
                this.noRestaurantsMessage = "";
            }
        },
        clearFilters() {
        
            this.selectedCusines = {};
            this.showRestaurants= false;
        },
    },
}

</script>

<template>
    <!-- BG IMAGE -->
    <div class="wrap">
        <!-- IMAGE FILTER -->
        <div class="filter">
            <!-- HERO -->
            <div class="container p-5">
                <div class="mt-5">
                    <h1 class="text-white title">Discover the best food & drinks From Best Restaurants</h1>
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
                                                    <div class="d-flex align-items-start check text-white justify-content-center my_checkbox">
                                                        <div class="p-3 " v-for="cusine_type in cusine_types" :key="'cusine_type-' + cusine_type.id" :value="cusine_type.name">
                                                            <input :id="'cusine_type-' + cusine_type.id" 
                                                                type="checkbox" v-model="selectedCusines[cusine_type.name]" :value="cusine_type.name" :name="cusine_type.name">
                                                            <label class="ms-2 " :for="'cusine_type-' + cusine_type.id">{{
                                                                cusine_type.name }}</label>
                                                        </div>
                                                        <div>Selected Cuisines Count: {{ debugSelectedCusines.length }}</div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                    </ul>
                                </ul>
                            </div>

                            <!-- SEARCH BUTTON -->
                            <div class="btn-wrapper">
                                <button class="btn btn-warning" @click="filterRestaurantsByCusine">
                                     Search
                                </button>
                                <button class="btn btn-danger" @click="clearFilters">Pulisci</button>
                            </div>
                            
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div v-if="showRestaurants">
            <RestaurantsList :restaurants="filteredRestaurants" />
    </div>
    <div>
        <RestaurantsCarousel :carouselRestaurants="carouselRestaurants" />
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
            margin-bottom: 120px;
        }
    }

    .dropdown-menu {
        display: block;
    }
    
}

// MEDIA QUERY

// CHEKBOX
.my_checkbox {
    margin: 0;
    display: flex;
    flex-wrap: wrap;

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

.title {
  color: rgb(255 193 7) !important;
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
}</style>