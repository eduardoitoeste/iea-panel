<template>
    <fragment>
        <v-container fluid class="fill-height">
            <v-row
                align="center"
                justify="center"
            >
            
                <v-col cols="12" v-if="saldo > 0">
                    <v-alert
                        dismissible
                        color="cyan"
                        border="left"
                        elevation="2"
                        colored-border
                        icon="mdi-shield-lock-outline"
                        >
                        Tienes un saldo a favor de <strong>${{saldo}}</strong> ( sera repatido automaticamente en el siguiente pago).
                    </v-alert>
                </v-col>

                <v-col cols="12" sm="12" md="12" class="text-center">
                    <h2 class="secondary--text ml-5">Por favor ingresá el efectivo en el lector del cajero</h2>
                </v-col>

                <v-col cols="12" sm="12" md="10" class="text-center display-1 font-weight-regular">
                    <h1 class="secondary--text ml-5 mb-8">INGRESASTE:</h1>
                    <v-sheet
                        width="100%"
                        height="150px"
                        elevation="5"
                        color="secondary"
                        tile="tile"
                        style
                        class="text-center"
                        
                    >
                        <div class="pt-3">
                        <h1 class="black--text pt-10 pb-3">
                        <span class="grey--text display-3">$</span>
                        {{total+saldo}} / {{totalApagar}}
                        </h1>
                        </div>
                    </v-sheet>
                 </v-col>

                 <v-col cols="12" sm="12" md="3" class="mt-10">
                    <v-card
                        v-if="!disabledAcred"
                        width="100%"
                        height="100%"
                        elevation="1"
                        color="fourth"
                        tile="tile"
                        class="text-center"
                        @click="finishPayment()"
                    >
                        <h1 class="secondary--text pt-3 pb-3">ACREDITAR
                        </h1>
                    </v-card>
                    <ButtonCancel v-if="viewButtonCancel"/>
                </v-col>
            </v-row>
        </v-container>
        <div style="display:none">{{credentials}}</div>
        <div style="display:none">{{modal}}</div>
    </fragment>
