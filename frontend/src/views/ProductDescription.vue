<template>
  <div class="description-core">
    <v-layout row wrap justify-center align-center class="desc-layout mb-5">
      <v-flex xs12 sm7 md7 lg7 xl7 class="product-desc-flex">
        <div class="product-img">
          <div class="sub-img">
            <div
              v-for="(thumb, i) in thumbmailsArr"
              :key="i"
              :style="{
                backgroundImage: `url(${$store.state.MEDIA_ROOT}/${
                  thumb.fields.images
                })`
              }"
              @click="viewImage(thumb.fields.images)"
            ></div>
          </div>
          <div
            class="product-overlay animated zoomIn"
            :style="{
              backgroundImage: `url(${
                $store.state.viewedProduct.product_image
              })`
            }"
          ></div>
        </div>
      </v-flex>

      <v-flex xs12 sm5 md5 lg5 xl5 class="product-detail-flex">
        <div class="product-desc">
          <div class="name-price">
            <h3 class="animated fadeInUp">
              {{ $store.state.viewedProduct.product_name }}
            </h3>
            <h3 class="font-weight-bold animated fadeInUp">
              {{ $store.state.viewedProduct.product_price }},00€
            </h3>
          </div>
          <div class="detail-social-container">
            <div class="product-detail">
              <!-- <div class="add-more">
                                <v-btn depressed color="#8B53FF"><v-icon small color="white" class="minus-product" @click="productQuantity('-')">fas fa-minus</v-icon></v-btn>
                                <p class="quantity" v-model="productQty">{{productQty}}</p>
                                <v-btn depressed small  color="#8B53FF"><v-icon small color="white" @click="productQuantity('+')">fas fa-plus</v-icon></v-btn>
                            </div> -->
              <ProductQtyCtrl :productQty="productQty" />
              <v-btn
                depressed
                class="add-to-card font-weight-bold white--text"
                color="#8B53FF"
                @click="addtoCart()"
              >
                <v-icon
                  class="plus-product"
                  left
                  color="white"
                  style="font-size: 20px;text-align: center;"
                  >fas fa-shopping-basket</v-icon
                >
                AJOUTER AU PANIER
              </v-btn>
              <!-- <div class="likes pl-1 pr-1">
                                <v-icon>fas fa-heart</v-icon>
                                <v-divider inset vertical class="like-divider"></v-divider>
                                <span>{{$store.state.viewedProduct.likes}}</span>
                            </div> -->
            </div>

            <div class="share">
              <!-- <p>PARTAGER:</p> -->
              <div class="socials-icon">
                <!--                                <p>PARTAGER:</p>-->
                <!-- <a href="" target="_blank"><v-icon>fab fa-instagram</v-icon></a> -->
                <a
                  class=""
                  :href="
                    `https://www.facebook.com/sharer?u=https%3A%2F%2F${
                      $store.state.SHARE_HOST
                    }%2F${$store.state.HOST}${
                      $store.state.viewedProduct.product_image
                    }`
                  "
                  target="_blank"
                  ><v-icon>fab fa-facebook-square</v-icon></a
                >
                <a
                  class="ml-5"
                  :href="
                    `https://twitter.com/intent/tweet?text=Sac%20a%20main%20${
                      $store.state.viewedProduct.product_name
                    }%20hiper%20tadant%20a%20-%20prix%20tres%20abordable%20${
                      $store.state.HOST
                    }${$store.state.viewedProduct.product_image}`
                  "
                  target="_blank"
                  ><v-icon>fab fa-twitter-square</v-icon></a
                >
              </div>

              <div class="likes pl-1 pr-1">
                <v-icon
                  @click="
                    $store.commit('addLike', {
                      productId: $route.params.id.split('-')[1],
                      userId: $store.state.getuserId
                    }),
                      $store.commit('showModal', {
                        modalId: 'notificationModal',
                        top: '70px'
                      })
                  "
                  >fas fa-heart</v-icon
                >
                <v-divider inset vertical class="like-divider"></v-divider>
                <span>{{ $store.state.viewedProduct.likes }}</span>
              </div>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <v-divider style="width: 80%" class="mt-5 mb-5 first-divider"></v-divider>
    <v-layout column justify-center align-center class="tab-layout mt-5">
      <v-flex xs12 sm12 md8 lg8 xl10 class="tab-flex mb-3">
        <v-tabs
          v-model="active"
          class="tab-container"
          color="#8B53FF"
          slider-color="#8B53FF"
          style="box-shadow: none;background-color: #fafafa;"
        >
          <v-tab
            style="background: transparent;"
            class="font-weight-bold"
            :ripple="false"
            >AVIS(0)</v-tab
          >
          <v-tab
            style="background: transparent;"
            class="font-weight-bold"
            :ripple="false"
            >METHODE DE PAYEMENT</v-tab
          >
          <v-tab
            style="background: transparent;"
            class="font-weight-bold"
            :ripple="false"
            >LIVRAISON</v-tab
          >

          <v-tab-item
            class="tab-item comments-tab pt-3"
            style="background-color: transparent;border-top: 2px solid #eee"
          >
            <v-textarea
              class="mx-2"
              label="Laissez un commentaire"
              rows="5"
              prepend-icon="comment"
              color="#8B53FF"
              flat
              v-model="commentFieldValue"
              style="line-height: 22px;"
            />
            <div
              style="display:flex; justify-content: space-between; align-items: flex-start; width:100%;height:auto;"
            >
              <p class="comment-error" :style="{ opacity: `${sended}` }">
                {{ commentMsg }}
              </p>
              <v-btn
                depressed
                flat
                medium
                color="#8B53FF"
                @click="addComment()"
              >
                <v-icon small left color="white">fas fa-paper-plane</v-icon>
                <span class="white--text">Poster</span>
              </v-btn>
            </div>
            <div
              style="display:flex; justify-content: center; align-items: center; width:100%;height:auto;"
            >
              <div
                style="width: 100%; border: 0.5px solid #eee;"
                class="mt-5 comment-divider"
              ></div>
            </div>
            <div class="comments mt-5">
              <div
                class="comment-container"
                v-for="(comment, i) in $store.state.commentsArr"
              >
                <div class="user-icon"></div>
                <div class="comment-content">
                  <div class="name-date">
                    <p>userName</p>
                    <span>{{ comment.fields.posted_on }}</span>
                  </div>
                  <p class="content">{{ comment.fields.comment }}</p>
                </div>
