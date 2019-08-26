import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    HOST: "http://127.0.0.1:8000",
    DOMAIN:
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      window.location.port,
    MEDIA_ROOT: "http://127.0.0.1:8000/media",
    allProducts: [],
    viewedProduct: undefined,
    relatedProduct: []
  },

  mutations: {
    storeproducts(state, data) {
      state.allProducts.push(data);
    },

    productDescription(state, productId) {
      // let currentProduct = event.currentTarget.id;
      let currentProduct = productId;
      axios
        .get(`${state.HOST}/product/product_description/`, {
          params: {
            productId: currentProduct
          }
        })
        .then(response => {
          state.viewedProduct = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    relatedProduct(state, productId) {
      let self = this;
      axios
        .get(`${state.HOST}/product/related_product/`, {
          params: {
            productId: productId
          }
        })
        .then(response => {
          if (state.relatedProduct.length == 0) {
            response.data.forEach(item => {
              state.relatedProduct.push(item);
            })
            // console.log(state.relatedProduct);
          }
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  actions: {}
});
