<template>
  <v-app>
    <!-- <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar> -->

    <v-content class="primary"  >
      <Header/>
      <AlertSys/>
      <!-- <ButtonFloat/> -->
      <!-- <InfoUser/> -->
      <LoaderModal/>
      <DialogConfirm/>
      <v-container fluid>
        <v-alert
            :value="alertUpdate.view"
            prominent
            :type="alertUpdate.type"
            :elevation="5"
            fixed
            class="alert-update"
            transition="scale-transition"
            absolute
          >
            <v-row align="center">
              <v-col class="grow">{{alertUpdate.text}}</v-col>
            </v-row>
            <v-row align="end" v-show="alertUpdate.viewButtonReinicio">
              <v-col class="shrink">
                <v-btn @click="installUpdate()">Reiniciar</v-btn>
              </v-col>
            </v-row>
          </v-alert>
        

        <v-col cols="12" sm="12" md="12" class="text-center mb-n5 title" v-if="this.$store.getters.credentials.auth">
                <h1 class="secondary--text">Bienvenido {{this.$store.getters.credentials.user.Apellidos}} {{this.$store.getters.credentials.user.Nombres}}.</h1>
        </v-col>
        <v-btn @click="testExample(1)">excvample</v-btn>
        <transition name="fade">
         <router-view/>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import Header from './components/Header'
import AlertSys from './components/AlertSys'
import LoaderModal from './components/LoaderModal'
import InfoUser from './components/InfoUser'
import DialogConfirm from './components/DialogConfirm'
import ButtonFloat from './components/ButtonFloat'
import { ipcRenderer } from 'electron'
let routes = [
  'InsertPayment',
  'home',
  'InitSession',
  'InsertPaymentConceptoRegular'
]
let limit = 30
export default {
  name: 'App',
  components: {
    Header,
    AlertSys,
    LoaderModal,
    InfoUser,
    DialogConfirm,
    ButtonFloat
  },
  mounted(){
      
      ipcRenderer.send('app_version');
      ipcRenderer.on('app_version', (event, arg) => {
        // ipcRenderer.removeAllListeners('app_version');  
        console.log("%cVERSION "+arg.version, "font-family: ';Arial';, serif; color: blue; font-size: 20px");
      });

      ipcRenderer.on('test_update', (event, arg) => {
        console.log('dato de uodate',arg)
      });

      ipcRenderer.on('update_available', (event, arg) => {
        console.log('update_available')
        this.alertUpdate.view = false
        setTimeout(() => {
          this.alertUpdate.view = arg.view
          this.alertUpdate.text = arg.text
          this.alertUpdate.type = arg.type
          this.alertUpdate.viewButtonReinicio = arg.viewButtonReinicio
        }, 1000);
        
        // console.log('press')
      });

      ipcRenderer.on('update-downloaded', (event, arg) => {
        console.log('update-downloaded')
        this.alertUpdate.view = false
        setTimeout(() => {
          this.alertUpdate.view = arg.view
          this.alertUpdate.text = arg.text
          this.alertUpdate.type = arg.type
          this.alertUpdate.viewButtonReinicio = arg.viewButtonReinicio
        }, 1000);
        // console.log('press')
      });

      let x = 0
      let that = this
      this.intervalVar = setInterval(() => {
        // console.log('dawdawdaw',x)
        // this.$socket.emit('test', x);
        for(let index in routes){
          if(routes[index] == this.$route.name){
            return
          }
          
        }
          // console.log('verificando estado',x)
          document.onmousemove = function(){
            // console.log('cambio del mouse')
            x=0

            that.$socket.emit('using-machine');
            // return
          };
          document.onkeypress = function(){
            // console.log('cambio del press')
            that.$socket.emit('using-machine');
            x=0
            // return
          };
          // console.log(this.$route.name)
          if(this.$route.name == 'FinishPayment' || this.$route.name == 'FinishPaymentTest'){
            if(x == 60){
              this.$store.dispatch('logout',true)
              x = 0
              return
            }
            
          }else{
            if(x == 30){
              this.$store.dispatch('logout',true)
              x = 0
              return
            }
            
          }
          
          
          x++
        }, 1000);
  },
  data: () => ({
    intervalVar:null,
    alertUpdate:{
      text:'',
      view:false
    }
  }),
  computed:{
    credentials(){
          if(this.$store.getters.credentials.auth){
              this.view = true
              this.infoUser.name = this.$store.getters.credentials.user.Apellidos+' '+this.$store.getters.credentials.user.Nombres
              this.infoUser.email =this.$store.getters.credentials.user.Email
          }else{
              this.view = false
          }
          return this.$store.getters.credentials
      }
  },
  methods:{
    keymonitor(){
      console.log('se presiono')
    },
    installUpdate(){
      ipcRenderer.send('restart_app');
    },
    testExample(id){
        ipcRenderer.send('update-available-test',id);
    }
  }
};
</script>

<style>
  .alert-update{
    position:fixed;
    width: 30%;
    bottom:0%;
  }
</style>
