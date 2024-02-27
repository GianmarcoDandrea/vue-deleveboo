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
    methods: {}
}
</script>



<template>
    <div class="card">
        <img :src="`${store.baseUrl}/storage/${restaurant.image}`" class="card-img-m" :alt="`${restaurant.name} photo`">
        <div class="card-body">
            <div class="top-card">
                <div>
                    <h3 class="title-m">{{ restaurant.name }}</h3>
                </div>
                <div>
                    <span>{{ restaurant.opening_time }} {{ restaurant.closing_time }}</span>
                    <span>{{ restaurant.closure_day !== 'none' ? `chiuso il${restaurant.closure_day}` : 'aperto 7/7'}}</span>
                </div>


            </div>
            <h5 class="card-text"><span>INDIRIZZO:</span> <br> {{ restaurant.address }}.</h5>
            <div class="btn-zone">
                <button class="btn-m" v-for="cusine_type in restaurant.cusine_types ">{{ cusine_type.name }}</button>
            </div>
            

            <router-link class="btn btn-success"
                :to="{ name: 'restaurant-details-page', params: { slug: restaurant.slug } }">Dettagli</router-link>

        </div>
    </div>

        <!--MENU RISTORANTE
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
            </div>-->
</template>

<style lang="scss" scoped>
.card {
    height: 400px;
    .card-img-m {
        width: 100%;
    }

    .card-body {
        height: 50%;
        width: 100%;
        padding: 1em;
        .title-m {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        h5{
            margin-top: 0;
            font-size: 1rem;
            font-weight: normal;
            span{
                font-size: 0.8rem;
                font-weight: bold;
            }
        }
        .btn-zone{
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-wrap: wrap;

            .btn-m{
            border-radius: 15px;
            background-color: burlywood;
            border:none;
            padding: 0.3rem 0.5rem;
            margin: 0.3rem 0;
        }
        }

    }
}
</style>