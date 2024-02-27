import { createRouter, createWebHistory} from "vue-router";
import HomePage from "./pages/HomePage.vue";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage.vue";
import CheckoutPage from "./components/CheckoutPage.vue";
//import RestaurantsList from "./pages/RestaurantsList.vue";
import NotFoundPage from "./pages/NotFoundPage.vue"


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
    // {
    //     path:"/restaurants",
    //     name:"restaurantsList",
    //     component: RestaurantsList,
    // },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundPage,
    },
    {
        path: '/payments/:slug',
        name: 'payments',
        component: CheckoutPage,
    }
    ],
    
});

export { router };