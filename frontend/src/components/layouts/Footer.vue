<template>
  <div class="footer">
    <v-layout justify-space-around align-start row wrap class="footer-layout">
      <v-flex xs12 sm12 md4 lg4 class="contact-flex">
        <h3>Contact</h3>
        <p><v-icon>fas fa-at</v-icon>ogoby.gloria@hotmail.com</p>
        <p><v-icon>fas fa-phone-alt</v-icon> +33-752951451</p>
      </v-flex>

      <v-flex xs12 sm12 md4 lg4 class="socials-flex">
        <h3>Reseau Sociaux</h3>
        <a
          href="https://www.instagram.com/Ogobygloria/"
          class="social-link"
          style="text-decoration: none;"
          target="_blank"
          ><v-icon medium class="social-icon">fab fa-instagram</v-icon></a
        >
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "foot",

  data() {
    return {};
  },

  created() {},

  methods: {}
};
</script>

<style scoped>
.footer {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  padding-top: 40px;
  padding-bottom: 40px;
}

.footer-layout {
  width: 100%;
  height: auto;
}

.contact-flex {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.socials-flex {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.contact-flex h3,
.socials-flex h3 {
  color: white;
  margin-bottom: 5px;
}

.contact-flex p,
.socials-flex p {
  color: white;
  margin: 0px;
  margin-bottom: 5px;
  font-size: 15px;
}

.contact-flex p .v-icon,
.socials-flex p .v-icon {
  font-size: 16px;
  color: white;
  padding-right: 5px;
}

.social-link {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: auto;
}

.social-link .v-icon {
  color: white;
}

.social-link:hover .v-icon {
  color: #8b53ff;
}

@media only screen and (max-width: 500px) {
  .contact-flex {
    justify-content: center;
    align-items: center;
  }

  .socials-flex {
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .social-link {
    justify-content: center;
    align-items: center;
  }
}
</style>
