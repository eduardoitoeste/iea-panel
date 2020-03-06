<template>
    <v-container fluid class="fill-height">
        <v-row
            align="center"
            justify="center"
        >
            <v-col cols="12" sm="12" md="12" class="text-center">
                <h2 class="secondary--text ml-5">Selecciona el tipo de pago:</h2>
            </v-col>
            <v-container class="pl-10 pr-10">
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col cols="12" sm="12" md="8" v-for="(item,index) in items" :key="index">
                            <v-card
                                :color="item.selected ? 'fourth' : 'primary'"
                                width="100%"
                                height="100%"
                                :elevation="item.selected ? '0' : '5'"
                                tile="tile"
                                class="text-center float-right"
                                @click="selecOption(index)"
                            >
                                <v-row
                                    align="center"
                                    justify="center"
                                >
                                    <v-col cols="2">
                                        <img :src="img" v-if="item.selected" alt="" class="ml-3 float-left" width="50">
                                    </v-col>
                                    <v-col cols="10" class="secondary--text float-left pr-5 pt-2">
                                        <h1>{{item.text}}</h1>
                                    </v-col>
                                    
                                </v-row>
                            </v-card>
                        </v-col>
                </v-row>
            </v-container>
            <v-col cols="12" sm="12" md="3" class="mt-10">
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
                <ButtonCancel/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import img from '../assets/checked.svg'
import ButtonCancel from '../components/ButtonCancel'
export default {
    components:{
        ButtonCancel
    },
    data(){
        return{
            items:[
                {
                    text:'Pago Regulares',
                    route:'SelectPaymentPagoRegular',
                    selected:false
                },
                {
                    text:'Pago de matriculas',
                    route:'StartPayment',
                    selected:false
                },
            ],
            img:img,
            route:false,
        }
    },
    methods:{
        selecOption(key){
            for(let index in this.items){
                if(index == key){
                    this.items[index].selected = true
                    this.route = this.items[index].route
                }else{
                    this.items[index].selected = false
                }
            }
        },
        nextPage(){
            if(!this.route){
                this.$store.dispatch('modal',{title:'Sin opcion seleccinadas',subTitle:'Debes seleccionar una opcion para continuar',dialog:true,result:null,type:'ALERT'})
            }else{
                this.$router.push({ name: this.route})
            }
            
        }
    }
}
</script>