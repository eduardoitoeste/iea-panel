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

                <fragment v-if=" items.length == 0">
                    <v-col cols="12" sm="12" md="6" class="mt-10">
                        <v-card
                            width="100%"
                            height="100%"
                            elevation="1"
                            color="info"
                            
                            class="text-center"
                            @click="closeSession()"
                        >
                            <h1 class="secondary--text pt-3 pb-3">No posee deudas</h1>
                        </v-card>
                    </v-col>
                </fragment>


                <v-col cols="12" sm="12" md="8" v-for="(item,index) in items" :key="index">
                    <v-card
                        :color="item.selected ? 'fourth' : 'primary'"
                        width="100%"
                        height="100%"
                        :elevation="item.selected ? '0' : '5'"
                        tile="tile"
                        class="text-center float-right"
                        @click="selecOption(index,item.status)"
                    >
                    <v-row
                        align="center"
                        justify="center"
                    >
                        <v-col cols="2">
                            <img :src="img" v-if="item.selected" alt="" class="ml-3 float-left" width="50">
                        </v-col>
                        <v-col cols="3">
                            <v-chip
                                class="ma-2 pl-5 pr-5 secondary--text title float-left"
                                :style="item.descuento ? 'background-color:#01579B; border: 1px solid white;width:150px' : 'background-color:#E53935; border: 1px solid white;width:150px'"
                                >
                                {{item.descuento ? 'Descuento' : 'Vencido'}}
                            </v-chip>
                        </v-col>
                        <v-col cols="7" class="secondary--text float-left pr-5 pt-2">
                            <h1 v-if="item.status != 2">{{item.Materia}} - ${{item.precioAPagar}}</h1>
                            <h1 v-else>{{item.Materia}} - <small style="color:orange">Pendiente por revision</small></h1>
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
            <!-- <ButtonCancel v-if="items.length > 0"/> -->
        </v-row>
        <div style="display:none">{{paymentPlans}}</div>
        <!-- <div style="display:none">{{dataSendApi}}</div> -->
        <!-- <div style="display:none;">{{modal}}</div> -->
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
        this.items= [];
        this.searchPaymentEval()
    },
    data(){
        return{
            items:[],
            img:img,
            total:0,
            itemsSend:0,
            interval:null,
        }
    },
    computed:{
        paymentPlans(){
            this.items= [];
            let data = this.$store.getters.paymentPlans.items
            let selected = false;
            for(let index in data){
                this.items.push({
                    IDStB:data[index].IDStB,
                    Curso:data[index].Curso,
                    Materia:data[index].Materia,
                    descuento:data[index].descuento,
                    precioAPagar:data[index].precioAPagar,
                    selected:false,
                    status:data[index].status
                })
                if(!selected && data[index].status != 2){
                    this.items[index].selected = true
                    this.total = this.items[index].precioAPagar
                    selected = true
                }
                
            }
            return this.$store.getters.paymentPlans
        },
    },
    destroyed(){
        clearInterval(this.interval)
    },
    methods:{
        searchPaymentEval(){
            let x= 0
            this.interval = setInterval(() => {
                if(x > 5){
                    if(this.items.length == 0){
                        // console.log('atraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas')
                        this.$router.back();
                        clearInterval(this.interval)
                        x = 0
                        return
                    }
                }
                // console.log('x',x)
                x++
            }, 1000);
            
        },
        selecOption(key,status){
            if(status == 2){
                return
            }
            this.items[key].selected = !this.items[key].selected
            if(this.items[key].selected){
                this.total = this.total + this.items[key].precioAPagar
            }else{
                this.total = this.total - this.items[key].precioAPagar
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
                this.$store.dispatch('dataSendApi',this.itemsSend)
                this.$router.push({ name: 'InsertPayment'})
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