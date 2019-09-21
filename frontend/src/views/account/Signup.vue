<template>
    <div class="signup-core animared fadeIn">
        <v-layout row wrap align-center class="signup-layout">
            <v-flex xs12 sm12 md8 lg7 xl7 class="overlay-flex">
                <div class="overlay animated fadeIn"></div>
            </v-flex>

            <v-flex xs11 sm11 md4 lg5 xl5 class="form-flex">
                <!-- <div class="signup-background"> -->
                <h3 class="font-weight-bold animated fadeInUp" style="animation-delay: 0.1s;">Créez votre compte</h3>
                <v-divider style="width:50%;" class="mb-5"></v-divider>
                <v-form class="register-form">
                    <v-text-field
                      label="Email"
                      placeholder=" "
                      outlined
                      :rules="emailRules"
                      v-model="email"
                      class="login-email animated bounceInUp"
                      style="animation-delay: 0.5s;"
                    ></v-text-field>

                    <v-text-field
                        :append-icon="show ? 'visibility' : 'visibility_off'"
                        :rules="[rules.required, rules.min]"
                        :type="show ? 'text' : 'password'"
                        name="input-10-2"
                        placeholder=" "
                        label="Mot de passe"
                        hint="8 carateres minimal"
                        value=""
                        outlined
                        v-model="password"
                        class="input-group--focused login-password animated bounceInUp"
                        style="animation-delay: 0.7s;"
                        @click:append="show = !show"
                    ></v-text-field>

                    <v-text-field
                        :append-icon="show ? 'visibility' : 'visibility_off'"
                        :rules="[rules.required, rules.min]"
                        :type="show ? 'text' : 'password'"
                        name="input-10-2"
                        placeholder=" "
                        label="Repetez le Mot de passe"
                        hint="8 carateres minimal"
                        value=""
                        outlined
                        v-model="repeatPassword"
                        class="input-group--focused login-password animated bounceInUp"
                        style="animation-delay: 0.8s;"
                        @click:append="show = !show"
                    ></v-text-field>

                    <div class="password-forgot-container">
                        <v-btn depressed large height="50" color="#FFCC80" class="white--text animated bounceIn" >Inscription</v-btn>
                    </div>
                </v-form>
                <!-- </div> -->
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    
    name: 'signup',

    data(){
        return{

            show: false,
            password: 'Password',
            rules: {
                required: value => !!value || 'Champs obligatoires',
                min: v => v.length >= 8 || '8 carateres minimal',
                emailMatch: () => ("L'email et le mot de passe que vous avez entrés ne correspondent pas")
            },
            emailRules: [
                v => !!v || 'E-mail est requis',
                v => /.+@.+/.test(v) || "L'email doit être valide",
             ],
            passwordRecoveryEmail: '',
            email: '',
            password: '',
            repeatPassword: ''

        }
    },

    created(){
        // this.$store.commit('showOnlySecondMenu')
    },

    mounted(){
        this.$store.commit('showOnlySecondMenu')
    },

    methods: {

    }

}
</script>

<style scoped>
    
.signup-core{
    width: 100%;
    height: auto;
    /* min-height: 90vh; */
    /* min-height: 52vh; */
    margin-top: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.signup-layout{
    width: 100%;
    height: auto;
    justify-content: space-between;
}

.overlay-flex{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    width: 100%;
}

.overlay{
    width: 100%;
    height: 100%;
    background-image: url('../../assets/signup/register.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

.form-flex{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
    width: 100%;
    background-color: #F5F5F5;
}

.signup-background{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: red;
    position: absolute;
}

.register-form{
    width: 80%;
    height: auto;
}

.password-forgot-container{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
}

.password-forgot-container .v-btn{
    text-transform: capitalize;
    font-size: 17px;
    font-weight: bold;
    margin: 0px;
}

@media only screen and (max-width: 800px){
    .signup-core{
        margin-top: 0px;
    }

    .form-flex{
        margin-top: -200px;
        z-index: 5; 
        border-radius: 3px;
        padding-bottom: 10px;
        padding-top: 10px;
        margin-bottom: 10px;
        border: 1px solid #E0E0E0;
    }

    .signup-layout{
        flex-direction: column;
        justify-content: center;
    }  

    .register-form{
        width: 90%;
    }

    @media only screen and (max-width: 970px){
        .form-flex{
            height: auto;
        }
    } 
}

</style>