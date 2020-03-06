<template>
  <!-- <v-card
    
  > -->
    <v-navigation-drawer
      v-show="view"
      touchless
      expand-on-hover
      permanent
      fixed
      height="300px"
      right
      color="secondary"
      style="top:25%;"
    >
      <template v-slot:prepend>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="infoUser.img"></v-img>
            </v-list-item-avatar>
            <v-list-item-title class="title">{{infoUser.name}}</v-list-item-title>
          </v-list-item>

          <v-list-item
            link
            two-line
          >
            <!-- <v-list-item-content> -->
              
              <v-list-item-subtitle>{{infoUser.email}}</v-list-item-subtitle>
            <!-- </v-list-item-content> -->
            <!-- <v-list-item-action>
              <v-icon>mdi-menu-down</v-icon>
            </v-list-item-action> -->
          </v-list-item>
        </v-list>
      </template>

      <v-divider></v-divider>

      <v-list
        nav
        dense
      >
        <v-list-item  v-for="(item,index) in itemsMenu" :key="index" @click="menuFun(item.type)">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.text}}</v-list-item-title>
        </v-list-item>
      </v-list>
      <div style="display:none">{{credentials}}</div>
      <div style="display:none">{{logout}}</div>
      
    </v-navigation-drawer>
  <!-- </v-card> -->
</template>
<script>
export default {
    data(){
        return{
            infoUser:{
                name:'',
                img:'https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png',
                email:'',
                
            },
            view:false,
            itemsMenu:[
                {text:'Cerrar Session',icon:'mdi-account-arrow-left',type:0},
                // {text:'Info',icon:'mdi-information',type:1}
            ],
            drawer:false
        }
    },
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
        },
        logout(){
            // console.log('listo para cerrar sesion',this.$store.getters.logout)
            // if(this.$store.getters.logout){
            //     this.$router.replace({name:'home'})
            // }
            return this.$store.getters.logout
        }
    },
    methods:{
        menuFun(type){
            console.log('ejecutando',type)
            switch (type) {
                case 0:
                    // cerrar sesion
                    console.log('cerrar sesion')
                    this.$store.dispatch('logout',true)
                    
                    break;
            
                default:
                    break;
            }
        },
        
    }
}
</script>