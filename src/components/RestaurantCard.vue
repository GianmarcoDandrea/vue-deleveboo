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
            innerText: 'Details'
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
        },

        newText() {
            this.innerText = "Visit Menu";
        },
        resetText() {
            this.innerText = "Details";
        }
    }
}
</script>



<template>
    <div class="card">
        <div class="card-image-container">
            <img v-if="this.restaurant.image !== null" :src="imagePath(restaurant.image)" class="card-img-m"
                :alt="`${restaurant.name} photo`">
            <img v-else src="../assets/images/img-not-available.png" alt="Immagine non diponibile" class="card-img-m">
        </div>

        <div class="card-body pt-3">
            <div class="top-card">
                <div class="card-title">
                    <router-link class="router-link-custom"
                        :to="{ name: 'restaurant-details-page', params: { slug: restaurant.slug } }">
                        <h3 class="title-m">{{ restaurant.name }}</h3>
                    </router-link>
                </div>
            </div>
            <div class="bottom-card">
                <div class="info-rest">
                    <h5 class="card-text mb-2">
                        <span>
                            <i class="fa-solid fa-city"></i>
                            <span> Milano</span>
                        </span>
                        <span>
                            <i class="fa-solid fa-location-dot"></i>
                            {{ restaurant.address }}. <br>

                        </span>
                    </h5>
                    <div class="mb-2 work-time">
                        <span> <i class="fa-regular fa-clock"></i> {{ formattedOpeningClosingTime }}</span><br>
                        <span> {{ restaurant.closure_day !== 'none' ? ` Colsed on ${restaurant.closure_day}` : `Open 7/7` }}
                        </span>
                    </div>
                </div>
                <ol class="cusine-list">
                    <li class="single-cusine btn" v-if="restaurant.cusine_types.length <= 2"
                        v-for="cusine_type in restaurant.cusine_types.slice(0, 2)">
                        {{ cusine_type.name }}
                    </li>

                    <div class="dropdown" v-else>
                        <button class="btn  dropdown-toggle btn-m" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            {{ restaurant.cusine_types.length }} Types of cuisine
                        </button>
                        <ul class="dropdown-menu btn-m">
                            <li v-for="cusine_type in restaurant.cusine_types"><a class="dropdown-item btn-m">{{
                                cusine_type.name }}</a></li>
                        </ul>
                    </div>
                </ol>

                <!-- DETAILS PAGE BUTTON  -->
                <div class="btn-zone">
                    <button @mouseover="newText()" @mouseout="resetText()" class=" btn-details">
                        <router-link :to="{ name: 'restaurant-details-page', params: { slug: restaurant.slug } }">{{
                            innerText
                        }}</router-link>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    height: 392px;
    background-color: #f6f6f6;
    position: relative;
    border: none;

    .card-image-container {
        height: 50%;
        overflow: hidden;

        .card-img-m {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: var(--bs-card-border-radius) var(--bs-card-border-radius) 0 0;
        }
    }

    .card-body {
        height: 50%;
        width: 100%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-image: url(../assets/images/frame-food.png);
        border-radius: var(--bs-card-border-radius);
        ;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom;

        @media screen and (max-width: 500px) {
            padding-top: 0.2rem;
            padding: 0;
        }

        .top-card {
            color: #505050;
            margin-bottom: 0.4rem;
            margin-top: 2em;

            @media screen and (max-width: 500px) {
                margin: 0;
            }

            .card-title {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -60%);
                background-color: rgba(55, 53, 53, 0.8);
                padding: 10px;
                border-radius: 6px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                white-space: nowrap;

                @media screen and (max-width: 500px) {
                    top: 45%;
                    transform: translate(-50%, -65%);
                    width: 70%;
                    padding: 0px;
                    text-align: center;
                }

                .title-m {
                    color: #ffca2c;
                }

                .router-link-custom {
                    text-decoration: none;
                    color: rgb(28, 28, 28);
                }
            }

            .card-title:hover {
                background-color: rgba(255, 202, 44, 0.8);
                font-style: italic;
                color: rgb(55, 53, 53);

                .title-m {
                    color: rgb(55, 53, 53);
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
            position: relative;
            height: calc(100% - 2em);
            padding: 0 10px;

            @media screen and (max-width: 500px) {
                height: 100%;
                padding: 0;
            }

            .info-rest {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;

                @media screen and (max-width: 500px) {
                    flex-direction: column;
                }

                .card-text {
                    color: #505050;
                    display: flex;
                    flex-direction: column;
                    width: 50%;

                    @media screen and (max-width: 500px) {
                        width: 95%;
                        text-align: center;
                        white-space: nowrap;
                    }

                    span {
                        font-size: 0.9rem;
                        margin: 0 10px;

                        @media screen and (max-width: 500px) {
                            margin-left: 0;
                        }

                        @media screen and (max-width: 500px) {
                            font-size: 1rem;
                        }
                    }
                }

                .work-time {
                    position: absolute;
                    top: 0;
                    right: 20px;
                    text-align: center;

                    @media screen and (max-width: 500px) {
                        font-size: 0.8rem;
                        position: relative;
                        width: 80%;
                        text-align: center;
                        margin: 0 auto;
                        right: 0;
                    }
                }
            }
            ol{
                padding-left: 0;
            }
            .cusine-list {
                position: absolute;
                top: 60%;
                left: 20px;
                list-style: none;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                margin-bottom: 0.2rem;
                gap: 0.5em;


                @media screen and (max-width: 500px) {
                    position: relative;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                    width: 90%;
                    top: 0;
                    margin-bottom: 0.2rem;
                    left: 0;
                    padding: 0;
                }

                .single-cusine,
                .btn-m {
                    background-color: rgba(197, 170, 106, 0.7);
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    font-size: 0.8rem;
                    font-weight: 500;

                    @media screen and (max-width: 500px) {
                        font-size: 0.8rem;
                    }
                    @media screen and (min-width: 1025px) {
                        font-size: 1.2rem;
                    }
                }

                .dropdown-menu, .btn-m {
                    @media screen and (max-width: 500px) {
                        width: 100%;
                        font-size: 1rem;
                    }
                }

                .single-cusine:hover {
                    background-color: #ffca2c;
                    font-style: italic;
                }
            }

            .btn-zone {
                .btn-details {
                    background-color: #ffca2c;
                    border: 1px solid rgba(35, 35, 35, 0.5);
                    border-radius: 16px;
                    font-weight: bold;
                    padding: 0.2rem 0.5rem;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    position: absolute;
                    top: 60%;
                    right: 20px;

                    @media screen and (max-width: 500px) {
                        display: none;
                    
                    }
                    @media screen and (min-width: 1025px) {
                        font-size: 1.2rem;
                    }

                    a {
                        text-decoration: none;
                        color: rgb(44, 44, 44);
                    }
                }
            }
        }
    }
}</style>