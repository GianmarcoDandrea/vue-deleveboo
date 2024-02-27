import { reactive } from "vue";

export const store = reactive({
  baseUrl: "http://127.0.0.1:8000",
  loginUrl:"http://127.0.0.1:8000/login",
  registerUrl: "http://127.0.0.1:8000/register",

  cart: []
});