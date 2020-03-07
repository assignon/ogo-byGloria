<template>
  <div class="order-core animated fadeIn">
    <v-layout justify-center align-center class="stepper-layout">
      <v-flex xs12 sm12 md10 lg10 xl10 class="stepper-flex">
        <v-stepper
          v-model="step"
          class="stepper-container"
          style="background-color: #fafafa;"
          alt-labels
        >
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1">
              <span class="form-step-name">Adresse & Livraison </span>
            </v-stepper-step>

            <v-divider />

            <v-stepper-step :complete="step > 2" step="2"
              ><span class="pay-step-name">Paiement</span></v-stepper-step
            >

            <v-divider />

            <v-stepper-step step="3">Confirmation</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items class="steps-items">
            <v-stepper-content step="1">
              <div class="steps-content">
                <v-form class="order-form">
                  <div class="personal-form">
                    <h3 class="font-weight-bold">Informations personnelles</h3>
                    <v-divider style="width: 60%;" class="mb-5" />
                    <v-text-field
                      label="Nom"
                      placeholder=""
                      outlined
                      :rules="[rules.required]"
                      v-model="name"
                      type="text"
                      class="login-email animated bounceInUp"
                      style="animation-delay: 0.5s;"
                    />
                    <v-text-field
                      label="Prenom"
                      placeholder=""
                      outlined
                      :rules="[rules.required]"
                      v-model="surname"
                      type="text"
                      class="login-email animated bounceInUp"
                      style="animation-delay: 0.5s;"
                    />
                    <v-text-field
                      label="Email"
                      placeholder=""
                      outlined
                      :rules="emailRules"
                      v-model="email"
                      type="email"
                      class="login-email animated bounceInUp"
                      style="animation-delay: 0.5s;"
                    />
                    <v-text-field
                      label="Numero de telephone"
                      placeholder=""
                      outlined
                      :rules="[rules.required]"
                      v-model="telNumber"
                      type="number"
                      class="login-email animated bounceInUp"
                      style="animation-delay: 0.5s;"
                    />
                  </div>

                  <div class="adress-form">
                    <h3 class="font-weight-bold">Adresse</h3>
                    <v-divider style="width: 60%;" class="mb-5" />
                    <v-text-field
                      label="Nom de rue"
                      placeholder=""
                      outlined
                      :rules="[rules.required]"
                      type="text"
                      v-model="streetName"
                      class="login-email animated bounceInUp"
                      style="animation-delay: 0.5s;"
                    />
                    <v-text-field
                      label="Numéro de maison"
                      placeholder=""
                      outlined
                      :rules="[rules.required]"
                      type="text"
                      v-model="streetNumber"
                      class="login-email animated bounceInUp"
                      style="animation-delay: 0.5s;"
                    />
                    <v-text-field
                      label="Code postal"
                      placeholder=""
                      outlined
                      :rules="[rules.required]"
                      type="text"
                      v-model="postalCode"
                      class="login-email animated bounceInUp"
                      style="animation-delay: 0.5s;"
                    />
                    <v-text-field
                      label="Ville"
                      placeholder=""
                      outlined
                      :rules="[rules.required]"
                      type="text"
                      v-model="city"
                      class="login-email animated bounceInUp"
                      style="animation-delay: 0.5s;"
                    />
                  </div>
                </v-form>

                <div class="step-ctrl form-step-bt">
                  <v-btn
                    depressed
                    height="40"
                    class="fot-weight-bold white--text"
                    color="#8b53ff"
                    @click="validator(), purchase(), fetchCartContent()"
                    >Suivant
                    <v-icon medium left class="ml-1"
                      >fas fa-angle-right</v-icon
                    ></v-btn
                  >

                  <v-divider
                    style="width: 50%;"
                    class="mt-5 mb-5"
                    v-if="!$session.get('auth')"
                  />
                </div>

                <div class="sign-btn" v-if="!$session.get('auth')">
                  <v-btn
                    depressed
                    color="#fff"
                    style="border: 1px solid #8B53FF;color: #8B53FF;"
                    large
                    class="font-weight-bold mr-2"
                    @click="
                      $store.commit('showModal', {
                        modalId: 'loginModal',
                        top: '100px'
                      })
                    "
                    >Se Connecter</v-btn
                  >
                  <router-link to="/signup" style="text-decoration: none;"
                    ><v-btn
                      depressed
                      color="#8B53FF"
                      large
                      class="white--text font-weight-bold ml-2"
                      >S'Inscrir</v-btn
                    ></router-link
                  >
                </div>
              </div>

              <!--              <div class="step-ctrl mt-5">-->
              <!--                <v-btn-->
              <!--                  depressed-->
              <!--                  height="40"-->
              <!--                  class="fot-weight-bold white&#45;&#45;text"-->
              <!--                  color="#8b53ff"-->
              <!--                  @click="step = 2"-->
              <!--                  >Suivant-->
              <!--                  <v-icon medium left class="ml-1"-->
              <!--                    >fas fa-angle-right</v-icon-->
              <!--                  ></v-btn-->
              <!--                >-->
              <!--              </div>-->
            </v-stepper-content>

            <v-stepper-content step="2">
              <div class="purchase">
                <PaymentMethods
                  :cartItems="cartItems"
                  :paymentRedirectLink="paymentRedirectLink"
                />
              </div>

              <div class="step-ctrl">
                <v-btn
                  depressed
                  height="40"
                  class="font-weight-bold white--text mr-3"
                  color="#8b53ff"
                  @click="step = 1"
                  ><v-icon medium right class="mr-1">fas fa-angle-left</v-icon
                  >Retour</v-btn
                >
                <!--                <v-btn-->
                <!--                  depressed-->
                <!--                  height="40"-->
                <!--                  class="font-weight-bold white&#45;&#45;text"-->
                <!--                  color="#8b53ff"-->
                <!--                  @click="step = 2"-->
                <!--                  >Suivant-->
                <!--                  <v-icon medium left class="ml-1"-->
                <!--                    >fas fa-angle-right</v-icon-->
                <!--                  ></v-btn-->
                <!--                >-->
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <h1>Votre paiement a ete recu</h1>
              <p>
                un email de confirmation est envoye a {{ email }} ou vous
                trouverez tous les details et informatios sur otre ommande v
              </p>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import PaymentMethods from "../../components/layouts/PaymentMethods";
