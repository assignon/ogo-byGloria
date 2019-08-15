import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
    allProducts: []
  },

  mutations: {
    storeproducts(state, data) {
      state.allProducts.push(data);
    },

    displayIcons() {
      let currentProduct = event.currentTarget.children;
      let iconContainer = document.querySelectorAll(".icon-container");

      for (let i = 0; i < currentProduct.length; i++) {
        currentProduct[i].style.display = "flex";
        currentProduct[i].classList.remove("bounceOut");
        currentProduct[i].classList.add("bounceIn");
        currentProduct[i].style.animationDelay = `${i / 20}s`;
      }
    },

    hideIcons() {
      let currentProduct = event.currentTarget.children;

      for (let i = 0; i < currentProduct.length; i++) {
        currentProduct[i].classList.remove("bounceIn");
        currentProduct[i].classList.add("bounceOut");
        currentProduct[i].style.animationDelay = `${i / 100}s`;
      }
    }
  },

  actions: {}
});
