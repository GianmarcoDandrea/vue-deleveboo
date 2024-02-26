import { createRouter, createWebHistory} from "vue-router";
import HomePage from "./pages/HomePage.vue";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage.vue";
import RestaurantsList from "./pages/RestaurantsList.vue";
import NotFoundPage from "./pages/NotFoundPage.vue"


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
        path: "/restaurants",
        name: "restaurants-list",
       component: RestaurantsList,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundPage,
    },
    ],
    
});

export { router };