<!--                <div class="divider"></div>-->
              </div>
            </div>
          </v-tab-item>

          <v-tab-item
            class="tab-item pt-3 pb-3 mb-5 ml-5"
            style="background-color: transparent;border-top: 2px solid #eee"
          >
            Avec Ogo By Gloria vous avez la possibilité de payer par mastercard,
            Visa et PayPal. A vous de faire votre choix
          </v-tab-item>

          <v-tab-item
            class="tab-item pt-3 pb-3 mb-5 ml-5"
            style="background-color: transparent;border-top: 2px solid #eee"
          >
            Livraison 4.95€<br />
            Une fois votre commande validée , vous recevrez un message ou un
            mail. La livraison sera offerte pour toute commande de plus de
            60€<br />
            Retour sous 5 jours<br />
            Déposez votre colis dans le bureau de poste le proche de chez vous.
            Votre retour sera traité dans un délai de 10 jours ouvrés.
          </v-tab-item>
        </v-tabs>
      </v-flex>

      <v-flex
        xs12
        sm12
        md12
        lg12
        xl12
        class="related-product-flex mt-5"
        v-if="this.$store.state.relatedProduct.length != 0"
      >
        <h4 class="font-weight-bold">VOUS AIMEREZ AUSSI</h4>
        <v-divider style="width: 10%;" class="related-divider mb-5"></v-divider>
        <div class="related-product">
          <v-layout
            row
            wrap
            justify-center
            align-center
            class="product-container"
          >
            <v-flex
              xs6
              sm6
              md3
              lg3
              class="product-flex animated zoomIn"
              v-for="(relatedproduct, i) in $store.state.relatedProduct"
              :key="i"
              :style="{ animationDelay: i / 10 + 's' }"
            >
              <Product
                :productImage="relatedproduct.fields.product_image"
                :productName="relatedproduct.fields.product_name"
                :productPrice="relatedproduct.fields.product_price"
                :productId="relatedproduct.pk"
                :thumbmailsArr="thumbmailsArr"
                data-aos="zoom-in-up"
                :data-aos-delay="i * 200"
                data-aos-duration="1000"
              />
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Product from "../components/layouts/Product";
import ProductQtyCtrl from "../components/layouts/ProductQtyCtrl";
export default {
  name: "productDescription",

  components: {
    Product: Product,
    ProductQtyCtrl: ProductQtyCtrl
  },

  data() {
    return {
      productQty: 1,
      active: null,
      sended: 0, //display comment field error if it sended
      commentMsg: "",
      commentFieldValue: "",
      thumbmailsArr: new Array()
    };
  },

  created() {
    this.$store.commit("productDescription", this.$route.params.id);
    this.$store.commit("relatedProduct", this.$route.params.id);
  },

  mounted() {
    this.$store.commit("showMenus");
    this.$store.commit("getUserId", this.$session);
  },

  methods: {
    // productQuantity(qty){
    //     if(this.productQty >= 1){
    //         if(qty == '+'){
    //             this.productQty += 1
    //         }else if(qty == '-'){
    //             if(this.productQty > 1){
    //                 this.productQty -= 1
    //             }
    //         }
    //     }else{
    //         this.productQty = 1
    //     }
    // },

    addtoCart() {
      if (this.$session.get("auth")) {
        this.$store.commit("addToCart", {
          productId: this.$route.params.id,
          quantity: this.$store.state.productQtyValue,
          userId: this.$sssion.get("userId")
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
          productId: this.$route.params.id,
          quantity: this.$store.state.productQtyValue,
          userId: this.$store.state.shoppingId
        });
      }
    },

    viewImage(imgSrc) {
      let productOverlay = document.querySelector(".product-overlay");
      productOverlay.style.backgroundImage = `url(${
        this.$store.state.MEDIA_ROOT
      }/${imgSrc})`;
    },

    // thumbmails(prodid){
    //   this.$store.commit('productsImgs', {prodid: prodid, arr: this.thumbmailsArr})
    // },

    addComment() {
      if (this.commentFieldValue != "") {
        // console.log(this.$session.has('shoppingSession'))
        if (
          this.$session.has("shoppingSession") ||
          this.$session.has("userId")
        ) {
          this.$store.commit("addComment", {
            productId: this.$route.params.id.split("-")[1],
            userId: this.$store.state.getuserId,
            comment: this.commentFieldValue,
            arr: this.commentsArr
          })
          this.commentFieldValue = ""
        } else {
          this.sended = 1;
          this.commentMsg =
            "creer un compte ou achete le produit que vous voulez commenter";
          this.commentFieldValue = ""
        }
        // this.$store.commit("showModal", {
        //   modalId: "notificationModal",
        //   top: "70px"
        // });
      } else {
        this.sended = 1;
        this.commentMsg = "Le champ est vide";
      }
    }
  }
};
</script>

