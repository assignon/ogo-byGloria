<template>
  <div class="navbar">
    <v-layout
      column
      justify-center
      align-center
      class="nav-layout hidden-sm-and-down"
    >
      <v-flex xs12 sm12 m12 lg12 class="social-flex">
        <!-- <div class="socials-cotainer">
                    <a href="" class="social-link ma-2" target="_blank"><v-icon medium class="social-icon">fab fa-facebook</v-icon></a>
                    <a href="" class="social-link ma-2" target="_blank"><v-icon medium class="social-icon">fab fa-instagram</v-icon></a>
                    <a href="" class="social-link ma-2" target="_blank"><v-icon medium class="social-icon">fab fa-twitter</v-icon></a>
                </div> -->
        <div class="sign ml-3 mr-3 mt-3">
          <router-link
            to="/signup"
            style="text-decoration: none;"
            v-if="!$session.get('auth')"
            ><p class="signup pl-4 pr-4 pt-1 pb-1 mr-2 font-weight-bold">
              S'INSCRIR
            </p></router-link
          >
          <p
            class="signin pl-4 pr-4 pt-1 pb-1 font-weight-bold"
            v-if="!$session.get('auth')"
            @click="
              $store.commit('showModal', {
                modalId: 'loginModal',
                top: '100px'
              })
            "
          >
            SE CONNECTER
          </p>
          <a
            href="https://www.instagram.com/Ogobygloria/"
            class="social-link ma-2 pl-3"
            style="text-decoration: none"
            target="_blank"
            ><v-icon medium class="social-icon">fab fa-instagram</v-icon></a
          >
          <!-- <v-btn medium depressed color="#8B53FF" class="signup mr-3">S'INSCRIRE</v-btn>
                    <v-btn medium  outlined  color="" class="signin">SE CONECTER</v-btn> -->
        </div>
      </v-flex>

      <v-flex xs12 sm12 m12 lg12 class="logo-flex">
<!--        <h1-->
<!--          class="display-2 font-weight-bold"-->
<!--          style="color: #FB8C00;font-style: italic;"-->
<!--        >-->
<!--          Ogo By Gloria-->
<!--        </h1>-->
        <div class="ogo-logo">
          <img src="../../../public/img/icons/android-chrome-512x512.png" alt="">
        </div>
        <div
          class="shopping-container cart-badget animated"
          @click.stop="showCart()"
          style="position: relative; right: 30px;"
        >
          <v-badge overlap color="#7B1FA2" class="shopping-badge">
            <template v-slot:badge>{{ $store.state.numberOfProduct }}</template>
            <v-icon large style="color: #8B53FF;"
              >fas fa-shopping-basket</v-icon
            >
          </v-badge>
        </div>
      </v-flex>

      <v-flex xs12 sm12 m12 lg12 class="menu-flex">
        <router-link to="/" style="text-decoration: none;">
          <div class="menu-item">
            <span>Accueille</span>
            <v-icon medium style="" class="">home</v-icon>
          </div>
        </router-link>
        <router-link to="/bag" style="text-decoration: none;">
          <div class="menu-item">
            <span>Sacs</span>
            <v-icon style="font-size: 18px;" class=""
              >fas fa-shopping-bag</v-icon
            >
          </div>
        </router-link>
        <router-link to="/accessory" style="text-decoration: none;">
          <div class="menu-item">
            <span>Accessoires</span>
            <v-icon style="font-size: 18px;" class=""></v-icon>
          </div>
        </router-link>
        <router-link to="/about" style="text-decoration: none;">
          <div class="menu-item">
            <span>A propos</span>
            <v-icon style="font-size: 18px;" class=""
              >fas fa-address-card</v-icon
            >
          </div>
        </router-link>
        <router-link to="/contact" style="text-decoration: none;">
          <div class="menu-item">
            <span>Contact</span>
            <v-icon style="font-size: 18px;" class="">fas fa-envelope</v-icon>
          </div>
        </router-link>
      </v-flex>
    </v-layout>

<!--- -- ------------------------------------------ bar menu ------------------------------------------------------------->
    <v-layout
      row
      justify-space-around
      align-center
      style="z-index: 10; display: none"
      class="scroll-nav-layout hidden-sm-and-down animated"
    >
      <v-flex sm3 md2 lg2 xlg2 class="logo-flex" style="">
