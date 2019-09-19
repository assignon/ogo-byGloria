<template>
    <div class="description-core">

        <v-layout row justify-center align-start class="desc-layout">
            <v-flex xs10 sm8 md4 lg4 xl8 class="product-desc-flex">
                <div class="product-img">
                    <div class="product-overlay animated zoomIn" :style="{backgroundImage: `url(${$store.state.HOST}${$store.state.viewedProduct.product_image})`}"></div>
                    <div class="sub-img">
                        <img src="../assets/image.png" alt="">
                        <img src="../assets/image.png" alt="">
                        <img src="../assets/image.png" alt="">
                    </div>
                </div>
            </v-flex>

            <v-flex xs10 sm8 md8 lg4 xl4 class="product-detail-flex">
                <div class="product-desc">
                    <div class="name-price">
                        <h3 class="animated fadeInUp">{{$store.state.viewedProduct.product_name}}</h3>
                        <h3 class="font-weight-bold animated fadeInUp">{{$store.state.viewedProduct.product_price}},00€</h3>
                    </div>
                    <div class="detail-social-container">
                        <div class="product-detail">
                            <!-- <div class="add-more">
                                <v-btn depressed color="#FFCC80"><v-icon small color="white" class="minus-product" @click="productQuantity('-')">fas fa-minus</v-icon></v-btn>
                                <p class="quantity" v-model="productQty">{{productQty}}</p>
                                <v-btn depressed small  color="#FFCC80"><v-icon small color="white" @click="productQuantity('+')">fas fa-plus</v-icon></v-btn>
                            </div> -->
                            <ProductQtyCtrl :productQty=productQty />
                            <v-btn depressed 
                              class="add-to-card font-weight-bold white--text" 
                              color="#FFCC80" 
                              @click="addtoCart()"
                            >
                                <v-icon class="plus-product" left color="white" style="font-size: 20px;text-align: center;">fas fa-shopping-basket</v-icon>
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
                                <p>PARTAGER:</p>
                                <a href="" target="_blank"><v-icon>fab fa-instagram</v-icon></a>
                                <a href="" target="_blank"><v-icon>fab fa-facebook-square</v-icon></a>
                                <a href="" target="_blank"><v-icon>fab fa-twitter-square</v-icon></a>
                            </div>

                            <div class="likes pl-1 pr-1">
                                <v-icon @click="$session.get('auth') ? $store.commit('addLike') : $store.commit('showModal', {modalId:'loginModal',top: '100px'})">fas fa-heart</v-icon>
                                <v-divider inset vertical class="like-divider"></v-divider>
                                <span>{{$store.state.viewedProduct.likes}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </v-flex>
        </v-layout>
        <v-divider style="width: 90%" class="mt-3"></v-divider>
        <v-layout column justify-center align-center class="tab-layout mt-3">
            <v-flex xs10 sm10 md8 lg8 xl10 class="tab-flex mb-3">
                <v-tabs v-model="active"  class="tab-container"
                    color="#ffcc80" slider-color="#ffcc80" style="background-color: transparent;">

                    <v-tab style="background: transparent;" class="font-weight-bold" :ripple="false">AVIS(0)</v-tab>
                    <v-tab style="background: transparent;" class="font-weight-bold" :ripple="false">METHODE DE PAYEMENT</v-tab>
                    <v-tab style="background: transparent;" class="font-weight-bold" :ripple="false">LIVRAISON</v-tab>

                    <v-tab-item class="tab-item comments-tab mt-5 pt-3" style="background-color: transparent;">
                        <v-textarea
                            class="mx-2"
                            label="Laiser un commentaire..."
                            rows="1"
                            prepend-icon="comment"
                            color="#FFCC80"
                            flat
                        ></v-textarea>
                        <div style="display:flex; justify-content: space-between; align-items: flex-start width:100%;height:auto;">
                            <p class="comment-error" :style="{opacity: `${sended}`}" v-model="commentFieldValue">{{commentErrMsg}}</p>
                            <v-btn depressed flat medium color="#FFCC80" @click="$session.get('auth') ? addComment() : $store.commit('showModal', {modalId:'loginModal',top: '100px'})">
                                <v-icon small left color="white">fas fa-paper-plane</v-icon>
                                <span class="white--text">Poster</span>
                            </v-btn>
                        </div>
                        <div style="display:flex; justify-content: center; align-items: center; width:100%;height:auto;">
                            <div style="width: 90%; border: 0.5px solid grey;" class="mt-5"></div>
                        </div>
                        <div class="comments mt-5"></div>
                    </v-tab-item>

                    <v-tab-item class="tab-item mt-5 pt-3 mb-5 ml-5">
                        Information sur les differents moyen de payement mis a disposition des clients
                    </v-tab-item>

                    <v-tab-item class="tab-item mt-5 pt-3 mb-5 ml-5">
                        Information sur la duree de livraison
                    </v-tab-item>
                </v-tabs>
            </v-flex>

            <v-flex xs10 sm10 md8 lg8 xl8 class="related-product-flex mt-5">
                <h4 class="font-weight-bold">VOUS AIMEREZ AUSSI</h4>
                <v-divider style="width: 50%;"></v-divider>
                <div class="related-product">
                    <v-layout row wrap justify-center align-center class="product-container">
                        <v-flex xs11 sm5 md3 lg4 class="product-flex animated zoomIn" v-for="(relatedproduct, i) in $store.state.relatedProduct" :key="i" :style="{animationDelay: i/10+'s'}">
                            <Product
                              :productImage =relatedproduct.fields.product_image
                              :productName =relatedproduct.fields.product_name
                              :productPrice =relatedproduct.fields.product_price
                              :productId =relatedproduct.pk
                              data-aos="zoom-in-up" 
                              :data-aos-delay="i*200" 
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
import Product from '../components/layouts/Product';
import ProductQtyCtrl from '../components/layouts/ProductQtyCtrl';
export default {
    
    name: 'productDescription',

    components: {
        'Product': Product,
        'ProductQtyCtrl': ProductQtyCtrl
    },

    data() {
        return{
            productQty: 1,
            active: null,
            sended: 0, //display comment field error if it sended
            commentErrMsg: "Comment field error message",
            commentFieldValue: ''
        }
    },

    created() {

        this.$store.commit('productDescription', this.$route.params.id)
        this.$store.commit('relatedProduct', this.$route.params.id)
        console.log(this.$store.state.relatedProduct[0])

    },

    mounted(){
        this.$store.commit('showMenus')
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

        addtoCart(){
            if(this.$session.get('auth')){
                $store.commit('addToCart', {productId:this.$route.params.id, quantity: this.productQty, userId: this.$store.state.userId})
            }else{
                let generatedStr = btoa(Math.random()).substring(0,25)
                let generatedNum = Math.floor(Math.random() * 16) + 5
                let generatedId = generatedNum+generatedStr
                if(!this.$session.has('shoppingSession')){
                    this.$session.set('shoppingSession', generatedId)
                }
                this.$store.state.shoppingId = this.$session.get('shoppingSession')
                this.$store.commit('addToCart', {productId:this.$route.params.id, quantity: this.productQty, userId: this.$store.state.shoppingId})
            }
        },

        addComment(){

        }

    }
}
</script>

<style scoped rel="stylesheet" type="text/css" src="../styles/productLayout.css"></style>
<style scoped>
    .description-core{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 52vh;
        height: auto;
        margin-bottom: 30px;
    }

    .desc-layout{
        width: 100%;
        height: auto;
    }

    .product-desc-flex, .product-detail-flex{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: auto;
        height: auto;
    }

    .product-img{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: auto;
        height: 550px;
    }

    .product-overlay{
        width: 100%;
        height: 400px;
        background-position: center;
        background-size: cover;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
    }

    .sub-img{
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-end;
    }

    .sub-img img{
        width: 30%;
        cursor: pointer;
        /* height: 150px; */
    }

    .product-desc{
        width: auto;
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        margin-right: 70px;
    }

    .name-price{
        width: auto;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .product-desc h3{
        margin: 0px;
        text-align: left;
    }

    .detail-social-container{
        width: auto;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .product-detail{
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
        border: 1px solid #FFCC80;
    }

    .add-more .v-btn .v-icon{
    } */

    .add-to-card{
        width: auto;
        padding: 0px;
        min-width: 0;
        height: 50px;
        border: 1px solid #FFCC80;
        border-radius: 0px;
        margin-left: 30px;
    }

    .likes{
        border: 1px solid #FFCC80;
        height: 36px;
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        position: relative;
        /* left: 20px; */
    }

    .likes .v-icon{
        /* padding: absolute; */
        font-size: 25px;
        margin-left:10px;
        margin-right: 10px;
        color: #FFCC80;
        cursor: pointer;
    }

    .likes .v-icon:hover{
        transform: scale(1.1,1.1);
    }

    .like-divider{
        height: 90%;
        color: #FFCC80;
    }

    .likes span{
        /* position: absolute; */
        color: white;
        text-align: center;
        margin: center;
        font-size:20px;
        width: auto;
        height: 100%;
        color: black;
        margin-left:10px;
        margin-right: 10px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        /* border: 1px solid black; */
        /* background-color: black; */
    }

    .share{
       width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
    }

    .socials-icon{
        width: 30%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: ccenter;
        align-items: center;
    }

    .share p{
        margin-bottom: 0px;
        color: black;
    }

    .share a{
        text-decoration: none;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        margin-left: 10px;
        margin-right: 10px;
    }

    .share a:hover .v-icon{
        color: #FFCC80;
    }

    .share a .v-icon{
        font-size: 30px;
        color: black;
    }

    .tab-layout{
        width: 100%;
        height: auto;
    }

    .tab-flex{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        width: 70%;
        height: auto;
    }

    .tab-container{
        /* border: 1px solid red; */
        /* width: 50%; */
    }

    .tab-item{

    }

    .comment-error{
        color: red;
        margin-left: 40px;
        text-align: left;
        font-size: 15px;
    }

    .comments{
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .related-product-flex{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 70%;
        height: auto;
    }

    .related-product{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: auto;
    }
</style>