<style
  scoped
  rel="stylesheet"
  type="text/css"
  src="../styles/productLayout.css"
/>
<style scoped>
.description-core {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 52vh;
  height: auto;
  margin-bottom: 30px;
}

.desc-layout {
  width: 80%;
  height: auto;
}

.product-desc-flex {
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
}

.product-img {
  display: flex;
  /*flex-direction: column;*/
  /* justify-content: space-between; */
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 550px; */
  height: auto;
}

.product-overlay {
  width: 80%;
  height: 450px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  border: 1px solid #000;
}

::-webkit-scrollbar {
  width: 0px;
}

.sub-img {
  width: 20%;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
}

.sub-img div {
  width: 100px;
  cursor: pointer;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100px;
  margin-bottom: 10px;
  border: 1px solid black;
}

.product-detail-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
}

.product-desc {
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 15px;
}

.name-price {
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.product-desc h3 {
  margin: 0px;
  text-align: left;
}

.detail-social-container {
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.product-detail {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

/* .add-more{
        width: auto;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .add-more .v-btn{
        width: 30px;
        padding: 0px;
        min-width: 0;
        height: 30px;
        border-radius: 0px;
    }

    .add-more  .quantity{
        width: aut0;
        padding: 10px;
        height: 30px;
        text-align: center;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        border: 1px solid #8B53FF;
    }

    .add-more .v-btn .v-icon{
    } */

.add-to-card {
  width: auto;
  padding: 0px;
  min-width: 0;
  height: 50px;
  border: 1px solid #8b53ff;
  border-radius: 0px;
  margin-left: 30px;
}

.likes {
  border: 1px solid #8b53ff;
  height: 36px;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: relative;
  /* left: 20px; */
}

.likes .v-icon {
  /* padding: absolute; */
  font-size: 25px;
  margin-left: 10px;
  margin-right: 10px;
  color: #8b53ff;
  cursor: pointer;
}

.likes .v-icon:hover {
  transform: scale(1.1, 1.1);
}

.like-divider {
  height: 90%;
  color: #8b53ff;
}

.likes span {
  /* position: absolute; */
  color: white;
  text-align: center;
  margin: center;
  font-size: 20px;
  width: auto;
  height: 100%;
  color: black;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */
  /* background-color: black; */
}

.share {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.socials-icon {
  width: 30%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.share p {
  margin-bottom: 0px;
  color: black;
}

.share a {
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  /*margin-left: 10px;*/
  /*margin-right: 10px;*/
}

.share a:hover .v-icon {
  color: #8b53ff;
}

.share a .v-icon {
  font-size: 30px;
  color: black;
}

.tab-layout {
  width: 100%;
  height: auto;
}

.tab-flex {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 80%;
  height: auto;
}

.tab-container {
  /* border: 1px solid red; */
  /* width: 50%; */
}

.tab-item {
}

.comment-error {
  color: red;
  margin-left: 40px;
  text-align: left;
  font-size: 15px;
}

.comments {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.comment-container {
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: auto;
  margin-bottom: 30px;
}

.user-icon {
  width: 70px;
  height: 70px;
  background-color: #8b53ff;
}

.comment-content {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.name-date {
  width: 70%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
}

.name-date p {
  text-align: left;
  font-size: 17px;
  font-weight: bold;
  margin: 0px;
  padding: 0px;
}

.name-date span {
  font-size: 13px;
  text-align: left;
  color: grey;
  margin: 0px;
  padding: 0px;
  margin-left: 5px;
}

.content {
  text-align: left;
  font-size: 17px;
  width: 85%;
  height: auto;
  margin-left: 10px;
}

.divider{
  width: 80%;
  height: auto;
  border: 1px solid #EEEEEE;
}

.related-product-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
}

.related-product {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
}

.product-container {
  margin: auto;
  /*margin-top: 0px;*/
}

@media only screen and (max-width: 800px) {
  .description-core {
    margin-top: 100px;
  }

  .desc-layout {
    width: 100%;
  }

  .product-detail-flex {
    margin-top: 10px;
    margin-bottom: 10px;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .product-desc {
    height: auto;
    margin-right: 0px;
  }

  .detail-social-container {
    margin-top: 20px;
  }

  .first-divider {
    width: 95%;
  }

  .related-divider {
    width: 70%;
  }

  .comment-divider {
    width: 95%;
  }

  .tab-flex {
    width: 90%;
  }

  .product-img {
    flex-direction: column-reverse;
  }

  .product-overlay {
    width: 100%;
    height: 350px;
  }

  .sub-img {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 15px;
    width: 100%;
    height: auto;
    overflow-y: hidden;
    overflow-x: scroll;
  }

  .sub-img div {
    margin-bottom: 0px;
  }

  .product-desc {
    margin-left: 0px;
  }

  .tab-container {
    width: 100%;
  }

  .product-flex {
    margin-bottom: 15px;
  }

  .comment-container{
    width: 100%;
    flex-direction: column;
  }

  .content{
    width: 100%;
    margin-left: 0px;
  }

  .name-date{
    width: 100%;
    margin-left: 0px;
    margin-top: 10px;
  }
}

@media only screen and (max-width: 1024px) {
  .desc-layout {
    width: 90%;
  }
}
</style>