<!--        <h1 class="font-weight-bold" style="color: #FB8C00;font-style: italic;">-->
<!--          Ogo By Gloria-->
<!--        </h1>-->
        <div class="scroll-ogo-logo">
<!--          <img src="../../../public/img/icons/android-chrome-512x512.png" alt="">-->
        </div>
      </v-flex>

      <v-flex sm5 md6 lg6 xl6 class="menu-flex" style="">
        <router-link to="/" style="text-decoration: none;">
          <div class="menu-item">
            <span>Accueille</span>
            <v-icon medium style="" class="">home</v-icon>
          </div>
        </router-link>

        <router-link to="/bag" style="text-decoration: none;">
          <div class="menu-item">
            <span>Sacs</span>
            <v-icon style="font-size: 18px;" class=""
              >fas fa-shopping-bag</v-icon
            >
          </div>
        </router-link>

        <router-link to="/accessory" style="text-decoration: none;">
          <div class="menu-item">
            <span>Accessoires</span>
            <v-icon style="font-size: 18px;" class=""></v-icon>
          </div>
        </router-link>

        <router-link to="/about" style="text-decoration: none;">
          <div class="menu-item">
            <span>A propos</span>
            <v-icon style="font-size: 18px;" class=""
              >fas fa-address-card</v-icon
            >
          </div>
        </router-link>

        <router-link to="/contact" style="text-decoration: none;">
          <div class="menu-item">
            <span>Contact</span>
            <v-icon style="font-size: 18px;" class="">fas fa-envelope</v-icon>
          </div>
        </router-link>
      </v-flex>

      <v-flex sm4 md3 ld3 xl3 class="sign-flex" style="">
        <router-link
          to="/signup"
          style="text-decoration: none;"
          v-if="!$session.get('auth')"
          ><p class="signup pl-4 pr-4 pt-1 pb-1 font-weight-bold">
            S'INSCRIR
          </p></router-link
        >
        <p
          class="signin pl-4 pr-4 pt-1 pb-1 font-weight-bold"
          v-if="!$session.get('auth')"
          @click="
            $store.commit('showModal', { modalId: 'loginModal', top: '100px' })
          "
        >
          SE CONNECTER
        </p>
        <div
          class="shopping-container cart-badget-seconde animated"
          style="margin-left: 0px;"
          @click.stop="showCart()"
        >
          <v-badge overlap color="#7B1FA2" class="shopping-badge">
            <template v-slot:badge>{{ $store.state.numberOfProduct }}</template>
            <v-icon large style="color: #8B53FF;"
              >fas fa-shopping-basket</v-icon
            >
          </v-badge>
        </div>
      </v-flex>
    </v-layout>

    <!-- mobile, tablete menu -->
    <v-layout
      row
      justify-space-around
      align-center
      class="mobile-menu-layout hidden-md-and-up animated fadeIn"
    >
      <v-flex xs9 md9 class="burgermenu-flex">
        <v-icon
          @click.stop="drawer = !drawer, animateMeuItems()"
          class=""
          style="color: #333333;margin-left:20px;"
          medium
          >fas fa-bars</v-icon
        >
        <h2
          class="ml-3 font-weight-bold"
          style="color:rgb(139,83,255);font-style: italic;"
        >
          Ogo By Gloria
        </h2>
      </v-flex>

      <v-flex xs3 md3 class="menu-cart-flex">
        <div
          class="shopping-container mt-3 cart-badget-seconde animated"
          style="margin-left: 0px;"
          @click.stop="showCart()"
        >
          <v-badge overlap color="#7E57C2" class="shopping-badge">
            <template v-slot:badge>{{ $store.state.numberOfProduct }}</template>
            <v-icon large style="color: #8B53FF;"
              >fas fa-shopping-basket</v-icon
            >
          </v-badge>
        </div>
      </v-flex>
    </v-layout>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      top
      height="100vh"
      temporary
      class="nav-drawer"
    >
      <div class="mobile-menu-flex mt-5" style="">
        <router-link to="/" style="text-decoration: none;">
          <div class="mobile-menu-item animated" syle="position: relative; left:-10px;">
            <span class="ml-1 mt-1">Accueille</span>
            <v-icon medium style="" class="">home</v-icon>
          </div>
        </router-link>

        <router-link to="/bag" style="text-decoration: none;">
          <div class="mobile-menu-item animated">
            <span>Sacs</span>
            <v-icon style="font-size: 20px;" class=""
              >fas fa-shopping-bag</v-icon
            >
          </div>
        </router-link>

        <router-link to="/accessory" style="text-decoration: none;">
          <div class="mobile-menu-item animated">
            <span>Accessoires</span>
            <v-icon style="font-size: 20px;" class=""></v-icon>
          </div>
        </router-link>

        <router-link to="/about" style="text-decoration: none;">
          <div class="mobile-menu-item animated">
            <span>A propos</span>
            <v-icon style="font-size: 20px;" class=""
              >fas fa-address-card</v-icon
            >
          </div>
        </router-link>

        <router-link to="/contact" style="text-decoration: none;">
          <div class="mobile-menu-item animated">
            <span>Contact</span>
            <v-icon style="font-size: 20px;" class="">fas fa-envelope</v-icon>
          </div>
        </router-link>
      </div>
      <v-divider style="width: 200px;" class="mt-3 mb-3"></v-divider>
      <v-flex xs12 md12 class="mobile-sign-flex">
        <router-link
          to="/signup"
          style="text-decoration: none;"
          v-if="!$session.get('auth')"
          ><p
            class="signup pl-4 pr-4 pt-1 pb-1 mb-3 font-weight-bold"
            @click.stop="drawer = !drawer"
          >
            S'INSCRIR
          </p></router-link
        >
        <p
          class="signin pl-4 pr-4 pt-1 pb-1 mb-3 font-weight-bold"
          v-if="!$session.get('auth')"
          @click="
            $store.commit('showModal', { modalId: 'loginModal', top: '100px' }),
              (drawer = !drawer)
          "
        >
          SE CONNECTER
        </p>
      </v-flex>
    </v-navigation-drawer>

    <CartContent :drawer="cartDrawer" :cartcontent="cartcontent" />
  </div>
