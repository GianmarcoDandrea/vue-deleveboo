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
            curPage: 1,
            lastPage: 1,
            total: 0,
            filteredRestaurants: [],
            carouselRestaurants: [],
            showRestaurants: false,
            min: 0,
            max: 10,

        }
    },
    components: { RestaurantsList, RestaurantsCarousel },
    created() {
        this.fetchCusines();
        //this.fetchAllRestaurants();
        this.fetchCarouselRestaurants();
    },
    computed: {
        debugSelectedCusines() {
            console.log('selectedCusines:', this.selectedCusines);
            return Object.values(this.selectedCusines);
        }
    },
    computed: {
        debugSelectedCusines() {
            console.log('selectedCusines:', this.selectedCusines);
            return Object.values(this.selectedCusines);
        }
    },
    watch: {
        selectedCusines: {
            handler: function (newValue, oldValue) {
                this.filterRestaurantsByCusine();
            },
            deep: true
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


        fetchCusines() {
            axios.get(`${this.store.baseUrl}/api/cusine_types`, {})
                .then((resp) => {
                    //console.log(resp);
                    this.cusine_types = resp.data.results;
                    console.log(this.cusine_types);

                })
                .catch((error) => {
                    this.error = error;

                });
        },
        fetchAllRestaurants() {

            axios.get(`${this.store.baseUrl}/api/restaurants/cusine_types/${this.selectedCusines}`, {
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

        filterRestaurantsByCusine(pageNum) {
            this.curPage = pageNum;
            const paramsToSend = {
                page: pageNum,
            }

            axios.get(`${this.store.baseUrl}/api/restaurants`, {
                params: paramsToSend
            })
                .then((resp) => {  //se risposta positiva
                    //console.log(resp);
                    this.restaurants = resp.data.results.data;  // aggiorna progetti con dati da risposta
                    this.lastPage = resp.data.results.last_page;
                    this.total = resp.data.results.total;
                    //console.log(this.restaurants);
                    this.showRestaurants = true;

                    //oggetto: estrarre le fottutissime chiavi dal fottutissimo oggetto e lo trasforma in un fottutissimo array
                    const selectedCusinesArray = Object.keys(this.selectedCusines).filter(key => this.selectedCusines[key]);



                    ///se nessun filtro è impostato, ritorna tutti i ristoranti
                    //console.log('selectedCusines:', this.selectedCusines, Array.isArray(this.selectedCusines));
                    if (selectedCusinesArray.length === 0) {
                        this.filteredRestaurants = this.restaurants;
                    } else {
                        //se ci sono filtri impostati, filtra i ristoranti
                        this.filteredRestaurants = this.restaurants.filter(restaurant =>
                            selectedCusinesArray.every(selectedCusine => restaurant.cusine_types.some(cusine => cusine.name === selectedCusine))
                        );
                    }

                    console.log(this.filteredRestaurants, this.selectedCusines);
                    //se nessun ristorante, messaggio
                    if (this.filteredRestaurants.length == 0) {
                        this.noRestaurantsMessage = "nessun ristorante trovato"
                        console.log(this.noRestaurantsMessage)
                    } else {
                        this.noRestaurantsMessage = "";
                    }
                })
                .catch((error) => { // risposta negativa 
                    this.error = error; // salva errori nei dati del componente 

                });
            this.min = 0;
            this.max = 10;

        },
        clearFilters() {

            this.selectedCusines = {};
            this.showRestaurants = false;
        },

        paginate(minus) {
            this.min -= minus;
            this.max -= minus;
            console.log(this.min);
            return [this.min, this.max];
        },
        paginatemax(minus) {
            this.min += minus;
            this.max += minus;
            console.log(this.max);
            return [this.min, this.max];
        }

    },
}

</script>

<template >
    <!-- BG IMAGE -->
    <div class="wrap">
        <!-- IMAGE FILTER -->
        <div class="filter">
            <!-- HERO -->
            <div class="container p-2">
                <div class="mt-5">
                    <h1 class="text-white title">Discover the best food & drinks From Best Restaurants</h1>
                    <p class="text-white">We deliver your favorite food fresh & fast in Milano
                    </p>
                    <!-- CHEKBOX FILTER -->
                    <div class="input-group mb-3 mt-5 d-flex align-items-center justify-content-center">
                        <!-- CATEGORIES CARD -->
                        <div class="card shadow border-0 mb-5 pb-3 text-center">
                            <div class="card-body p-5">
                                <h2 class="mb-3 text-white cat-text">Choose your categories</h2>
                                <!-- <div class="text-white mb-2 ms-1">Selected Cuisines Count: {{ debugSelectedCusines.length }} -->


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
                                                <div
                                                    class="d-flex align-items-start check text-white justify-content-center my_checkbox row row-cols-6">
                                                    <div class="p-3 col" v-for="cusine_type in cusine_types"
                                                        :key="'cusine_type-' + cusine_type.id" :value="cusine_type.name">
                                                        <input :id="'cusine_type-' + cusine_type.id" type="checkbox"
                                                            v-model="selectedCusines[cusine_type.name]"
                                                            :value="cusine_type.name" :name="cusine_type.name">
                                                        <label class="ms-2 " :for="'cusine_type-' + cusine_type.id">{{
                                                            cusine_type.name }}</label>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                </ul>
                            </div>

                            <!-- SEARCH BUTTON -->
                            <div class="btn-wrapper d-flex flex-wrap justify-content-center mb-2">
                                <!-- <button class="btn btn-warning me-2" @click="filterRestaurantsByCusine">
                                    Search
                                </button> -->
                                <button class="btn btn-secondary w-75" @click="clearFilters">Show all restaurants</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="list-page" v-if="(showRestaurants) && (filteredRestaurants.length > 0)">
            <RestaurantsList :restaurants="filteredRestaurants.slice(min, max)" />

            <!-- paginazione -->
            <div class="my-4 pagination" v-if="filteredRestaurants.length > 10">
                <!-- Prev button -->
                <button class="btn btn-pagination btn-m me-2" :disabled="min === 0" href="" @click.prevent="paginate(10)">
                    Prev Page
                </button>
                <!-- Next button -->
                <button class="btn btn-m btn-pagination" href="" :disabled="max >= filteredRestaurants.length"
                    @click.prevent="paginatemax(10)">
                    Next Page
                </button>
            </div>

            <div class="mb-5">
            </div>
        </div>
        <div v-else-if="(!showRestaurants) && (cusine_types.length > 0)">

            <!-- <h2 class="text-center my-5">Ancora nessuna categoria selezionata... Scopri i nostri migliori Ristoranti:</h2> -->
            <RestaurantsCarousel :carouselRestaurants="carouselRestaurants.slice(0, 10)" />
        </div>
        <div v-else class="text-center my-5" style=" font-family: 'Protest Revolution', sans-serif; font-size: 2rem,">
            <h2>Sorry...</h2>
            <h2>No Restaurants Listed With These Cuisines Types</h2>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../style/general.scss';


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
    .btn-secondary.dropdown-toggle {
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
        z-index: 99;
        background-color: #c5aa6a;
    }

}

// MEDIA QUERY

// CHEKBOX
.my_checkbox {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    white-space: nowrap;


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
    font-family: 'Protest Revolution', sans-serif;
}



.cate-text {
    font-family: 'Protest Revolution', sans-serif;
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

.list-page {
    position: relative;
    width: 100%;

    .pagination {
        width: 50%;
        margin: 0 auto;
        @media screen and (max-width: 500px) {
            width: 100%;
        }

        .btn-pagination {
            background-color: rgb(255 193 7) !important;
            color: #2f2626;
            width: 45%;
            margin: 0 auto;
        }

        .btn-pagination:hover {
            background-color: rgb(255 193 7) !important;
            color: white;
            font-weight: bold;
            box-shadow: 2.5px 3px 15px 2px rgba(0, 0, 0, 1);
            transition: background-color 0.3s, box-shadow 0.3s;
        }
    }
}
</style>