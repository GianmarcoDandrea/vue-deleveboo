<script>
import axios from 'axios';
import { store } from '../store';
import RestaurantCard from '../components/RestaurantCard.vue';



export default {
    data() {
        return {
            store,
            restaurants: [],
            isLoading: false,
            currentPage: 1, //pagina corrente x paginazione
            lastPage: 1, // ultima pagina disponibile da risposta paginazione
            total: 0, // numero totale di progetti disponibili
            error: null, // registrare errori che avvengono durante chiamata 
        }
    },
    created() {
        this.loading = true;
        axios.get(`${this.store.baseUrl}/api/restaurants`, {
            params: {
                page: this.currentPage,
            }
        }).then((resp) =>{
            console.log(resp);
            if(resp.data.results.data) {
            this.restaurants = resp.data.results.data;
            console.log(resp.data.results);
            this.lastPage = resp.data.results.lastPage; // aggiorna lastpage da risposta
            this.total = resp.data.results.total; // aggiorna total da risposta
            this.isLoading = false;
          } else {
            this.$router.push({name: 'not-found'})
            this.error = error; // salva errori nei dati del componente 
            this.isLoading = false;
          }
        })

    },
    methods: {},
    components: {RestaurantCard}
}
</script>

<template>
    <div class="container">
        <h2 class="text-center mt-5 p-4"> La lista dei ristoranti:</h2>
        <div v-if="isLoading" class="text-center mt-3">
            <p>Caricamento in corso</p>
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div v-else class="row row-cols-3 gy-5 mt-2">
            <div class="col d-flex align-self-stretch" v-for="restaurant in restaurants">
                <!-- qui va la lista di tutti i ristoranti -->
                <RestaurantCard :restaurant="restaurant" />

            </div>

        </div>
        <!-- paginazione -->
        <div>
            <button v-if="currentPage > 1" class="btn btn-primary me-2" @click.prevent="getRestaurants(currentPage - 1)">
                Precedente </button>

            <button v-if="currentPage < lastPage" class="btn btn-primary" @click.prevent="getRestaurants(currentPage + 1)">
                Prossima</button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>