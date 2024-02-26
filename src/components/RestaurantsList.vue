<script>
import { store } from '../store';

export default {
    props: {
        restaurants: Array,
    },
    data() {
        return {
            store,
            //restaurant: [],
            isLoading: false,
            currentPage: 1, //pagina corrente x paginazione
            lastPage: 1, // ultima pagina disponibile da risposta paginazione
            total: 0, // numero totale di progetti disponibili
            error: null, // registrare errori che avvengono durante chiamata 
        }
    },
    methods: {},
    //components: {RestaurantCard}
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
            <!-- qui va la lista di tutti i ristoranti -->
            <div class="card" v-for="restaurant in restaurants">
                <img :src="`${store.baseUrl}/storage/${restaurant.image}`" class="card-img-m"
                    :alt="`${restaurant.name} photo`">
                <div class="card-body">
                    <div class="top-card">
                        <div>
                            <h3 class="title-m">{{ restaurant.name }}</h3>
                        </div>
                        <div>
                            <span>{{ restaurant.opening_time }} {{ restaurant.closing_time }}</span>
                            <span>{{ restaurant.closure_day !== 'none' ? `chiuso il${restaurant.closure_day}` : 'aperto 7 / 7'}}</span>
                        </div>


                    </div>
                    <h5 class="card-text"><span>INDIRIZZO:</span> <br> {{ restaurant.address }}.</h5>
                    <div class="btn-zone">
                        <button class="btn-m" v-for="cusine_type in restaurant.cusine_types ">{{ cusine_type.name
                        }}</button>
                    </div>

                    <router-link class="btn btn-primary mt-2" :to="{name:'restaurant-details-page', params:{slug: restaurant.slug}}">Visualizza Menu</router-link>
                </div>
            </div>

        </div>

    </div>
    <!-- paginazione -->
    <div>
        <button v-if="currentPage > 1" class="btn btn-primary me-2" @click.prevent="getRestaurants(currentPage - 1)">
            Precedente </button>

        <button v-if="currentPage < lastPage" class="btn btn-primary" @click.prevent="getRestaurants(currentPage + 1)">
            Prossima</button>
    </div>
</template>

<style lang="scss" scoped>

</style>