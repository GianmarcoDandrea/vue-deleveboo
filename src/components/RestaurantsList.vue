<script>
import { store } from '../store';
import { DateTime } from 'luxon';
import RestaurantCard from './RestaurantCard.vue';

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
    components: {
        RestaurantCard
    },
}
</script>

<template>
    <div class="container mb-3">
        <h2 class="text-center mt-3 p-4 list fw-bold">Restaurants list:</h2>
        <div v-if="isLoading" class="text-center mt-3">
            <p>Loading...</p>
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div class="container" v-else>
            <div class="row gy-5 mt-2">
                <!-- qui va la lista di tutti i ristoranti -->
                <div class="col col-12 col-md-12 col-lg-6" v-for="restaurant in restaurants">
                    <restaurant-card :restaurant="restaurant" class="custom-class" />
                </div>
            </div>
        </div>
    </div>
    <!-- paginazione -->
    <div class="mb-5">
        <button v-if="currentPage > 1" class="btn btn-primary me-2" @click.prevent="getRestaurants(currentPage - 1)">
            Previous </button>

        <button v-if="currentPage < lastPage" class="btn btn-primary" @click.prevent="getRestaurants(currentPage + 1)">
            Next </button>
    </div>
</template>

<style lang="scss" scoped>

h2 {
    font-size: 4rem;
}
.btn {
    background-color: #f2c802;
    border: none;

    &:hover {
        background-color: #FAA307;
    }
}

.list {
    font-family: 'Protest Revolution', sans-serif;
}

.custom-class {
    transition: all 0.3s ease-in-out; /* Animazione smooth */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombra leggermente più pronunciata */
    &:hover {
        transform: scale(0.95); /* Effetto hover di scaling a 0.9 */
        filter: brightness(110%); /* Torna alla luminosità normale */
        box-shadow: 0 12px 20px rgba(1, 1, 1, 0.5); /* Ombra più accentuata al passaggio del mouse */
    }
}

</style>