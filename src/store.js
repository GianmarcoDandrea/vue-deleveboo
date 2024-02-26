import { reactive } from "vue";

export const store = reactive({
  baseUrl: "http://127.0.0.1:8000",
  loginUrl:"http://127.0.0.1:8000/login",
  registerUrl: "http://127.0.0.1:8000/register",

  cart: [
    {
      id: 1,
      restaurant_id: 1,
      name: "Pizza Margherita",
      description: "natoque penatibus et magnis dis parturient.",
      slug: "pizza-margherita-1-8e718",
      image: "https://images.ctfassets.net/nw5k25xfqsik/64VwvKFqxMWQORE10Tn8pY/200c0538099dc4d1cf62fd07ce59c2af/20220211142754-margherita-9920.jpg?w=1024",
      price: "8.00",
      is_visible: 1,
      created_at: "2024-02-26 09:44:56",
      updated_at: "2024-02-26 09:44:56",
      count: 2,
    },
    {
      id: 3,
      restaurant_id: 1,
      name: "Lasagna bianca vegetariana",
      description: "rhoncus dui vel sem sed sagittis nam congue risus",
      slug: "lasagna-bianca-vegetariana-1-ad3ed",
      image: "https://www.nonsprecare.it/wp-content/uploads/2014/12/ricetta-lasagna-vegetariana-bianca.jpg",
      price: "12.00",
      is_visible: 1,
      created_at: "2024-02-26 09:44:57",
      updated_at: "2024-02-26 09:44:57",
      count: 2,
    }]
});