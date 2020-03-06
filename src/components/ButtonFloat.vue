<template>
    <v-speed-dial
      v-model="fab"
      v-show="view"
      bottom
      right
      fixed
      :direction="direction"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn
          x-large
          v-model="fab"
          color="success"
          dark
          fab
        >
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-btn
        v-for="(item,index) in items"
        :key="index"
        fab
        dark
        :color="item.color"
        :title="item.text"
        @click="closeSession(item.type)"
      >
        <v-icon>{{item.icon}}</v-icon>
      </v-btn>
      <div style="display:none">{{credentials}}</div>
      <div style="display:none">{{logout}}</div>
    </v-speed-dial>
</template>
<script>
  export default {
    data: () => ({
      direction: 'top',
      fab: false,
      fling: false,
      tabs: null,
      transition: 'slide-y-reverse-transition',
      view:false,
      items:[
          {text:'Terminar trabajo',icon:'mdi-account-arrow-left',type:0,color:'danger'}
      ]
    }),

    computed: {
      activeFab () {
        switch (this.tabs) {
          case 'one': return { class: 'purple', icon: 'account_circle' }
          case 'two': return { class: 'red', icon: 'edit' }
          case 'three': return { class: 'green', icon: 'keyboard_arrow_up' }
          default: return {}
        }
      },
      credentials(){
            if(this.$store.getters.credentials.auth){
                this.view = true
            }else{
                this.view = false
            }
            return this.$store.getters.credentials
      },
      logout(){
            console.log('cierra',this.$store.getters.logout)
            if(this.$store.getters.logout){
                console.log('cierra')
                this.$store.dispatch('logout',false)
                this.$router.replace({name:'home'})
            }
            return this.$store.getters.logout
        },
    },
    methods:{
        closeSession(type){
            switch (type) {
                case 0:
                        console.log('cerrar sesion')
                        this.$store.dispatch('logout',true)
                    break;
            
                default:
                    break;
            }
        }
    }
  }
</script>
<style>
  /* This is for documentation purposes and will not be needed in your application */
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>