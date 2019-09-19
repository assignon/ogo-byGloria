import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    HOST: window.location.hostname == 'localhost' ? "http://127.0.0.1:8000" : "http://yanick007.pythonanywhere.com",
    DOMAIN:
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      window.location.port,
    MEDIA_ROOT: "http://127.0.0.1:8000/media",
    AUTHENTICATED: undefined,
    userId: undefined,
    shoppingId: undefined, //temporary id when user is not logged eand destroy when the user logged of purchase
    allProducts: [],
    viewedProduct: undefined,
    relatedProduct: [],
    cartContent: [],
    numberOfProduct: null, //number of product added to the cart
    productSum: [], // store the multiplication of the product price en qty
    productTotal: undefined // sum of all product in the cart
  },

  mutations: {
    authSession(state) {
      axios
        .get(`${state.HOST}/account/auth_session/`)
        .then(response => {
          state.AUTHENTICATED = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    storeproducts(state, data) {
      state.allProducts.push(data);
    },

    getProductId(state, param) {
      let id = param.split("-");
      return id[1];
    },

    productDescription(state, productId) {
      // let currentProduct = event.currentTarget.id;
      // let currentProduct = productId;
      let currentProduct = productId.split("-");
      axios
        .get(`${state.HOST}/product/product_description/`, {
          params: {
            productId: currentProduct[1]
          }
        })
        .then(response => {
          state.viewedProduct = response.data;
          // console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    relatedProduct(state, productId) {
      let self = this;
      let currentProduct = productId.split("-");
      axios
        .get(`${state.HOST}/product/related_product/`, {
          params: {
            productId: currentProduct[1]
          }
        })
        .then(response => {
          if (state.relatedProduct.length == 0) {
            response.data.forEach(item => {
              state.relatedProduct.push(item);
            });
          }else{
            state.relatedProduct.length = 0
            response.data.forEach(item => {
              state.relatedProduct.push(item);
            });
          }
          // console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    addToCart(state, productData) {
      let currentProduct = productData.productId.split("-");
      let cartBadget = document.querySelector(".cart-badget");
      let cartBadgetSeconde = document.querySelector(".cart-badget-seconde");
      axios
        .get(`${state.HOST}/cart/add_to_cart/`, {
          params: {
            productId: currentProduct[1],
            quantity: productData.quantity,
            userid: productData.userId
          }
        })
        .then(response => {
          cartBadget.classList.add("swing");
          cartBadgetSeconde.classList.add("swing");
          // cartBadgetValue.textContent += 1
          setTimeout(function() {
            cartBadget.classList.remove("swing");
            cartBadgetSeconde.classList.remove("swing");
          }, 1000);
          if (!response.data.exist) {
            state.numberOfProduct += 1;
          }
          console.log(response.data.msg);
        })
        .catch(error => {
          console.log(error);
        });
    },

    fetchCartContent(state, userId) {
      let self = this;
      axios
        .get(`${state.HOST}/cart/cart_content/`, {
          params: {
            shoppingSession: userId
          }
        })
        .then(response => {
          if (state.cartContent.length == 0) {
            response.data.forEach(item => {
              state.cartContent.push(item);
            });

            state.cartContent.forEach(item => {
              let multiply = item.fields.quantity * item.fields.price;
              state.productSum.push(multiply);
            });
            state.productTotal = state.productSum.reduce(function(total, num) {
              return total + num;
            });
          }
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    updateCart(state, productId) {},

    removeToCart(state, productId) {},

    addLike(state) {
      alert("like added");
    },

    showModal(state, param) {
      let modal = document.querySelector("#" + param.modalId);
      modal.classList.remove("bounceOutUp");

      setTimeout(function() {
        modal.classList.add("bounceInDown");
        modal.style.top = param.top;
      }, 10);
    },

    hideModal(state, param) {
      let modal = document.querySelector("#" + param.modalId);
      modal.classList.remove("bounceInDown");

      setTimeout(function() {
        modal.classList.add("bounceOutUp");
      }, 10);

      setTimeout(function() {
        modal.style.top = param.top;
      }, 1000);
    },

    showOnlySecondMenu() {
      let scrollNavLayout = document.querySelector(".scroll-nav-layout");
      let navLayout = document.querySelector(".nav-layout");

      scrollNavLayout.style.opacity = "1";
      navLayout.style.display = "none";

      window.addEventListener("scroll", function() {
        let scrollValue = document.documentElement.scrollTop;
        if (scrollValue < 100) {
          scrollNavLayout.style.opacity = "1";
        } else {
          scrollNavLayout.style.opacity = "1";
        }
      });
    },

    showMenus() {
      let scrollNavLayout = document.querySelector(".scroll-nav-layout");
      let navLayout = document.querySelector(".nav-layout");

      navLayout.style.display = "flex";
      window.addEventListener("scroll", function() {
        let scrollValue = document.documentElement.scrollTop;
        if (scrollValue >= 100) {
          scrollNavLayout.style.transition = "opacity 0.5s linear 0.1s";
          scrollNavLayout.style.opacity = scrollValue / 150;
          scrollNavLayout.classList.add("slideInDown");
        } else if (scrollValue < 100) {
          scrollNavLayout.style.opacity = "0";
        }
      });
    },

    scrollTopAnimation(){
      let scrollValue = document.documentElement.scrollTop
      while (document.documentElement.scrollTop > 0) {
        document.documentElement.scrollTop--
      }
    }
  },

  actions: {}
});
