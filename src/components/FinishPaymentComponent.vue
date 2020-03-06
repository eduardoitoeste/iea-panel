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
        </v-row>
    </v-container>
</template>
<script>
import satisfied from '../assets/satisfied.svg'
export default {
    mounted(){
        
    },
    props: {
        codes: {
            type: Array,
            required: true
        },
        typePayment:{
            type: Object,
            required: true
        },
        payment:{
            type: Object,
            required: true
        }
        
    },
    data(){
        return{
            img:satisfied
        }
    },
    destroyed(){
        console.log('detroy componente finish')
        
    },
    computed:{
        logout(){
            if(this.$store.getters.logout){
                this.$route.replace({name:'home'})
            }
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