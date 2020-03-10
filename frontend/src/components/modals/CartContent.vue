<template>
  <v-navigation-drawer
    v-model="$store.state.cartDrawer"
    fixed
    top
    right
    height="100vh"
    :width="cartLen"
    temporary
    stateless
    class="cart-drawer"
  >
    <!--        <div class="cart-content-core animated" id="cartModal">-->
    <v-layout
      align-center
      class="cart-content-layout full-cart-layout"
      column
      justify-center
      v-if="$store.state.numberOfProduct != 0"
    >
      <v-flex class="cart-header-flex mb-5" lg12 md12 sm12 xl12 xs12>
        <div class="cart-title mb-3">
          <h3 class="font-weight-bold animated fadeInUp">Votre panier</h3>
          <v-divider
            color="#000"
            style="width:10%;margin-left: 30px;"
          ></v-divider>
        </div>
        <div @click="closeCart()" class="close-cart">
          <v-icon small>fas fa-times</v-icon>
        </div>
      </v-flex>

      <v-flex class="cart-content-flex" lg12 md12 sm12 xl12 xs12>
        <div
          :key="i"
          class="cart-content-container"
          v-for="(product, i) in cartcontent"
        >
          <div
            class="cart-content animated fadeInUp"
            :style="{ animationDelay: i / 5 + 's' }"
          >
            <div class="img-name">
              <div class="tables imgname-table" style="">
                <div
                  :style="{
                    backgroundImage: `url(${$store.state.MEDIA_ROOT}/${
                      product.fields.image
                    })`
                  }"
                  class="product-img"
                ></div>
              </div>
              <div class="tables hidden-sm-and-down" style="width: 70%;">
                <p class="mt-5 font-weight-bold" style="">
                  {{ product.fields.name }}
                </p>
              </div>
            </div>
            <div class="tables price-table" style="">
              <p class="mt-5 font-weight-bold" style="">
                €{{ product.fields.price }}
              </p>
            </div>
            <div class="tables qty-table" style="">
              <ProductQtyCtrl
                      :productQty="product.fields.quantity"
                      @updateProductQty="updateQty(product.fields.price, product.pk)"
              />
            </div>
            <div class="tables mr-5" style="justify-content: flex-end;">
              <p class="qty-price font-weight-bold mt-5">
                <span>€</span>
                <span :id="product.pk">{{
                  product.fields.price * product.fields.quantity
                }}</span>
              </p>
            </div>
            <div
              :id="product.pk"
              @click="delProduct(product.pk)"
              class="tables del-table"
              style="width: 10%;"
            >
              <v-icon class="del-product" small>fas fa-times</v-icon>
            </div>
          </div>
          <v-divider
            :style="{ animationDelay: `${i * 250}` }"
            style="width:80%"
            color="#eee"
            class="mt-3 mb-3 animated fadeInUp"
          ></v-divider>
        </div>
      </v-flex>
      <v-flex class="total-flex mt-1 mb-5" lg12 md12 sm12 xl12 xs12>
        <h4>Total:</h4>
        <h3 class="total-price font-weight-bold pl-2 animated">
          <span>€</span>
          <span class="products-total-price">{{
            $store.state.productTotal
          }}</span>
        </h3>
      </v-flex>

      <v-flex class="cart-footer-flex pt-3 pb-3" lg12 md12 sm12 xl12 xs12>
        <router-link class="" style="text-decoration: none;" to="/order/1">
          <v-btn
            @click="closeCart()"
            color="#814DED"
            depressed
            height="40"
            medium
          >
            Commander
          </v-btn>
        </router-link>
      </v-flex>
    </v-layout>

    <v-layout
      align-center
      class="cart-content-layout empty-cart-layout"
      column
      justify-center
      v-else
    >
      <v-flex class="cart-header-flex mb-5" lg12 md12 sm12 xl12 xs12>
        <div class="cart-title mb-3">
          <h3 class="font-weight-bold animated fadeInUp">Votre panier</h3>
          <v-divider
            color="#000"
            style="width:10%;margin-left: 30px;"
          ></v-divider>
        </div>
        <div @click="closeCart()" class="close-cart">
          <v-icon small>fas fa-times</v-icon>
        </div>
      </v-flex>

      <div class="cart-empty">
        <v-icon color="#B39DDB">fas fa-shopping-basket</v-icon>
        <h3 class="font-weight-bold animated fadeInUp">
          Votre panier est vide pour l'instant
        </h3>
      </div>
    </v-layout>
    <!--        </div>-->
  </v-navigation-drawer>
