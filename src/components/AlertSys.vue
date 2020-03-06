<template>
  <div class="text-center ma-2">
    <v-snackbar
        
      top
      multi-line
      v-model="snackbar"
      :color="alertSys.color"
    >
      {{ text }}
      <v-btn
        color="secondary"
        text
        @click="snackbar = false"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    data(){
        return{
            snackbar:false,
            text:''
        } 
    },
    computed: {
      alertSys(){
          this.snackbar = this.$store.getters.alertSys.snackbar
          this.text = ''
          // console.log('tamaño',typeof this.$store.getters.alertSys.text)
          if(typeof this.$store.getters.alertSys.text == 'object'){
            let data = this.$store.getters.alertSys.text
            for(let index in data){
              this.text += index+' : '+data[index]+'\n'+'\n'
            }
            console.log(this.text)
          }else{
            this.text = this.$store.getters.alertSys.text
          }
          return this.$store.getters.alertSys
      }
    },
  }
</script>