<script>
import { store } from '../store';
import { DateTime } from 'luxon';

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
            isClosed: null,
        }
    },
    methods: {
        isClosed() {
            console.log('ok')
        }
    },
}
</script>

<template>
    <div class="container mb-3">
        <h2 class="text-center mt-3 p-4"> La lista dei ristoranti:</h2>
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
                            <span><strong> Open At: </strong>{{ restaurant.opening_time.slice(0, 5) }}</span>
                            <span class="ms-2"><strong>Close At: </strong>{{ restaurant.closing_time.slice(0, 5) }}</span>
                            <br>

                            <span :v-if="restaurant.closure_day !== 'none'"><strong>Close On: </strong>{{
                                `${restaurant.closure_day}` }}</span>
                        </div>


                    </div>
                    <span class="card-text"><span><strong>Address:</strong></span> <br> {{ restaurant.address }}</span>
                    <div class="btn-zone">
                        <button class="badge text-bg-warning ms-2" v-for="cusine_type in restaurant.cusine_types ">
                            {{ cusine_type.name }}
                        </button>
                    </div>

                    <router-link class="btn btn-primary mt-2 text-dark"
                        :to="{ name: 'restaurant-details-page', params: { slug: restaurant.slug } }">
                        Menu
                    </router-link>
                    
                </div>
            </div>

        </div>

    </div>
    <!-- paginazione -->
    <div class="mb-5">
        <button v-if="currentPage > 1" class="btn btn-primary me-2" @click.prevent="getRestaurants(currentPage - 1)">
            Precedente </button>

        <button v-if="currentPage < lastPage" class="btn btn-primary" @click.prevent="getRestaurants(currentPage + 1)">
            Prossima</button>
    </div>
</template>

<style lang="scss" scoped>
.btn {
    background-color: #f2c802;
    border: none;

    &:hover {
        background-color: #FAA307;
    }
}
</style>