</template>

<script>
import ProductQtyCtrl from "../../components/layouts/ProductQtyCtrl";

export default {
  name: "cartContent",

  props: ["drawer", "cartcontent"],

  components: {
    ProductQtyCtrl: ProductQtyCtrl
  },

  data() {
    return {
      cartcontent: true, //false ? cart is empty : cart is't empty
      group: null,
      cartCount: this.$store.state.numberOfProduct,
      productQty: 1,
      cartLen: "45%"
      // drawer: false
      // newQty: 1
    };
  },

  watch: {
    group() {
      this.drawer = false;
    }
  },

  created() {},

  mounted() {
    this.mobileCartLen();
  },

  methods: {
    delProduct(id) {
      let self = this;
      let product = event.currentTarget.parentNode.parentNode;
      let productId = event.currentTarget.id;
      let produtPrice =
        event.currentTarget.parentNode.childNodes[4].childNodes[0].textContent; //return the prive with €
      let getPrice = produtPrice.slice(1, produtPrice.length); //return the price without €
      let totalPrice = document.querySelector(".total-price");
      let productstotalPrice = document.querySelector(".products-total-price");
      let qtyPrice = document.getElementById(id).textContent;

      product.classList.add("bounceOutLeft");
      totalPrice.classList.add("rubberBand");
      // productstotalPrice.textContent = parseInt(productstotalPrice.textContent) - parseInt(qtyPrice)
      this.$store.state.productTotal -= parseInt(qtyPrice);

      setTimeout(function() {
        product.style.display = "none";
        totalPrice.classList.remove("rubberBand");
      }, 700);

      // if (parseInt(productstotalPrice.textContent) == 0) {
      //   self.$store.state.cartContent.length = 0;
      //   let cartContent = document.querySelector('.full-cart-layout')
      // }

      //remove in db
      this.$axios
        .get(`${this.$store.state.HOST}/api/cart/remove_to_cart/`, {
          params: {
            productId: productId,
            userId: this.$session.get("auth")
              ? this.$session.get("userId")
              : this.$session.get("shoppingSession")
          }
        })
        .then(response => {
          self.$store.state.productTotal = response.data.total;
          self.$store.state.numberOfProduct -= 1;
          if (this.$store.state.numberOfProduct == 0) {
            this.$store.state.productQtyValue = 1;
          }

          this.cartCount = response.data.count;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    //update product qty in db
    updateQty(price, id) {
      let qty = parseInt(
        event.currentTarget.parentNode.childNodes[1].textContent
      );
      let updatedQty
      let qtyPrice = document.getElementById(id);
      let totalPrice = document.querySelector(".products-total-price"); // get current total price html element
      let userid = this.$session.get("auth")
        ? this.$session.get("userId")
        : this.$session.get("shoppingSession");

      if (event.currentTarget.id == "plus") {
        updatedQty = qty+1
        event.currentTarget.parentNode.childNodes[1].innerHTML = qty + 1
        qtyPrice.innerHTML = updatedQty * price;
        // totalPrice.textContent = parseInt(totalPrice.textContent) + price;
        this.$store.state.productTotal += price;
        this.$store.commit("updateCart", {
          newQty: qty,
          productId: id,
          userId: userid
        });
      } else {
        if (qty > 1) {
          updatedQty = qty-1
          event.currentTarget.parentNode.childNodes[1].innerHTML = qty - 1
          qtyPrice.textContent = updatedQty * price;
          // totalPrice.textContent = parseInt(totalPrice.textContent) - price;
          this.$store.state.productTotal -= price;
          this.$store.commit("updateCart", {
            newQty: qty,
            productId: id,
            userId: userid
          });
        }
      }
    },

    mobileCartLen() {
      let windowLen = window.outerWidth;
      if (windowLen < 800) {
        this.cartLen = "100%";
      }
    },

    closeCart() {
      this.$store.state.cartDrawer = false;
      this.cartcontent.length = 0;
      console.log(this.cartcontent.length);
      this.$store.state.productSum.length = 0;
    }
  }
};
</script>

<style scoped>
.cart-content-core {
  width: 100%;
  height: auto;
  /*max-height: 500px;*/
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  /*border-radius: 3px;*/
  /*box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);*/
  /*position: fixed;*/
  /*margin: auto;*/
  /*right: 20%;*/
  /*top: -550px;*/
  border: 1px solid blue;
  z-index: 10;
}

.cart-drawer {
  /*width: 70%;*/
  /* height: auto; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /*padding-left: 20px;*/
  top: 0px;
  z-index: 10;
  margin: 0px;
  padding: 0px;
}

.cart-content-layout {
  width: 570px;
  height: auto;
}

.cart-header-flex {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.cart-title {
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
}

.cart-title h3 {
  text-align: center;
  margin-left: 30px;
}

.close-cart {
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  bottom: 10px;
}

.close-cart:hover .v-icon {
  color: red;
  transform: scale(1.1, 1.1);
}

.cart-content-flex {
  width: 100%;
  height: auto;
  /*max-height: 400px;*/
  /*overflow-y: scroll;*/
  /*overflow-x: hidden;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cart-content-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cart-content {
  width: 95%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: auto;
}

.img-name {
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.img-name .tables {
  /* width: 50%; */
  /* height: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: auto; */
}

.tables {
  width: 20%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
}

.product-img {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 50px;
  height: 50px;
  border-radius: 3px;
}

.total-flex {
  width: 75%;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.del-product {
  cursor: pointer;
}

.del-product:hover {
  color: red;
}

.imgname-table{
  width: 15%;
}

.price-table{
  width: 10%;
}

.qty-table{
  width: 20%;
}

.total-flex h3 {
  /* color: #FFA726; */
}

.total-flex h4 {
  /* color: #FFA726; */
}

.cart-footer-flex {
  width: 90%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
}

.cart-footer-flex .v-btn {
  text-transform: capitalize;
  font-size: 17px;
  font-weight: bold;
  color: white;
}

.cart-empty {
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.cart-empty .v-icon{
  font-size: 100px;
}

@media only screen and (max-width: 500px) {
  .cart-content-core {
    width: 100%;
    right: 0px;
    overflow-x: hidden;
  }

  .cart-drawer {
    width: 100%;
  }

  .close-cart {
    right: 110px;
    top: 1px;
  }

  .cart-content-flex {
    width: 90%;
  }

  .img-name{
    width: auto;
    height: auto;
    justify-content: flex-end;
    position: relative;
    left: 60px;
  }

  .imgname-table{
    width: 50px;
    height: 50px;
  }

  .product-img {
    width: 50px;
    height: 50px;
    background-size: contain;
    border: 1px solid black;
  }

  .price-table, .qty-table{
    position: relative;
    left: 45px;
  }

  .del-table{
    position: relative;
    right: 5px;
  }

  .price-table, .qty-table {
    width: 10%;
  }

  .qty-table{
    margin-left: -10px;
  }

  .total-flex, .cart-footer-flex{
    width: 60%;
  }


  /*.img-name {*/
  /*  flex-direction: column;*/
  /*  width: 40%;*/
  /*  align-items: center;*/
  /*}*/
}
</style>
