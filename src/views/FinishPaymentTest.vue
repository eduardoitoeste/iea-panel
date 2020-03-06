<template>
    <v-container fluid class="fill-height">
        <v-row
            align="center"
            justify="center"
        >
            <v-col cols="12" sm="12" md="6" class="text-center">
                <v-card
                    class="mx-auto"
                >   
                    <v-list-item-avatar
                        size="250"
                        tile
                    >
                        <v-img :src="img"></v-img>
                    </v-list-item-avatar>
                    
                    <h1>
                        Has Terminado el pago exitosamente! 
                    </h1>

                    <p class="title">
                        Toma un foto del codigo
                        <p v-for="(item , index) in codes" :key="index"><b class="success--text">{{item}}</b></p>
                         con tu telefono
                    </p>
                    
                    <v-divider></v-divider>
                    <v-list>
                        <v-subheader>REPORTE</v-subheader>
                        <v-list-item-group color="primary" >

                            <v-list-item color="success">
                                <v-list-item-icon>
                                    <v-icon>mdi-cash-usd</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="text-start">
                                    <v-list-item-title ><h1>Total a pagar</h1></v-list-item-title>
                                </v-list-item-content>
                                <v-chip color="success"><h1>${{payment.total}}</h1></v-chip>
                            </v-list-item>

                            <v-list-item color="warning">
                                <v-list-item-icon>
                                    <v-icon>mdi-credit-card-outline</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="text-start">
                                    <v-list-item-title class="black--text"><h1>Total pagado</h1></v-list-item-title>
                                </v-list-item-content>
                                <v-chip color="warning"><h1>${{payment.tt}}</h1></v-chip>
                            </v-list-item>


                            <!-- response del servidor -->
                            <v-list-item color="info" v-if="typePayment.type != 0">
                                <v-list-item-icon>
                                    <v-icon :color="typePayment.type === 1 ? 'danger' : 'success'">{{typePayment.type === 1 ? 'mdi-window-minimize' : 'mdi-plus' }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="text-start">
                                    <v-list-item-title class="black--text"><h1>{{typePayment.type === 1 ? 'Falta por pagar:' : 'Saldo a favor' }}</h1></v-list-item-title>
                                </v-list-item-content>
                                <v-chip color="info"><h1>${{typePayment.total}}</h1></v-chip>
                            </v-list-item>

                        </v-list-item-group>
                    </v-list>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn
                            x-large
                            text
                            color="success"
                            @click="endProcess()"
                        >
                            Terminar el proceso
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <div style="display:none">{{logout}}</div>
            <div style="display:none">{{finalPaymentMachine}}</div>
            <div style="display:none">{{dataSendApiConceptoRegular}}</div>
        </v-row>
    </v-container>
</template>
<script>
import satisfied from '../assets/satisfied.svg'
export default {
    mounted(){
        
    },
    data(){
        return{
            img:satisfied,
            codes:[],
            typePayment:{
                type:0,
                total:0
            },
            payment:{}
        }
    },
    destroyed(){
        console.log('detroy componente finish')
        
    },
    computed:{
        dataSendApiConceptoRegular(){
            // console.log('detalle',this.$store.getters.dataSendApiConceptoRegular)

            let data = this.$store.getters.dataSendApiConceptoRegular.pagos
            
            for(let index in data){
                this.codes.push(data[index].code)
            }
            console.log('codes',this.codes)
            return this.$store.getters.dataSendApiConceptoRegular
        },
        finalPaymentMachine(){
            // console.log(this.$store.getters.finalPayment.data.total)
            if(this.$store.getters.finalPaymentMachine.response < 0){
                // saldo a favor
                this.typePayment.total = this.$store.getters.finalPaymentMachine.response*-1
                this.typePayment.type = 2
            }else if(this.$store.getters.finalPaymentMachine.response > 0){
                this.typePayment.total = this.$store.getters.finalPaymentMachine.response
                this.typePayment.type = 1
            }else{
                this.typePayment.total = 0
                this.typePayment.type = 0
            }
            this.payment = this.$store.getters.finalPaymentMachine.data
            console.log('payment',this.payment)
            return this.$store.getters.finalPaymentMachine
        },
        logout(){
            // if(this.$store.getters.logout){
            //     this.$route.replace({name:'home'})
            // }
            return this.$store.getters.logout
        },
    },
    methods:{
        endProcess(){
            this.$store.dispatch('logout',true)
            
        }
    }
}
</script>