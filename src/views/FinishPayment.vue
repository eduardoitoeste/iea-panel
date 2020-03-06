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
                        <b class="success--text">{{dataSendApi.code}}</b> con tu telefono
                    </p>
                    
                    <v-divider></v-divider>
                    <v-list>
                        <v-subheader>REPORTE</v-subheader>
                        <v-list-item-group color="primary" >
                            <!-- <v-list-item-subtitle >aaaaa</v-list-item-subtitle> -->
                            <!-- <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-cash-multiple</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="text-start">
                                    <v-list-item-title >Billetes de 5 pesos </v-list-item-title>
                                </v-list-item-content>
                                <v-chip color="primary">{{finalPayment.data.b5}}</v-chip>
                            </v-list-item>
                            
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-cash-multiple</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="text-start">
                                    <v-list-item-title >Billetes de 10 pesos</v-list-item-title>
                                </v-list-item-content>
                                <v-chip color="primary">{{finalPayment.data.b10}}</v-chip>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-cash-multiple</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="text-start">
                                    <v-list-item-title >Billetes de 20 pesos</v-list-item-title>
                                </v-list-item-content>
                                <v-chip color="primary">{{finalPayment.data.b20}}</v-chip>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-cash-multiple</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="text-start">
                                    <v-list-item-title >Billetes de 50 pesos</v-list-item-title>
                                </v-list-item-content>
                                <v-chip color="primary">{{finalPayment.data.b50}}</v-chip>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-cash-multiple</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="text-start">
                                    <v-list-item-title >Billetes de 100 pesos</v-list-item-title>
                                </v-list-item-content>
                                <v-chip color="primary">{{finalPayment.data.b100}}</v-chip>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-cash-multiple</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="text-start">
                                    <v-list-item-title >Billetes de 500 pesos</v-list-item-title>
                                </v-list-item-content>
                                <v-chip color="primary">{{finalPayment.data.b500}}</v-chip>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>mdi-cash-multiple</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="text-start">
                                    <v-list-item-title >Billetes de 1000 pesos</v-list-item-title>
                                </v-list-item-content>
                                <v-chip color="primary">{{finalPayment.data.b1000}}</v-chip>
                            </v-list-item>

                            <v-list-item color="danger">
                                <v-list-item-icon>
                                    <v-icon>mdi-close-circle</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="text-start">
                                    <v-list-item-title >Intentos fallidos</v-list-item-title>
                                </v-list-item-content>
                                <v-chip color="danger">${{finalPayment.data.bn}}</v-chip>
                            </v-list-item> -->

                            <v-list-item color="success">
                                <v-list-item-icon>
                                    <v-icon>mdi-cash-usd</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="text-start">
                                    <v-list-item-title ><h1>Total a pagar</h1></v-list-item-title>
                                </v-list-item-content>
                                <v-chip color="success"><h1>${{finalPayment.data.total}}</h1></v-chip>
                            </v-list-item>

                            <v-list-item color="warning">
                                <v-list-item-icon>
                                    <v-icon>mdi-credit-card-outline</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="text-start">
                                    <v-list-item-title class="black--text"><h1>Total pagado</h1></v-list-item-title>
                                </v-list-item-content>
                                <v-chip color="warning"><h1>${{finalPayment.data.tt}}</h1></v-chip>
                            </v-list-item>


                            <v-list-item color="info" v-if="typoPayment.type != 0">
                                <v-list-item-icon>
                                    <v-icon :color="typoPayment.type === 1 ? 'danger' : 'success'">{{typoPayment.type === 1 ? 'mdi-window-minimize' : 'mdi-plus' }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content class="text-start">
                                    <v-list-item-title class="black--text"><h1>{{typoPayment.type === 1 ? 'Falta por pagar:' : 'Saldo a favor' }}</h1></v-list-item-title>
                                </v-list-item-content>
                                <v-chip color="info"><h1>${{typoPayment.total}}</h1></v-chip>
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
        </v-row>
    </v-container>
</template>
<script>
import satisfied from '../assets/satisfied.svg'
export default {
    mounted(){
        this.detail =[]
    },
    data(){
        return{
            img:satisfied,
            detail:[],
            total:0,
            paidOut:0,
            typoPayment:{
                total:0,
                type:0
            }
        }
    },
    computed:{
        finalPayment(){
            // console.log(this.$store.getters.finalPayment.data.total)
            if(this.$store.getters.finalPayment.response < 0){
                // saldo a favor
                this.typoPayment.total = this.$store.getters.finalPayment.response*-1
                this.typoPayment.type = 2
            }else if(this.$store.getters.finalPayment.response > 0){
                this.typoPayment.total = this.$store.getters.finalPayment.response
                this.typoPayment.type = 1
            }else{
                this.typoPayment.total = 0
                this.typoPayment.type = 0
            }            
            return this.$store.getters.finalPayment
        },
        dataSendApi(){
            return this.$store.getters.dataSendApi
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