export default {
  name: "order",

  components: {
    PaymentMethods: PaymentMethods
  },

  data() {
    return {
      step: this.$route.params.step,
      rules: {
        required: value => !!value || "Champs obligatoires",
        min: v => v.length >= 8 || "8 carateres minimal",
        emailMatch: () =>
          "L'email et le mot de passe que vous avez entrés ne correspondent pas"
      },
      emailRules: [
        v => !!v || "E-mail est requis",
        v => /.+@.+/.test(v) || "L'email doit être valide"
      ],
      name: "",
      surname: "",
      email: "",
      telNumber: undefined,
      streetName: "",
      postalCode: undefined,
      city: "",
      streetNumber: "",
      cartItems: [],
      paymentRedirectLink: ""
    };
  },

  created() {
    this.$store.commit("showMenus");
  },

  methods: {
    validator() {
      let formStepName = document.querySelector(".form-step-name");
      let errorMsg = document.querySelectorAll(".v-messages__message");
      let self = this;
      let errMsgStatus;

      for (let i = 0; i < errorMsg.length; i++) {
        errMsgStatus = typeof errorMsg[i];
      }

      if (
        self.name != "" &&
        self.surname != "" &&
        self.email != "" &&
        self.telNumber != undefined &&
        self.streetName != "" &&
        self.postalCode != undefined &&
        self.city != "" &&
        self.streetNumber != "" &&
        errMsgStatus === undefined
      ) {
        self.step = 2;
      } else {
        formStepName.textContent = "Tous les champs sont obligatoire";
        formStepName.style.color = "red";
        setTimeout(function() {
          formStepName.textContent = "Adresse & Livraison";
          formStepName.style.color = "black";
        }, 10000);
      }
    },

    purchase() {
      let self = this;
      let userId = this.$session.get("auth")
        ? this.$session.get("userId")
        : this.$session.get("shoppingSession");
      console.log("product total: ", this.$store.state.productTotal);
      this.$axios
        .get(`${this.$store.state.HOST}/api/cart/paid_method/`, {
          params: {
            userId: userId
          }
        })
        .then(response => {
          let res = response.data;
          console.log(res);
          self.paymentRedirectLink = res._links.checkout.href;
        })
        .catch(error => {
          console.log(error);
        });
    },

    async fetchCartContent() {
      let self = this;
      let userId = this.$session.get("auth")
        ? this.$session.get("userId")
        : this.$session.get("shoppingSession");
      await this.$store.commit("fetchCartContent", {
        userId: userId,
        arr: self.cartItems
      });
    }
  }
};
</script>

<style scoped>
.order-core {
  width: 100%;
  height: auto;
  min-height: 52vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 30px;
}

.stepper-layout {
  width: 100%;
  height: auto;
}

.stepper-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.stepper-container {
  box-shadow: none;
  width: 100%;
}

.steps-items {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  box-shadow: none;
}

.steps-content {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.order-form {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.personal-form,
.adress-form {
  width: 45%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.personal-form h3,
.adress-form h3 {
  text-align: center;
}

.order-form .v-text-field {
  width: 90%;
}

.sign-btn {
  width: 68%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
}

.step-ctrl {
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.form-step-bt {
  width: 85%;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}

.purchase{
  width: 100%;
}

@media only screen and (max-width: 500px) {
  .stepper-container {
    margin-top: 60px;
  }

  .v-stepper__wrapper{
    width: 100%;
    border: 1px solid red;
  }

  .v-stepper__content{
    padding: 0px;
  }

  .steps-content{
    padding: 0px;
    margin: 0px;
  }

  .order-form {
    flex-direction: column;
    padding: 0px;
    margin: 0px;
  }

  .personal-form,
  .adress-form {
    width: 100%;
  }

  .sign-btn{
    margin-left: 70px;
  }
}
</style>
