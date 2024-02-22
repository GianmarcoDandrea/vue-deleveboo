<script>
import axios from 'axios';
import { store } from '../store';
import { router } from '../router';

export default {
    data() {
        return {
            store,
            isLoading: true,
            curRestaurant: [],
        };
    },
    created() {
        console.log(`${store.baseUrl}/api/restaurant/${this.$route.params.slug}`);
        axios.get(`${store.baseUrl}/api/restaurant/${this.$route.params.slug}`)
            .then((resp) => {
                this.curRestaurant = resp.data.results;
                console.log(resp.data.results);
                this.isLoading = false;
                console.log(`${store.baseUrl}/api/restaurant/${this.$route.params.slug}`);
                console.log(this.$route.params.slug);
            })
            .catch((error) => {
                this.isLoading = false;
                console.log("Error:", error);

                this.$router.replace({ name: 'not-found' });
            });

    }
}
</script>

<template>
    <div class="container">
        <h2> Dettagli </h2>
        <div v-if="isLoading" class="text-center mt-3">
            <p>Caricamento in corso</p>
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">{{ curRestaurant.name }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{ curRestaurant.address }}</h6>
                    <h6 class="card-subtitle mb-2">Tipo: {{ curRestaurant.cusine_types ? curRestaurant.cusine_types.name : 'Nessuna tipologia specificato' }}.</h6>
                    <div v-if="curRestaurant.food_items.length > 0">
                        <h6>Menu:</h6>
                        <ul class="list-unstyled">
                            <li v-for="food_item in curRestaurant.food_items" :key="food_item.id">
                                
                                    {{ food_item.name }}
                           
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <p>Nessun Piatto presente</p>
                    </div>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                        card's content.</p>

                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>