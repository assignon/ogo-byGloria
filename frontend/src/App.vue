<template>
  <v-app id="app" app>

    <v-content>

      <Nav/>
      <router-view class="animated fadeIn"></router-view>
      <Footer/>

    </v-content>

  </v-app>
</template>

<script>
import Nav from './components/layouts/Nav';
import Footer from './components/layouts/Footer';

export default {

  name: 'App',

  components: {
    Nav,
    Footer,
  },

  data: () => ({
    
  }),

  created (){

  },
  
  methods: {

  }
  
};
</script>

<style scoped>
  
</style>
