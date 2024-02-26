<script>

import axios from 'axios';
import { store } from '../store';

export default {
    data() {
        return {
            store,
            cusine_types: [],
            selectedCuisines: [],
            restaurants: [],
            filteredRestaurants: [],
            noRestaurantsMessage : '',
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
            ///se nessun filtro è impostato, ritorna tutti i ristoranti
            if (this.selectedCuisines.length === 0) {
                this.filteredRestaurants = this.restaurants;
            } else {
                //se ci sono filtri impostati, filtra i ristoranti
                this.filteredRestaurants = this.restaurants.filter(restaurant =>
                    // restaurant.cusine_types.some(cuisine => this.selectedCuisines.includes(cuisine.name))
                    //controlla che every cuisine type selezionata è presente nel ristorante
                    //controlla se il ristorante corrente ha questa cuisine type
                    this.selectedCuisines.every(selectedCuisines => restaurant.cusine_types.some(cusine=>cusine.name === selectedCuisines))
                );
            }
            console.log(this.filteredRestaurants, this.selectedCuisines);
            //se nessun ristorante, messaggio
            if (this.filteredRestaurants.length === 0) {
                this.noRestaurantsMessage = "nessun ristorante trovato"
                console.log(this.noRestaurantsMessage)
            } else {
                this.noRestaurantsMessage = "";
            }  
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
            <div class="container p-5 mt-3">
                <div class="mt-5">
                    <h1 class="text-white">Discover the best food & drinks From Best Restaurants</h1>
                    <p class="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                        incididunt ut labore et.
                    </p>
                </div>

                <!-- CHEKBOX FILTER -->
                <div class="input-group mb-3 mt-5 d-flex align-items-center justify-content-center">
                    <div class="card shadow border-0 mb-5">
                        <div class="card-body p-5">
                            <h2 class=" mb-1 mb-4">Choose your main category</h2>

                            <ul class="list-group">
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <div class="d-flex align-items-center">
                                           <div class="p-3" v-for="cusine_type in cusine_types" :key="cusine_type.id">
                                                <input :id="'cusine_type-' + cusine_type.id" type="checkbox" v-model="selectedCuisines" :value="cusine_type.name">
                                                <label class="ms-2" :for="'cusine_type-' + cusine_type.id">{{ cusine_type.name }}</label>

                                            </div>

                                        </div>
                                    </li>
                                </ul>
                            </ul>
                        </div>

                        <!-- SEARCH BUTTON -->
                        <button class="btn btn-warning" @click="filterRestaurantsByCuisine">
                            <router-link :to="{name: restaurantslist}"></router-link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
h1 {
    color: #ffffff !important;
    text-align: center;
}

p {
    color: #c6c1c1 !important;
    text-align: center;
}

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

button {
    height: 50px;
}
</style>