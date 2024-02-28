import { createRouter, createWebHistory} from "vue-router";
import HomePage from "./pages/HomePage.vue";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue"
import CheckoutPage from "./pages/CheckoutPage.vue"


const router = createRouter({
    history: createWebHistory(),
    routes: [
    {
        path: "/",
        name: "home",
        component: HomePage,
       
    },
    {
        path: "/restaurants/:slug",
        name: "restaurant-details-page",
        component: RestaurantDetailsPage,
       
    },
    {
        path:"/payments",
        name:"payments",
        component: PaymentPage,
        props: true
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundPage,
    },
    ],
    
});

export { router };