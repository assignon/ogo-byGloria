<template>
  <div class="bag-core">
    <v-layout row wrap class="product-container" style="width: 100%">
      <v-flex
        xs6
        sm6
        md3
        lg3
        class="product-flex animated zoomIn"
        v-for="(bag, i) in bagsArr"
        :key="i"
        :style="{ animationDelay: i / 10 + 's' }"
      >
        <Product
          :productImage="bag.fields.product_image"
          :productName="bag.fields.product_name"
          :productPrice="bag.fields.product_price"
          :productId="bag.pk"
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Product from "../components/layouts/Product";
export default {
  name: "bag",

  components: {
    Product: Product
  },

  data() {
    return {
      bagsArr: []
    };
  },

  created() {
    this.getBags();
    console.log(this.bagsArr);
  },

  mounted() {
    this.$store.commit("showMenus");
  },

  methods: {
    getBags() {
      let self = this;
      this.$axios
        .get(`${this.$store.state.HOST}/api/product/bags/`, {})
        .then(response => {
          if (self.bagsArr.length === 0) {
            response.data.forEach(bag => {
              self.bagsArr.push(bag);
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style
  scoped
  rel="stylesheet"
  type="text/css"
  src="../styles/productLayout.css"
></style>
<style scoped>
.bag-core {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: 62vh;
  margin-bottom: 40px;
  margin-top: -40px;
}

.product-container{
  margin: auto;
  /*margin-top: 0px;*/
}

.product-flex {
  /*flex-direction: row;*/
  /*padding-left: 0px;*/
  /*margin-left: 10px;*/
  /*margin-right: 10px;*/
  /*margin-top: 20px;*/
  /*align-items: flex-start;*/
}

@media only screen and (max-width: 800px) {
  .bag-core {
    margin-top: 100px;
  }

  .product-flex{
    margin-bottom: 15px;
  }
}
</style>