</template>

<script>
import CartContent from "../modals/CartContent";
export default {
  name: "navbar",

  components: {
    CartContent
  },

  data() {
    return {
      activeBtn: 0,
      siteColor: "#8B53FF",
      secondaryNav: false,
      drawer: false,
      cartDrawer: false,
      cartcontent: []
    };
  },

  created() {
    window.addEventListener("scroll", this.menuScrollAnimation);
    this.productNumber();
  },

  methods: {
    animateMeuItems(){
      let menuItems = document.querySelectorAll('.mobile-menu-item')
      for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.add("slideInLeft")
        menuItems[i].style.animationDuration = '0.5s'
        menuItems[i].style.animationDelay = `${i/4}s`
        setTimeout(function(){
          menuItems[i].classList.remove("slideInLeft")
        }, 1800)
      }
    },

    menuScrollAnimation() {
      let scrollValue = document.documentElement.scrollTop;
      let scrollNavLayout = document.querySelector(".scroll-nav-layout");
      if (scrollValue >= 100) {
        scrollNavLayout.style.display = "flex";
        scrollNavLayout.style.transition = "opacity 0.5s linear 0.1s";
        scrollNavLayout.style.opacity = scrollValue / 150;
        scrollNavLayout.classList.add("slideInDown");
      } else if (scrollValue < 100) {
        scrollNavLayout.style.display = "none";
        scrollNavLayout.style.opacity = "0";
      }
    },

    // get in the db the count of the products added to the cart
    productNumber() {
      let self = this;

      this.$axios
        .get(`${this.$store.state.HOST}/api/cart/cart_count/`, {
          params: {
            shoppingSession: self.$session.get("shoppingSession") //shoppingsession / userId change to real userId when the user is logged
          }
        })
        .then(response => {
          this.$store.state.numberOfProduct = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    async showCart() {
      let self = this;
      let userId = (this.$session.get('auth')) ? this.$session.get('userId') : this.$session.get("shoppingSession")
      await this.$store.commit(
        "fetchCartContent",
          {userId: userId, arr: self.cartcontent}
      );
      this.$store.state.cartDrawer = true
      // this.$store.commit('showModal', {modalId:'cartModal',top: '100px'})
    }
  }
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.nav-layout {
  width: 100%;
}

.social-flex {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 30px;
}

.socials-cotainer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: auto;
}

.socials-cotainer a {
  width: 20px;
  height: 30px;
  text-decoration: none;
}

.socials-cotainer a .social-icon:hover {
  color: #8B53FF;
}

.nav-layout .logo-flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;
  bottom: 30px;
}

.scroll-nav-layout .logo-flex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
}

