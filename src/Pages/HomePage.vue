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
            restaurants: []
        }
    },
    created(){
        this.fetchCuisines();

    },
    methods: {
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
        fetchRestaurants(){
            console.log(this.selectedCuisine);
            if (!this.selectedCuisine) return;
            axios.get(`${this.store.baseUrl}/api/restaurants/cusine_type/${this.selectedCuisine}`, {
                params: {
                    page: this.currentPage, // includi il numero pag corrente come parametro query x paginazione
                }
            })
                .then((resp) => {  //se risposta positiva
                    console.log(resp);
                    this.restaurants = resp.data.results.data;  
                    console.log(resp.data.results);
                    this.lastPage = resp.data.results.lastPage; // aggiorna lastpage da risposta
                    this.total = resp.data.results.total; // aggiorna total da risposta
                    this.isLoading = false;
                })
                .catch((error) => { // risposta negativa 
                    this.error = error; // salva errori nei dati del componente 
                    this.isLoading = false;
                });
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
            <div class="container p-5 mt-5">
                <div class="mt-5">
                    <h1 class="text-white">Discover the best food & drinks From Best Restaurants</h1>
                    <p class="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                        incididunt ut labore et.
                    </p>
                </div>

                <!-- SELECT FILTER -->
                <div class="input-group mb-3 mt-5 d-flex align-items-center justify-content-center">
                    <div class="input-group-text p-0">
                        <select v-model="selectedCuisine" class="form-select form-select-lg shadow-none bg-light border-0">
                            <option>Categories</option>
                            <option v-for="cusine_type in cusine_types" :value="cusine_type.name">{{ cusine_type.name }}</option>
                        </select>
                    </div>
                    <!-- SEARCH BUTTON -->
                    <button class="btn btn-warning" @click="fetchRestaurants">
                        Search
                    </button>
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