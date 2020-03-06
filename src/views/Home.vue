<template>
    <v-container fluid class="fill-height">
      <v-row>
        <v-card
            class="mx-auto pt-5 pl-5 pr-5 pb-5"
            width="800"
            max-width="500"
            
            v-if="!verifySys"
          >
            <v-img
              class="p-5"
              
              :src="img"
            >
            </v-img>

            <h1 class="text-center pt-5">
              ERROR!!!
            </h1>

            <v-card-text class="text--primary text-center">
              <h3>El sistema está desactivado, comuníquese con un operación.</h3>
            </v-card-text>
          </v-card>

        <v-col cols="12" style="margin-top:200px;">
          <v-row
            align="center"
            justify="center"
            class=""
          >
            <v-card class="elevation-0" color="primary" v-if="verifySys">
              <v-card-title class="secondary--text ml-5 mb-3">Pago utilizando Efectivo</v-card-title>
              <v-card-text>
                <v-card
                  width="300"
                  height="70"
                  elevation="1"
                  color="fourth"
                  tile="tile"
                  class="text-center"
                  @click="comenzarPago()"
                >
                  <h1 class="secondary--text pt-5">¡Comenzar!</h1>
                </v-card>
              </v-card-text>
            </v-card>

          </v-row>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>

import ApiRest from '../js/Api'
import alertLogo from '../assets/exclamation-mark.svg'
let Api = new ApiRest();
export default {
  components: {
  },
  mounted(){
    this.$store.dispatch('clearStore',true)
    this.$store.dispatch('verifySys',true)
    console.log('modificado state')
    localStorage.token = ''
    console.log('dawdawd',localStorage)
    this.$store.dispatch('subTitleHeader',{title:'¿Sabías que tenés otros canales de pago? Ingresá a:',subTitle:'Sistemaiea.com/alumnos',type:'text'})
    Api.finishPayment().then(response=>{
      console.log('Maquina limpia')
    }).catch(err=>{
        console.error('3',err)
    })
  },

  destroyed(){
    // console.log('DESTRUIDO COMPONENT')
  },
  data(){
        return{
            img:alertLogo
        }
    },
  computed:{
    verifySys(){
      return this.$store.getters.verifySys
    }
  },
  methods:{
    comenzarPago () {
      console.log('comenzar pago')
      this.$router.push({ name: 'InitSession'})
    },
    swipe(){
      console.log('awdawdawdawdawdaw')
    }
  }
};
</script>
