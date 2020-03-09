<template>
  <div class="product">
    <div
      class="product-src"
      :style="{
        backgroundImage: `url(${$store.state.MEDIA_ROOT}/${productImage})`
      }"
      @mouseover="displayIcons()"
      @mouseout="hideIcons()"
      @click="
        $router.push(`/product/${productName}-${productId}`),
          thumbmails(),
          $store.commit('productDescription', $route.params.id),
          $store.commit('relatedProduct', $route.params.id),
          $store.commit('scrollTopAnimation')
      "
    >
      <v-tooltip left color="#fff">
        <template v-slot:activator="{ on }">
          <div
            v-on="on"
            :id="productId"
            @click.stop="addtoCart(productName + '-' + productId)"
            class="icon-container animated"
          >
            <v-icon>fas fa-cart-plus</v-icon>
          </div>
        </template>
        <span class="likes-tooltip">Ajouter au panier</span>
      </v-tooltip>

      <v-tooltip left color="#fff">
        <template v-slot:activator="{ on }">
          <div
            v-on="on"
            :id="productId"
            @click.stop="
              $router.push(`/product/${productName}-${productId}`),
                thumbmails(),
                $store.commit('productDescription', $route.params.id),
                $store.commit('relatedProduct', $route.params.id),
                $store.commit('scrollTopAnimation')
            "
            class="icon-container animated"
          >
            <v-icon>fas fa-eye</v-icon>
          </div>
        </template>
        <span class="likes-tooltip">Apercu rapide</span>
      </v-tooltip>

      <v-tooltip left color="#fff">
        <template v-slot:activator="{ on }">
          <div
            v-on="on"
            :id="productId"
            @mouseover="showSocials()"
            @mouseout="hideSocials()"
            class="icon-container share-container animated"
          >
            <div class="socials animated">
              <a
                href="`https://twitter.com/intent/tweet?text=Sac%20a%20main%20${$store.state.viewedProduct.product_name}%20hiper%20tadant%20a%20-%20prix%20tres%20abordable%20${$store.state.HOST}${$store.state.viewedProduct.product_image}`"
                target="_blank"
                ><v-icon>fab fa-twitter-square</v-icon></a
              >
            </div>
            <div class="socials ma-3 animated">
              <a href="" target="_blank"
                ><v-icon>fab fa-facebook-square</v-icon></a
              >
            </div>
            <div><v-icon>fas fa-share-alt</v-icon></div>
          </div>
        </template>
        <span class="likes-tooltip">partager</span>
      </v-tooltip>

      <v-tooltip class="tooltip-container" left color="#fff">
        <template v-slot:activator="{ on }">
          <div
            v-on="on"
            :id="productId"
            @click.stop="
              $store.commit('addLike', {
                productId: productId,
                userId: $store.state.getuserId
              }),
                $store.commit('showModal', {
                  modalId: 'notificationModal',
                  top: '70px'
                })
            "
            @mouseover="$store.commit('getLikes', productId)"
            class="icon-container animated"
          >
            <v-icon>fas fa-heart</v-icon>
          </div>
        </template>
        <span class="likes-tooltip" :name="productId">{{
          $store.state.likes
        }}</span>
      </v-tooltip>
    </div>
    <p class="mt-2">{{ productName }}</p>
    <p class="font-weight-bold">{{ productPrice }},00€</p>
  </div>
</template>

<script>
export default {
  // name: prod,

  // props: {
  //     // productArr: Array,
  //     productImage: Object,
  //     productName: String,
  //     productPrice: String
  // },

  props: [
    "productImage",
    "productName",
    "productPrice",
    "productId",
    "thumbmailsArr"
  ],

  data() {
    return {};
  },

  created() {
    this.$store.commit("productsImgs", {
      prodid: this.$route.params.id.split("-")[1],
      arr: this.thumbmailsArr
    });
  },

  mounted() {
    this.$store.commit("getUserId", this.$session);
  },

  methods: {
    thumbmails() {
      this.$store.commit("productsImgs", {
        prodid: this.productId,
        arr: this.thumbmailsArr
      });
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
    },

    addtoCart(productId) {
      if (this.$session.get("auth")) {
        this.$store.commit("addToCart", {
          productId: productId,
          quantity: 1,
          userId: this.$session.get("userId")
        });
      } else {
        let generatedStr = btoa(Math.random()).substring(0, 25);
        let generatedNum = Math.floor(Math.random() * 16) + 5;
        let generatedId = generatedNum + generatedStr;

        if (!this.$session.has("shoppingSession")) {
          this.$session.set("shoppingSession", generatedId);
        }
        this.$store.state.shoppingId = this.$session.get("shoppingSession");
        this.$store.commit("addToCart", {
          productId: productId,
          quantity: 1,
          userId: this.$session.get("shoppingSession")
        });
      }
    },

    showSocials() {
      let socials = document.querySelectorAll(".share-container .socials");
      for (let i = 0; i < socials.length; i++) {
        socials[i].style.display = "flex";
        // socials[i].classList.remove('bounceOut')
        // socials[i].style.animationDelay = i*200

        // setTimeout(function(){
        //   socials[i].classList.add('bounceIn')
        // }, 100)
      }
    },

    hideSocials() {
      let socials = document.querySelectorAll(".share-container .socials");
      for (let i = 0; i < socials.length; i++) {
        // socials[i].classList.remove('bounceIn')
        // socials[i].style.animationDelay = i*200
        socials[i].style.display = "none";

        // setTimeout(function(){
        //   socials[i].classList.add('bounceOut')
        // }, 100)

        // setTimeout(function(){
        //   socials[i].style.display = 'none'
        // }, 500)
      }
    }
  }
};
</script>

<style scoped>
.product {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.product .product-src {
  width: 100%;
  height: 400px;
  background-position: center;
  background-size: cover;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  border-radius: 100%;
  background-color: #fff;
  width: 40px;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  display: none;
}

.share-container {
  width: auto;
  border-radius: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* padding-left: 5px;
  padding-right: 5px; */
}

.share-container div {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  /* margin: 5px; */
  /*border: 1px solid #eeeeee;*/
  /* background-color: #F5F5F5; */
}

.share-container div a {
  text-decoration: none;
}

.icon-container .v-icon {
  width: 100%;
  height: 100%;
  font-size: 20px;
  color: #8b53ff;
}

.share-container .socials {
  display: none;
}

.icon-container .v-icon:hover {
  transform: scale(1.1, 1.1);
  /*color: #8B53FF;*/
}

.product .product-src .v-icon {
  /* color: #FB8C00; */
  /* color: transparent; */
  font-size: 20px;
  text-align: center;
}

.product p {
  font-size: 16px;
  text-align: left;
  margin: 0px;
  color: black;
}

.likes-tooltip {
  color: #8b53ff;
  font-weight: bold;
}

@media only screen and (max-width: 500px) {
  .product {
    width: 95%;
  }
}
</style>
