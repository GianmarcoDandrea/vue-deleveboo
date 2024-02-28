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
    computed: {
        formattedOpeningClosingTime() {
            const openingTime = this.formatTime(this.restaurant.opening_time);
            const closingTime = this.formatTime(this.restaurant.closing_time);
            return `${openingTime} - ${closingTime}`;
        }
    },
    methods: {
        imagePath(imageStoragePath) {
            if (imageStoragePath) {
                return `${this.store.baseUrl}/storage/${imageStoragePath}`;
            } else {
                return new URL(`../assets/images/default-restaurant.png`, import.meta.url).href;
            }
        },
        formatTime(timeString) {
            const [hours, minutes, seconds] = timeString.split(':').map(Number);
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }
    }
}
</script>



<template>
    <div class="card">
        <div class="card-image-container">
            <img :src="imagePath(restaurant.image)" class="card-img-m" :alt="`${restaurant.name} photo`">
        </div>

        <div class="card-body pt-3">
            <div class="top-card">
                <div class="card-title">
                    <router-link class="router-link-custom"
                        :to="{ name: 'restaurant-details-page', params: { slug: restaurant.slug } }">
                                <h3 class="title-m">{{ restaurant.name }}</h3>
                    </router-link>
                </div>
                <h5 class="card-text">
                    {{ restaurant.address }}.
                </h5>
                <div class="mb-2">
                    <span> Open: {{ formattedOpeningClosingTime }}</span><br>
                    <span>{{ restaurant.closure_day !== 'none' ? `Closed on ${restaurant.closure_day}` : `Open 7 / 7 days` }} </span>
                </div>
            </div>
            <!-- CUISIN TYPES -->
            <!-- <div class="btn-zone">
                <button class="btn-m" v-for="cusine_type in restaurant.cusine_types ">{{ cusine_type.name }}</button>
            </div> -->
            <div class="bottom-card">
                <ol class="breadcrumb">
                    <li class="breadcrumb-level" v-for="cusine_type in restaurant.cusine_types ">{{ cusine_type.name }}</li>
                </ol>

                <!-- DETAILS PAGE BUTTON  -->
                <!-- <button class="btn-details">
                    <router-link
                        :to="{ name: 'restaurant-details-page', params: { slug: restaurant.slug } }">Details</router-link>
                </button> -->
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    height: 392px;
    background-color: #f6f6f6;
    position: relative;

    .card-image-container {
        height: 50%;
        overflow: hidden;

        .card-img-m {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .card-body {
        height: 50%;
        width: 100%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);


        .top-card {
            color:#505050;
            margin-bottom: 0.4rem;
            .card-title {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -70%);
                background-color: rgba(255, 255, 255, 0.7);
                padding: 10px;
                border-radius: 6px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                color: rgb(28, 28, 28);
                .router-link-custom {
                    text-decoration: none;
                    color: rgb(28, 28, 28);
                }
            }
            h5 {
                margin-top: 1.5rem;
                font-size: 0.9rem;
                font-weight: normal;
            }

            span {
                font-size: 0.8rem;
            }
        }

        .bottom-card {
            color: #505050;
            .breadcrumb {
                font-size: 0.6rem;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                flex-wrap: wrap;
                margin-bottom: 0.1;
                .breadcrumb-level {
                    border-radius: 16px;
                    background-color: transparent;
                    border: 1px solid #505050;
                    padding: 0.1rem 0.5rem;
                }
            }
            // .btn-details {
            //     background-color: #ffca2c;
            //     border: 1px solid rgb(35, 35, 35);
            //     border-radius: 16px;
            //     font-weight: bold;
            //     padding: 0.2rem 2rem;
            //     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

            //     a {
            //         text-decoration: none;
            //         color: rgb(44, 44, 44);
            //     }
            // }
        }
    }
}
</style>