</template>
<script>
import ApiRest from '../js/Api'
import ButtonCancel from '../components/ButtonCancel'
let Api = new ApiRest();
export default {
    components:{
        ButtonCancel
    },
    props: {
        totalApagar: {
            type: Number,
            required: true
        },
        saldo: {
            type: Number,
            default: 0
        },
        route: {
            type: String,
            required: true
        },
        paymentId:{
            type: Array,
            required: true
        },
        items:{
            type: Array,
            required: true,
        },
        cantidadPaymentId:{
            type: Number,
            required: true
        },
        routeFinish:{
            type: String,
            default: false
        }
        
    },
    mounted(){
        // console.log('route',this.route)
        // console.log('paymentId',this.paymentId)
        // console.log('cantidadPaymentId',this.cantidadPaymentId)
        if(!this.route){
            alert('dwadawd')
            
        }
        
    },
    destroyed(){
        console.log('detroy')
        clearInterval(this.interval);
    },
    data(){
        return{
            total:0,
            disabledAcred:false,
            viewButtonCancel:true,
            interval:false,
            totalPayment:{},
            fallidos:[],
            user:'',
        }
    },
    computed:{
        credentials(){
            console.log('credentials',this.$store.getters.credentials)
            this.user={
                doc:this.$store.getters.credentials.infoSys.doc,
                type:this.$store.getters.credentials.infoSys.type == 1 ? 'dni' : 'pasaporte',
                id:this.$store.getters.credentials.user.IDStB,
                // machine:this.$store.getters.credentials.user.IDStB,
            }
            this.startPayment()
            return this.$store.getters.credentials
        },
        modal(){
            console.log('final',this.$store.getters.modal)
            if(this.$store.getters.modal.result){
                this.finishPaymentMachine()
            }
            return this.$store.getters.modal
        },
    },
    methods:{
        startPayment(){
            Api.machineStatus(this.user).then(response=>{
                Api.startPayment().then(response=>{
                    console.log('INICIA PAGO',response)
                    this.verifyPayment()
                }).catch(err=>{
                    console.error('1',err)
                    clearInterval(this.interval);
                    this.disabledAcred = true
                    alert('Error la maquina no se pudo conectar, pongase en contacto con un operador antes de continuar el proceso ')
                    return
                })
            }).catch(err=>{
                console.error('1',err)
                clearInterval(this.interval);
                this.disabledAcred = true
                alert('Error la maquina no se pudo conectar, pongase en contacto con un operador antes de continuar el proceso ')
                this.$store.dispatch('logout',true)
                return
                // this.$store.dispatch('modal',{title:'¿ERROR?',subTitle:'La maquina no esta en funcionamiento , por favor contacte a un operario antes de ingresar el dinero',dialog:true,result:null})
            })
            
        },
        verifyPayment(){
            let that = this
            let bandera = false
            let cantidad = 0
            this.interval = setInterval(() => {
                Api.verifyIncome().then(response=>{
                    // let valor = 0;
                    // console.log(response.data[1])
                    let valor = parseInt(response.data[1].tt);
                    
                    // console.log('total sistema',that.total)
                    // console.log('total maquina',valor)
                    if(that.total != valor){
                        console.log('se ingreso un nuevo billete de',(valor - that.total ))
                        let code = 'b'+(valor - that.total)
                        // cantidad = (valor - that.total)
                        Api.addTicketsPagoRegular({paymentId:that.paymentId,code:code,route:that.route,cantidad:that.cantidadPaymentId}).then(response=>{
                            console.log('guardado con exito');
                        }).catch(err=>{
                            console.error(err)
                            that.fallidos.push(code)
                        })
                    }
                    that.total = valor
                    that.totalPayment = response.data[1]
                    if(that.viewButtonCancel){
                        if(that.total > 0 ){
                            that.viewButtonCancel = false
                        }
                    }
                    
                    // that.total = 5;
                }).catch(err=>{
                    console.error('1',err)
                    alert('Error la maquina no se pudo conectar, pongase en contacto con un operador antes de continuar el proceso ')
                    clearInterval(this.interval);
                    this.disabledAcred = true
                    // this.finishPaymentMachine()
                    return
                })
            }, 500);
            
        },
        finishPayment(){
            if((this.total + this.saldo) == 0){
                this.$store.dispatch('modal',{title:'Por favor ingrese dinero para continuar con el proceso',subTitle:'',dialog:true,result:null,type:'ALERT'})
                return
            }
            this.$store.dispatch('modal',{title:'¿Esta seguro que desea Terminar el pago?',subTitle:'',dialog:true,result:null,type:'PAGO'})
        },
        finishPaymentMachine(){
            Api.finishPayment().then(response=>{
                // console.log(response)
                clearInterval(this.interval);
                let data = {
                    b5 : parseInt(this.totalPayment.b5),
                    b10 : parseInt(this.totalPayment.b10),
                    b20 : parseInt(this.totalPayment.b20),
                    b50 : parseInt(this.totalPayment.b50),
                    b100 : parseInt(this.totalPayment.b100),
                    b200 : parseInt(this.totalPayment.b200),
                    b500 : parseInt(this.totalPayment.b500),
                    b1000 : parseInt(this.totalPayment.b1000),
                }
                this.totalPayment.b5 = parseInt(this.totalPayment.b5)
                this.totalPayment.b10 = parseInt(this.totalPayment.b10)
                this.totalPayment.b20 = parseInt(this.totalPayment.b20)
                this.totalPayment.b50 = parseInt(this.totalPayment.b50)
                this.totalPayment.b100 = parseInt(this.totalPayment.b100)
                this.totalPayment.b200 = parseInt(this.totalPayment.b200)
                this.totalPayment.b500 = parseInt(this.totalPayment.b500)
                this.totalPayment.b1000 = parseInt(this.totalPayment.b1000)
                this.totalPayment.bn = parseInt(this.totalPayment.bn)
                this.totalPayment.position = parseInt(this.totalPayment.position)
                this.totalPayment.tt = this.total + this.saldo
                this.totalPayment.saldo = this.saldo
                this.totalPayment.total = this.totalApagar
                this.totalPayment.items = this.items
                this.totalPayment.data = data
                this.totalPayment.paymentId = this.paymentId

                this.totalPayment.fallidos = this.fallidos
                console.log('FINAL',this.totalPayment)
                this.$store.dispatch('finalPaymentMachine',{data:this.totalPayment,status:true,route:this.routeFinish})
                
            }).catch(err=>{
                console.error('3',err)
                alert('Error la maquina no se pudo conectar, pongase en contacto con un operador antes de continuar')
                this.disabledAcred = true
                return
            })
        },
    }
}
</script>