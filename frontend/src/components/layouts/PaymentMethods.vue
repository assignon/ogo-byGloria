<template>
  <div class="paymenthods-core">
    <v-layout justify-center align-center class="paymethods-layout">

      <v-flex xs12 sm12 md6 lg6 xl6 class="cartinfo-flex pt-5 pb-5">
        <v-icon large color="#8B53FF" style="margin-top: 50px;" class="">fas fa-shopping-basket</v-icon>
        <p style="margin: auto; margin-top: 0px;" class="font-weight-bold mb-5 mt-2">
          Contenu de votre panier <span>(€</span>
          <span class="products-total-price font-weight-bold">{{
            $store.state.productTotal
          }})</span>
        </p>

        <div class="cart-items" v-for="(product, i) in cartItems" :key="i">
          <div
            :style="{
              backgroundImage: `url(${$store.state.MEDIA_ROOT}/${
                product.fields.image
              })`
            }"
            class="product-img"
          ></div>

          <p class="mt-5 ml-5 font-weight-bold" style="">
            {{ product.fields.name }}
          </p>

          <p class="mt-5 ml-5 font-weight-bold" style="">
            €{{ product.fields.price }}
          </p>
        </div>
      </v-flex>

      <v-flex xs12 sm12 md6 lg6 xl6 class="paymethods-flex pt-5 pb-5">
        <v-icon large color="white">fas fa-credit-card</v-icon>
        <p style="margin: auto; margin-bottom: 20px;color: white;" class="font-weight-bold">
          Choissisez votre moyen de paiement
        </p>

        <a :href="`${paymentRedirectLink}`" style="text-decoration: none;">
          <div class="purchase-methods pm1">
            <div class="paypal-pay pb-5 pt-5">
              <v-icon large>fab fa-paypal</v-icon>
              <p
                style="font-size: 15px;position: relative; top: 10px;font-weight: bold"
                class="ml-5"
              >
                PayPal
              </p>
              <!--            <v-radio-group v-model="radios" column>-->
              <!--              <v-radio label="PayPal" color="white" value="paypal"></v-radio>-->
              <!--              <v-icon medium></v-icon>-->
              <!--            </v-radio-group>-->
            </div>
            <v-icon medium class="gopay">fas fa-angle-right</v-icon>
          </div>
        </a>

        <div class="purchase-methods mb-5 pm2">
          <div class="master-pay pb-5 pt-5">
            <v-icon large>fab fa-cc-mastercard</v-icon>
            <p
              style="font-size: 15px;position: relative; top: 10px;font-weight: bold"
              class="ml-5"
            >
              Master-Cart
            </p>
          </div>
          <v-icon medium class="gopay">fas fa-angle-right</v-icon>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "PayementMethods",

  props: ["cartItems", "paymentRedirectLink"],

  data() {
    return {
      radios: "white"
      // cartItems: []
    };
  },

  created() {},

  methods: {}
};
</script>

<style scoped>
.paymenthods-core {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  padding-bottom: 30px;
  margin: auto;
}

.paymethods-layout {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 80%;
  height: auto;
}

.cartinfo-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 350px;
  /*max-height: ;*/
  border: 1px solid #e0e0e0;
  border-radius: 3px 0px 0px 3px;
  background-color: #e0e0e0;
  overflow-y: scroll;
}

.cart-items {
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  margin: auto;
   margin-top: 5px;
  border-bottom: 1px solid white;
}

.product-img {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 50px;
  height: 50px;
  border-radius: 3px;
}

.paymethods-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 350px;
  border: 1px solid #8b53ff;
  border-radius: 0px 3px 3px 0px;
  background-color: #8b53ff;
}

.purchase-methods {
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #171a3d;
  align-content: center;
  border: 1px solid #171a3d;
  margin: auto;
}

.pm1 {
  border-radius: 3px 3px 0px 0px;
}

.pm2 {
  border-radius: 0px 0px 3px 3px;
  border-top: 1px solid #8b54ff;
  position: relative;
  bottom: 25px;
}

.paypal-pay,
.master-pay {
  width: 78%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  cursor: pointer;
}

.paypal-pay p, .paypal-pay .v-icon, .master-pay p, .master-pay .v-icon, .gopay{
  color: white;
}

.paypal-pay:hover .v-icon, .master-pay:hover .v-icon
{
  color: #8b54ff;
}

@media only screen and (max-width: 500px) {

}
</style>
