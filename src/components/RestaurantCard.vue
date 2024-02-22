<script>
import { store } from '../store';

export default {
    props: {
        restaurant: {
            type: Object,
            default: () => ({ foodItems: [], cusine_types: [] })
        },
        food_items: {
            type: Object,
            default: () => ({})
        },
        cusine_types: {
            type: Array,
            default: () => ([])
        }
    },
    data() {
        return {
            store,
        };
    },
}
</script>



<template>

    <!-- da risistemare tutto, solo x test -->
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <div v-if="restaurant.food_items.length > 0">
                <h6>Menù:</h6>
                <ul class="list-unstyled">
                    <li v-for="food_item in restaurant.food_items" :key="food_item.id">
                        {{ food_item.name }}
                    </li>

                </ul>
            </div>
            <div v-else>
                <p>Nessuna piatto</p>
            </div>
            <p class="card-text">cuisine-type: {{ restaurant.cusine_types.length > 0 ? restaurant.cusine_types[0].name :
                'Nessun tipo specificato' }}.</p>
            <p class="card-text">indirizzo: {{ restaurant.address }}.</p>

            <router-link class="btn btn-success" :to="{ name: 'restaurant-details-page', params: { slug: restaurant.slug } }">Dettagli</router-link>

        </div>
    </div>
</template>

<style lang="scss"></style>