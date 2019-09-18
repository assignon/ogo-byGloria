<template>
  <div class="about-core animated fadeIn">
    <v-layou column justify-center align-center class="about-layout">

      <v-flex xs10 sm10 md10 lg10 class="about-head-flex">
        <h2 class="font-weight-bold mb-2 animated fadeInUp">A propos d'Ogo By Goria</h2>
        <v-divider color="white" style="width: 100%;"></v-divider>
      </v-flex>

      <v-flex xs10 sm10 md10 lg10 xl10 class="stories-flex mt-5" v-for="(story,i) in stories" :key=i>
        <div class="story-titel mb-3" :class="story.elemClass">
          <div class="story-img" data-aos="zoom-in" :style="{backgroundImage: `url(${story.storyImg})`}"></div>
          <h3 class="font-weight-bold" style="color: #FFCC80;text-transform: capitalize;" :data-aos="story.animation" data-aos-delay="100">{{story.titel}}</h3>
          <!-- <v-divider style="width:50%"></v-divider>s -->
        </div>
        <v-divider style="width:55%" color="#152439" class="mb-1"></v-divider>
        <p class="story-content" :class="story.elemClass" data-aos="fade-up" data-aos-delay="200">{{story.content}}</p>
      </v-flex>
      <v-flex xs10 md10 md8 lg8 xl8 class="story-end mt-5" data-aos="fade-in" data-aos-duration="1000">
        <v-divider style="width:100%" color="" class="mb-4"></v-divider>
        <p>
          Ogo By Gloria est tout simplement la définition de tout est possible à celui qui croit.<br>
          Je remercie toutes personnes qui à participer à la naissance d Ogo By Gloria.<br>
          J'en suis sûr , ce n'est que le début.. <br><br>
        </p>
      </v-flex>
    </v-layou>
  </div>
</template>

<script>
export default {
  name: 'about',

  data(){
    return{

      stories: [
        {titel: 'Ogo By Gloria', storyImg: '', elemClass: "elem-odd", animation: 'slide-right', content: "Hello, je m'appelles Gloria la créatrice de la marque d accessoires et de sacs d'Ogo By Gloria. Tout d'abord d'où m'est venu le nom Ogo? Je m en souviens que ma cousine m'avait posé la question de savoir ce que Ogo voulait dire."},
        {titel: "La définition d'Ogo", storyImg: '', elemClass: "elem-even", animation: 'slide-left', content: "Pour commencer Ogo vient du Yoruba, qui signifie Gloire. Rien avoir avec mon prénom. J'ai toujours été inspiré par la gloire comme la plupart des personnes. Connaissez vous le groupe Ibeyi? Ibeyi est un groupe de chanteuse composé de jumelles. En faisant des recherches sur leur noms, j ai découvert que Ibeyi signifiait jumelle en Yoruba. Du coup , je me suis dis pourquoi traduit gloire en Yoruba. Voilà comment le nom Ogo By Gloria est né. Vous avez compris pourquoi Gloria ? C est mon prénom."},
        {titel: "La naissance d'Ogo By Gloria", storyImg: require('../assets/about/born.svg'), elemClass: "elem-odd", animation: 'slide-right', content: "Ogo By Gloria est née dans mon cœur en 2017. Je travaillais en tant que assistante back-office. Devant mon écran au bureau, j'ai eu cette image de sacs en tête et depuis ce jour je ne rêve que de ce jour. Es ce possible de réaliser ce rêve? Suis-je assez forte, responsable pour gérer un site, une entreprise? Toutes ses questions qui sont là à chaque instant n'ont pas eu que d'effet négative et dissuasive mais au contraire ils ont été aussi la motivation et l inspiration qui m'ont aidé à me lancer."},
        {titel: 'Voyage', storyImg: require('../assets/about/travel.svg'), elemClass: "elem-even", animation: 'slide-left', content: "En mars 2019, je décide d'aller au Sénégal et je suis tomber amoureuse de ce pays. En visitant le marché et je me suis dis made in Sénégal why not? Je me suis promis de revenir dans ce pays afin de concrétiser ma vision qui est baser sur l Afrique. En juin 2019 , me re voilà au Sénégal. Durant mon séjours j ai rencontré de belles personnes , de belles rencontres qui m'ont aider dans ma vision. Et je les remercie de tout cœur , mon couturier, mon designer Alpha un amour. Il est d'une patiente incroyable."},
        {titel: 'remerciement', storyImg: require('../assets/about/thanks.svg'), elemClass: "elem-odd", animation: 'slide-right', content: "Je n'oublie pas Pico, un jeune entrepreneur qui m à aider à trouver des idées de boucles d'oreilles. Sans oublier mes amis que je considère comme une famille, ils sont rester disponibles afin de m aider pour le déplacement. Zut j'ai oublié un ami qui appris du temps pour me faire ce site. Yanick un ami si généreux. Je vous souhaite d'avoir des amis aussi prévenants. Voilà Ogo By Gloria je ne l ai point fais seule."}
      ]

    }
  },

  created(){

  },

  mounted(){
    this.$store.commit('showMenus')
  },

  methods(){

  }
}
</script>

<style scoped>
  .about-core{
    min-height: 52vh;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #4A148C; */
  }

  .about-layout{
    width: 90%;
    height: auto;
  }

  .about-head-flex{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-bottom: 50px;
  }
  .aboout-head-flex h2{
    text-align: center;
    margin: 0px;
  }

  .stories-flex{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: auto;
  }

  .stories-flex:nth-child(odd){
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    margin: auto;
  }

  .story-titel{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

  .elem-odd{
    /* flex-direction: row-reverse; */
    text-align: left;
  }

  .elem-even{
    flex-direction: row-reverse;
    text-align: right;
  }
  
  .elem-odd h3{
    margin-left: 10px;
  }

  .elem-even h3{
    margin-right: 10px;
  }

  /* .stories-flex:nth-child(odd) .story-titel{
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    align-items: center;
  } */

  .story-img{
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80%;
    width: 80px;
    height: 80px;
    border: 1px solid #FFCC80;
    background-color: #FFCC80;
    border-radius: 3px;
  }

  .story-titel h3{
    text-align: left;
  }

  .story-content{
    width: 50%;
    height: auto;
    font-size: 16px;
    font-weight: bold;
    color: #152439;
  }


  .story-end{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  .story-end p{
    width: 100%;
    height: auto;
    text-align: center;
    font-size: 16px;
  }
</style>
