<template>
    <v-container fluid class="fill-height">
      <v-row>
        <v-col cols="12" sm="12" md="12" class="text-center">
          <h2 class="secondary--text ml-5">Seleccioná el tipo de Documento</h2>
        </v-col>
        <!-- botton dni -->
        <v-row
            align="center"
            justify="center"
          >
        <v-col cols="12" sm="12" md="4">
            <v-card
                :color="selectTypeDni ? 'fourth' : 'primary' "
                width="100%"
                height="70"
                :elevation="selectTypeDni ? 0 : 5 "
                tile="tile"
                class="text-center float-right"
                @click="selecOptionDoc(1)"
            >
              <h1 class="secondary--text pr-5 pt-2">
                <img :src="img" alt="" v-if="selectTypeDni" class="ml-3 float-left" width="50">
                DNI
              </h1>
            </v-card>
        </v-col>
        <!-- fin  botton dni -->
            <!-- botton pasaporte -->
        <v-col cols="12" sm="12" md="4">
            <v-card 
                :color="selectTypePass ? 'fourth' : 'primary' "
                width="100%"
                height="70"
                :elevation="selectTypePass ? 0 : 5 "
                tile="tile"
                class="text-center"
                
                @click="selecOptionDoc(2)"
                
            >
              <h1 class="secondary--text pr-5 pt-2">
                <img :src="img" alt="" v-if="selectTypePass" class="ml-3 float-left" width="50">
                PASAPORTE
              </h1>
            </v-card>
        </v-col>
        <!-- fin  botton pasaporte -->
        </v-row> 

        <v-col cols="12" sm="12" md="12" class="text-center mt-2">
          <h2 class="secondary--text ml-5">Seleccionaste {{selectTypeDni ? 'DNI' : 'PASAPORTE'}} , por favor escribilo</h2>
        </v-col>


        <v-row
            align="center"
            justify="center"
          >
          <v-col cols="12" sm="12" md="6" class="">
            <v-col cols="12" sm="12" md="12">
                <v-sheet
                    width="100%"
                    height="70"
                    elevation="elevation-5"
                    :color="colorInput"
                    tile="tile"
                    style
                    class="text-center"
                    
                  >
                    <h1 class="black--text pt-3">
                      {{dataType.doc}}
                    </h1>
                </v-sheet>
            </v-col>
            <br>
            <br>
            <v-col cols="12" sm="12" md="12">
                  <v-card
                      width="100%"
                      height="70"
                      elevation="1"
                      color="fourth"
                      tile="tile"
                      class="text-center"
                      @click="nextPage()"
                    >
                      <h1 class="secondary--text pt-3">SIGUIENTE
                      </h1>
                  </v-card>
            </v-col>
          </v-col>
        </v-row> 

        <v-col cols="12" sm="12" md="6">
            <v-card 
              width="100%"
              height="100%"
              elevation="0"
              color="secondary"
              tile="tile"
              class="text-center pl-3 pr-3"
              
            >
            <v-row
              style="background-color:secondary;"
             width="100%"
             height="100%"
            >
              <v-col 
                v-for="(item , index) in itemsTeclado" :key="index"
                :cols="item.cols"
                style="border: 1px solid grey; background-color:primary; cursor:pointer"
                class="pt-4 pb-4"
                width="100%"
                height="100%"
              >

                <v-card
                  class="d-flex align-center"
                  elevation="0"
                  height="100%"
                  @click="insertNumber(item.value)"
                >

                    <div
                      class="flex-grow-1 text-center"
                    >
                      <h1 >{{item.title}}</h1>
                    </div>

                </v-card>
              </v-col>
            </v-row>
            </v-card>
        </v-col>
        
        
      </v-row>
      <div style="display:none">{{credentials}}
      </div>
    </v-container>
</template>

<script>

