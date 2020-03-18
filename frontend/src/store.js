import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    HOST:
      window.location.hostname != "127.0.0.1"
        ? "http://localhost:8080"
        : "https://yanick007.pythonanywhere.com",

    MEDIA_ROOT:
      window.location.hostname != "127.0.0.1"
        ? "http://localhost:8080/media"
        : "https://yanick007.pythonanywhere.com/media",

    //facebook twitter etc...
    SHARE_HOST:
      window.location.hostname == "127.0.0.1"
        ? "http://localhost:8080"
        : "yanick007.pythonanywhere.com",

    DOMAIN:
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      window.location.port,
    //
    // HOST:
    //   window.location.port != ""
    //     ? window.location.protocol +
    //       "//" +
    //       window.location.hostname +
    //       ":" +
    //       window.location.port
    //     : window.location.protocol + "//" + window.location.hostname,
    //
    // MEDIA_ROOT:
    //   window.location.port != ""
    //     ? window.location.protocol +
    //       "//" +
    //       window.location.hostname +
    //       ":" +
    //       window.location.port + "/media"
    //     : "https://ogo-bygloria-s3.s3.amazonaws.com/media",

    cartDrawer: false, //cart nav drawer ctrl

    AUTHENTICATED: undefined,
    userId: undefined,
    shoppingId: undefined, //temporary id when user is not logged and destroy when the user logged of purchase
    getuserId: '',
    allProducts: [],
    viewedProduct: undefined,
    relatedProduct: [],
    cartContent: [],
    productQtyValue: 1,
    numberOfProduct: null, //number of product added to the cart
    productSum: [], // store the multiplication of the product price en qty
    productTotal: 0, // sum of all product in the cart
    thumbmailsArr: [],
    likes: null
  },

  mutations: {
    authSession(state) {
      axios
        .get(`${state.HOST}/api/account/auth_session/`)
        .then(response => {
          state.AUTHENTICATED = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    getUserId(state, session){
      let userId
      if (session.get("auth")) {
        userId = session.get("userId");
      } else {
        userId = session.get("shoppingSession");
      }
      state.getuserId = userId
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
        .get(`${state.HOST}/api/product/product_description/`, {
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

    productsImgs(state, param) {
      let self = this;
      axios
        .get(`${state.HOST}/api/product/product_thumbmail/`, {
          params: {
            productId: param.prodid
          }
        })
        .then(response => {
          if (param.arr.length != 0) {
            param.arr.length = 0;
          }

          response.data.forEach(item => {
            param.arr.push(item);
          });
          // state.thumbmailsArr.push(response.data)

          console.log(param.arr);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    relatedProduct(state, productId) {
      let self = this;
      let currentProduct = productId.split("-");
      axios
        .get(`${state.HOST}/api/product/related_product/`, {
          params: {
            productId: currentProduct[1]
          }
        })
        .then(response => {
          if (state.relatedProduct.length == 0) {
            response.data.forEach(item => {
              state.relatedProduct.push(item);
            });
          } else {
            state.relatedProduct.length = 0;
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
        .get(`${state.HOST}/api/cart/add_to_cart/`, {
          params: {
            productId: currentProduct[1],
            quantity: productData.quantity,
            userid: productData.userId
          }
        })
        .then(response => {
          state.productTotal = response.data.total;
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

          state.productQtyValue = 1;

          console.log(response.data.msg);
        })
        .catch(error => {
          console.log(error);
        });
    },

    fetchCartContent(state, param) {
      let self = this;
      axios
        .get(`${state.HOST}/api/cart/cart_content/`, {
          params: {
            shoppingSession: param.userId
          }
        })
        .then(response => {
          state.productTotal = response.data.total;
          if (param.arr == 0) {
            response.data.products.forEach(item => {
              param.arr.push(item);
            });

            // param.arr.forEach(item => {
            //  let multiply = item.fields.quantity * item.fields.price;
            //  state.productSum.push(multiply);
            // });
          }

          // console.log(response.data.total);

          if (state.cartContent.length == 0) {
            // response.data.products.forEach(item => {
            //   state.cartContent.push(item);
            // });
            // state.cartContent.forEach(item => {
            //   let multiply = item.fields.quantity * item.fields.price;
            //   state.productSum.push(multiply);
            // });
          }
          // state.productTotal = state.productSum.reduce(function(total, num) {
          //     return total + num;
          // });
          // for (let i = 0; i < state.productSum.length; i++) {
          //   state.productTotal += state.productSum[i]
          // }
        })
        .catch(error => {
          console.log(error);
        });
    },

    updateCart(state, param) {
      axios
        .get(`${state.HOST}/api/cart/update_cart/`, {
          params: {
            newQty: param.newQty,
            productId: param.productId,
            shoppingSession: param.userId
          }
        })
        .then(response => {
          // state.productTotal = response.data.total
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    removeToCart(state, productId) {},

    addLike(state, param) {
      axios
        .get(`${state.HOST}/api/product/add_likes/`, {
          params: {
            productId: param.productId,
            userId: param.userId
          }
        })
        .then(response => {
          if (response.data.liked){
            //already likes
            console.log(response.data)
          }else{
            state.likes = response.data.likes
            state.viewedProduct.likes = response.data.likes
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    getLikes(state, productId) {
      let self = this;
      axios
        .get(`${state.HOST}/api/product/get_likes/`, {
          params: {
            productId: productId,
          }
        })
        .then(response => {
          state.likes = response.data
          // console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
    },

    addComment(state, params){
      axios
        .post(`${state.HOST}/api/product/add_comment/`, {
          params: {
             productId: params.productId,
            userId: params.userId,
            comment: params.comment
          }
        })
        .then(response => {
          console.log(response)
          params.arr.length > 0 ? params.arr.push(response.data) : params.arr = []
        })
        .catch(error => {
          console.log(error);
        });
    },

    getComments(state){

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

    scrollTopAnimation() {
      let scrollValue = document.documentElement.scrollTop;
      while (document.documentElement.scrollTop > 0) {
        document.documentElement.scrollTop--;
      }
    }
  },

  actions: {}
});
