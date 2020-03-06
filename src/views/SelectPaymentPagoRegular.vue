<template>
    <v-container fluid class="fill-height">
        <v-row
            align="center"
            justify="center"
        >
            <v-col cols="12" sm="12" md="12" class="text-center">
                <h2 class="secondary--text ml-5">Esta es tu deuda:</h2>
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
                                <!-- <v-col cols="3"> -->
                                    <!-- <v-chip
                                        class="ma-2 pl-5 pr-5 secondary--text title float-left"
                                        :style="item.descuento ? 'background-color:#01579B; border: 1px solid white;width:150px' : 'background-color:#E53935; border: 1px solid white;width:150px'"
                                        >
                                        {{item.descuento ? 'Descuento' : 'Vencido'}}
                                    </v-chip> -->
                                <!-- </v-col> -->
                                <v-col cols="7" class="secondary--text float-left pr-5 pt-2">
                                    <h1>{{item.Concepto}} - ${{item.montoReal}}</h1>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <v-col cols="12" sm="12" md="3" class="mt-10" v-show="items.length > 0">
                <v-card
                    width="100%"
                    height="70"
                    elevation="1"
                    color="fourth"
                    tile="tile"
                    class="text-center"
                    @click="nextPage()"
                >
                    <h1 class="secondary--text pt-3">PAGAR ${{total}}
                    </h1>
                </v-card>
                <ButtonCancel v-if="items.length > 0"/>
            </v-col>
        </v-row>
        <div style="display:none">{{credentials}}</div>
        <div style="display:none">{{dataSendApiConceptoRegular}}</div>
    </v-container>
</template>
    
<script>
import img from '../assets/checked.svg'
import ButtonCancel from '../components/ButtonCancel'
export default {
    components:{
        ButtonCancel
    },
    mounted(){
        console.log('esooo')
    },
    data(){
        return{
            items:[],
            total:0,
            img:img,
            itemsSend:[]
        }
    },
    computed:{
        credentials(){
            console.log('credencial en pago regulares',this.$store.getters.credentials)
            let data = this.$store.getters.credentials.user.conceptosRegulares
            for(let index in data){
                // if(data[index][i].FormadePago > '2' || data[index][i].FormadePago > 2){
                    data[index].selected = false
                    this.items.push(data[index])
                // }
            }
            console.log('this.items',this.items)
        },
        dataSendApiConceptoRegular(){
            console.log('dataSendApiConceptoRegular',this.$store.getters.dataSendApiConceptoRegular)
            if(this.$store.getters.dataSendApiConceptoRegular){
                this.$router.push({ name: 'InsertPaymentConceptoRegular'})
            }
            
            
            return this.$store.getters.dataSendApiConceptoRegular
        }
    },
    methods:{
        selecOption(key){
            this.items[key].selected = !this.items[key].selected
            if(this.items[key].selected){
                this.total = this.total + this.items[key].montoReal
            }else{
                this.total = this.total - this.items[key].montoReal
            }
        },
        nextPage(){
            let data = this.items
            let count = 0
            let array = []
            for(let index in data){
                if(data[index].selected){
                    array.push(data[index])
                    count++
                }
            }
            this.itemsSend = {
                total:this.total,
                cantidad:count,
                items:array
            }
            if(this.itemsSend.cantidad > 0){
                this.$store.dispatch('dataSendApiConceptoRegular',this.itemsSend)
                
            }else{
                this.$store.dispatch('modal',{title:'Sin cuotas seleccinadas',subTitle:'Debes seleccionar por lo menos una cuota para pagar',dialog:true,result:null,type:'ALERT'})
            }
        },
        closeSession(){
            this.$router.back();
        }
    }
}
</script>