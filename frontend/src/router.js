import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Bag from "./views/Bag.vue";
import Accessory from "./views/Accessory.vue";
import Product from "./views/ProductDescription.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/bag",
      name: "bag",
      component: Bag
    },
    {
      path: "/accessory",
      name: "accessory",
      component: Accessory
    },
    {
      path: "/product/:id",
      name: "product_description",
      component: Product
    },
    // {
    //   path: "/contact",
    //   name: "contact",
    //   component: Contact
    // },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