import img from '../assets/checked.svg'
// import delete from '../assets/delete.svg'
export default {
  components: {
  },
  mounted(){
      // console.log(this.$vuetify.icons)
      this.$store.dispatch('subTitleHeader',{title:'',subTitle:''})
      this.itemsTeclado = this.numbers
  },
  data(){
    return{
      img:img,
      selectTypeDni:true,
      selectTypePass:false,
      itemsTeclado:'',
      colorInput:'secondary',
      dataType:{
        type:1,
        doc:'93539581'
        // doc:'30154067'
        
        // doc:''
      },
      numbers:[
        {title:1 , value:'1',color:'border: 1px solid grey; background-color:secondary',img:null,cols:4},
        {title:2 , value:'2',color:'border: 1px solid grey; background-color:secondary',img:null,cols:4},
        {title:3 , value:'3',color:'border: 1px solid grey; background-color:secondary',img:null,cols:4},

        {title:4 , value:'4',color:'border: 1px solid grey; background-color:secondary',img:null,cols:4},
        {title:5 , value:'5',color:'border: 1px solid grey; background-color:secondary',img:null,cols:4},
        {title:6 , value:'6',color:'border: 1px solid grey; background-color:secondary',img:null,cols:4},

        {title:7 , value:'7',color:'border: 1px solid grey; background-color:secondary',img:null,cols:4},
        {title:8 , value:'8',color:'border: 1px solid grey; background-color:secondary',img:null,cols:4},
        {title:9 , value:'9',color:'border: 1px solid grey; background-color:secondary',img:null,cols:4},

        {title:'abc' , value:'abc',color:'border: 1px solid grey; background-color:primary',img:require('../assets/hastag.svg'),cols:4},
        {title:0 , value:0,color:'border: 1px solid grey; background-color:secondary',img:null,cols:4},
        {title:'Borrar' , value:'DEL',color:'border: 1px solid grey; background-color:primary',img:require('../assets/delete.svg'),cols:4},
      ],
      letters:[
        {title:'q' , value:'q',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'w' , value:'w',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'e' , value:'e',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'r' , value:'r',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'t' , value:'t',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'y' , value:'y',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'u' , value:'u',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'i' , value:'i',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'o' , value:'o',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'p' , value:'p',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'a' , value:'a',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'s' , value:'s',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'d' , value:'d',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'f' , value:'f',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'g' , value:'g',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'h' , value:'h',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'j' , value:'j',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'k' , value:'k',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'l' , value:'l',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'z' , value:'z',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'x' , value:'x',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'c' , value:'c',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'v' , value:'v',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'b' , value:'b',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        
        {title:'n' , value:'n',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},
        {title:'m' , value:'m',color:'border: 1px solid grey; background-color:secondary',img:null,cols:2},

        
        // {title:0 , value:0,color:'border: 1px solid grey; background-color:secondary',img:null,cols:4},
        {title:'123' , value:'123',color:'border: 1px solid grey; background-color:primary',img:require('../assets/hastag.svg'),cols:4},
        {title:'Borrar' , value:'DEL',color:'border: 1px solid grey; background-color:primary',img:require('../assets/delete.svg'),cols:4},
      ],
      // background-color:primary
    }
  },
  computed: {
    credentials(){
        // console.log('credencial',this.$store.getters.credentials)
        if(this.$store.getters.credentials.auth){
          this.$store.dispatch('modal',{title:'',subTitle:'',dialog:false,result:null})
          
          console.log('pago regulares',this.$store.getters.credentials.user.conceptosRegulares)
          
          console.log(this.$store.getters.credentials.user.conceptosRegulares.length)
          if(this.$store.getters.credentials.user.conceptosRegulares.length > 0){
            this.$router.push({ name: 'SelectTypePayment'})
          }else{
            this.$router.push({ name: 'StartPayment'})
          }
          
        }else{
          if(this.$store.getters.credentials.repeated){
            this.$store.dispatch('modal',{title:'Inconsistencia en los datos de usuario',subTitle:'Existen dos usuarios registrados con el mismo DNI , para continuar con el pago pongase en contacto con un operador',dialog:true,result:null})
          }
        }
        return this.$store.getters.credentials
    }
  },
  methods:{
    selecOptionDoc(type){
      if(type === 1){
        this.selectTypeDni = true
        this.selectTypePass = false
        this.dataType.type = 1
      }else{
        this.selectTypeDni = false
        this.selectTypePass = true
        this.dataType.type = 2
      }
    },
    insertNumber(val){
      if(val === '123'){
        this.itemsTeclado = this.numbers
        
        return
      }
      if(val === 'abc'){
         this.itemsTeclado = this.letters
         return
      }
      // console.log(this.dataType.doc.length)
      this.colorInput = 'secondary'
      if(val === 'DEL'){
        let temp = this.dataType.doc.substring(0,this.dataType.doc.length-1)
        this.dataType.doc = temp
      }else{
        if(this.dataType.doc.length > 15){
          return
        }else{
          this.dataType.doc = this.dataType.doc + val
        }
      }
      
    },
    nextPage(){
      if(this.dataType.doc.length == 0){
        console.log('esta vacio')
        this.$store.dispatch('alertSys',{snackbar:true,text:'Error el campo no puede estar vacio',color:'danger'})
        this.colorInput = 'danger'
      }else{
        if(this.dataType.type == 1){
          if(/^([0-9])*$/.test(this.dataType.doc)){
            console.log('solo numero')
            this.$store.dispatch('credentials',this.dataType)
          }else{
            console.log('tiene letras')
            this.$store.dispatch('alertSys',{snackbar:true,text:'Error el campo DNI no puede contener letras',color:'danger'})
          this.colorInput = 'danger'
          }
        }else{
          this.$store.dispatch('credentials',this.dataType)
        }
        // console.log(this.dataType.doc)
        
      }
    }
  }
};
</script>
