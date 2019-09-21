<template>
    <div class="order-core animated fadeIn">
        <v-layout justify-center align-center class="stepper-layout">

            <v-flex xs10 sm10 md10 lg10 xl10 class="stepper-flex">
                <v-stepper v-model="step" class='stepper-container' style="background-color: #fafafa;" alt-labels>
                    <v-stepper-header>
                        <v-stepper-step :complete="step > 1" step="1">Adresse & Livraison</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :complete="step > 2" step="2">Paiement</v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="3">Confirmation</v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items class="steps-items">
                        <v-stepper-content step="1">
                            <div class="steps-content">
                                <v-form class="order-form">
                                    <div class="personal-form">
                                        <h3 class="font-weight-bold">Informations personnelles</h3>
                                        <v-divider style="width: 60%;" class="mb-5"></v-divider>
                                        <v-text-field
                                           label="Nom"
                                           placeholder=" "
                                           :rules="[rules.required]"
                                           v-model="name"
                                           class="login-email animated bounceInUp"
                                           style="animation-delay: 0.5s;"
                                         ></v-text-field>
                                         <v-text-field
                                           label="Email"
                                           placeholder=" "
                                           :rules="emailRules"
                                           v-model="email"
                                           class="login-email animated bounceInUp"
                                           style="animation-delay: 0.5s;"
                                         ></v-text-field>
                                         <v-text-field
                                           label="Numero de telephone"
                                           placeholder=" "
                                           :rules="[rules.required]"
                                           v-model="telNumber"
                                           class="login-email animated bounceInUp"
                                           style="animation-delay: 0.5s;"
                                        ></v-text-field>
                                    </div>
                                    
                                    <div class="adress-form">
                                        <h3 class="font-weight-bold">Adresse</h3>
                                        <v-divider style="width: 60%;" class="mb-5"></v-divider>
                                        <v-text-field
                                          label="Nom de rue et numéro de maison"
                                          placeholder=" "
                                          :rules="[rules.required]"
                                          v-model="streetName"
                                          class="login-email animated bounceInUp"
                                          style="animation-delay: 0.5s;"
                                        ></v-text-field>
                                        <v-text-field
                                          label="Code postal"
                                          placeholder=" "
                                          :rules="[rules.required]"
                                          v-model="postalCode"
                                          class="login-email animated bounceInUp"
                                          style="animation-delay: 0.5s;"
                                        ></v-text-field>
                                        <v-text-field
                                          label="Ville"
                                          placeholder=" "
                                          :rules="[rules.required]"
                                          v-model="city"
                                          class="login-email animated bounceInUp"
                                          style="animation-delay: 0.5s;"
                                        ></v-text-field>
                                    </div>
                                    
                                </v-form>

                                <v-divider style="width: 90%;" class="mt-3 mb-5" v-if="!$session.get('auth')"></v-divider>

                                <div class="sign-btn" v-if="!$session.get('auth')">
                                    <v-btn depressed color="#fff" style="border: 1px solid #FFCC80;color: #FFCC80;" large class="font-weight-bold mr-2"  @click="$store.commit('showModal', {modalId:'loginModal',top: '100px'})">Se Connecter</v-btn>
                                    <router-link to="/signup" style="text-decoration: none;"><v-btn depressed color="#FFCC80" large class="white--text font-weight-bold ml-2">S'Inscrir</v-btn></router-link>
                                </div>
                            </div>

                            <div class="step-ctrl mt-5">
                                 <v-btn depressed height="40" class="fot-weight-bold white--text" color="#FB8C00" @click="step = 2">Suivant <v-icon medium left class="ml-1">fas fa-angle-right</v-icon></v-btn>
                            </div>
                        </v-stepper-content>
                            
                        <v-stepper-content step="2">
                            <div class="purchase">
                                <div class="cart-info"></div>
                                <div class="payment-methods"></div>
                            </div>

                            <div class="step-ctrl">
                                 <v-btn depressed height="40" class="fot-weight-bold white--text mr-3" color="#FB8C00" @click="step = 1"><v-icon medium right class="mr-1">fas fa-angle-left</v-icon>Retour</v-btn>
                                 <v-btn depressed height="40" class="fot-weight-bold white--text" color="#FB8C00" @click="step = 2">Suivant <v-icon medium left class="ml-1">fas fa-angle-right</v-icon></v-btn>
                            </div>
                        </v-stepper-content>

                        <v-stepper-content step="3">

                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-flex>

        </v-layout>
    </div>
</template>

<script>
export default {
    name: 'order',

    data(){
        return{
            step: 0,
            rules: {
                required: value => !!value || 'Champs obligatoires',
                min: v => v.length >= 8 || '8 carateres minimal',
                emailMatch: () => ("L'email et le mot de passe que vous avez entrés ne correspondent pas")
            },
            emailRules: [
                v => !!v || 'E-mail est requis',
                v => /.+@.+/.test(v) || "L'email doit être valide",
             ],
             name: '',
             email: '',
             telNumber: undefined,
             streetName: '',
             postalCode: undefined,
             city: ''
        }
    },

    created(){
        this.$store.commit('showMenus')
    },

    methods: {

    }
}
</script>

<style scoped>
    .order-core{
        width: 100%;
        height: auto;
        min-height: 52vh;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 30px;
    }

    .stepper-layout{
        width: 100%;
        height: auto;
    }

    .stepper-flex{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .stepper-container{
        box-shadow: none;
        width: 100%;
    }

    .steps-items{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fafafa;
        box-shadow: none;
    }

    .steps-content{
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .order-form{
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .personal-form, .adress-form{
        width: 45%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .personal-form h3, .adress-form h3{
        text-align: center;
    }

    .order-form .v-text-field{
        width: 90%;
    }

    .sign-btn{
        width: 80%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .step-ctrl{
        width: 95%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
</style>