.ogo-logo{
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 150px;
  margin: 0px;
  /*position: relative;*/
  /*bottom: 30px;*/
  /*background-image: url("../../../public/img/icons/android-chrome-192x192.png");*/
  /*background-repeat: no-repeat;*/
  /*background-position: center;*/
  /*background-size: contain;*/
}

.scroll-ogo-logo{
  background-image: url('../../../public/img/icons/apple-touch-icon-76x76.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 77px;
  height: 70px;
}

.ogo-logo img{
  width: 250px;
  height: 250px;
}

.sign {
  width: auto;
  /* height: auto; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.sign .signup,
.sign-flex .signup {
  /*border: 1px solid #8B53FF;*/
  border: 1px solid #8B53FF;
  border-radius: 50px;
  text-align: center;
  color: white;
  /*background-color: #8B53FF;*/
  background-color: #8B53FF;
  font-size: 15px;
  margin: auto;
  cursor: pointer;
}

.sign .signin,
.sign-flex .signin {
  /*border: 1px solid #8B53FF;*/
  border: 1px solid #8B53FF;
  border-radius: 50px;
  text-align: center;
  color: #8B53FF;
  background-color: #fff;
  font-size: 15px;
  margin: auto;
  cursor: pointer;
}

.sign .signup:hover,
.sign-flex .signup:hover {
  transform: scale(0.9, 0.9);
}

.sign .signin:hover,
.sign-flex .signin:hover {
  transform: scale(0.9, 0.9);
}

.sign-flex {
  /* width: 100%; */
  /* height: auto; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.shopping-container {
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /*margin-left: 50px;*/
}

.shopping-container .shopping-badge {
  /* border: 2px solid red; */
  /* border-radius: 100%;
    color: white;
    font-size: 15px;
    text-align: center;
    width: 20px;
    height: 20px;
    /* padding: 10px; */
  /* background-color: #8B53FF; */
}

.nav-layout .menu-flex {
  /* width: 100%; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.scroll-nav-layout .menu-flex {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.menu-item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
}

.menu-item .v-icon {
  color: #7d7d7d;
}

.menu-flex .menu-item span {
  font-size: 15px;
  color: #7d7d7d;
  text-align: center;
  position: relative;
  left: 5px;
  font-weight: bold;
}

.menu-flex .menu-item:hover span {
  color: #8B53FF;
}

.menu-flex .menu-item:hover .v-icon {
  color: #8B53FF;
}

.scroll-nav-layout {
  width: 100%;
  height: 70px;
  position: fixed;
  background-color: white;
  top: 0px;
  right: 12px;
  z-index: 3;
  opacity: 0;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.mobile-menu-layout {
  width: 100%;
  height: 60px;
  background-color: white;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  position: fixed;
  top: 0px;
  left: 2px;
  z-index: 3;
  overflow-x: hidden;
}

.burgermenu-flex {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.menu-cart-flex {
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-drawer {
  width: 100%;
  /* height: auto; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 20px;
  top: 0px;
}

.mobile-menu-flex {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.mobile-menu-item {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
}

.mobile-menu-item span {
  margin-left: 10px;
  font-size: 16px;
  color: #757575;
  text-align: left;
  font-weight: bold;
}

.mobile-menu-item:hover span {
  color: #8B53FF;
}

.mobile-menu-item:hover .v-icon {
  color: #8B53FF;
}

.mobile-sign-flex {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.mobile-sign-flex .signup {
  border: 1px solid #8B53FF;
  border-radius: 50px;
  text-align: center;
  color: white;
  background-color: #8B53FF;
  font-size: 15px;
  margin: auto;
  cursor: pointer;
}

.mobile-sign-flex .signin {
  border: 1px solid #8B53FF;
  border-radius: 50px;
  text-align: center;
  color: #8B53FF;
  background-color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.mobile-sign-flex .signup:hover,
.mobile-sign-flex .signup:hover {
  transform: scale(0.9, 0.9);
}

.mobile-sign-flex .signin:hover,
.mobile-sign-flex .signin:hover {
  transform: scale(0.9, 0.9);
}

@media only screen and (max-width: 500px) {
  .navbar {
    margin-bottom: 0px;
  }
}
</style>
