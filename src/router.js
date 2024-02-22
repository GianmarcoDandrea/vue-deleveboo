import { createRouter, createWebHistory} from "vue-router";
import HomePage from "./Pages/HomePage.vue";
import RestaurantDetailsPage from "./Pages/RestaurantDetailsPage.vue";
import NotFoundPage from "./Pages/NotFoundPage.vue"


const router = createRouter({
    history: createWebHistory(),
    routes: [
    {
        path: "/",
        name: "home",
        component:HomePage,
       
    },
    {
        path: "/restaurants/:slug",
        name: "restaurant-details-page",
        component:RestaurantDetailsPage,
       
    },
     {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundPage,
    }
    ],
    
});

export { router };