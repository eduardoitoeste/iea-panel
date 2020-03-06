<template>
    <fragment>
        <InsertPaymentMachine
            :saldo="saldo"
            :totalApagar="totalApagar"
            route="/insertar-billetes-pago-concepto-regular"
            routeFinish="/finalizar-pago-concepto-regular"
            :paymentId="paymentID"
            :items="paymentID"
            :cantidadPaymentId="dataSendApiConceptoRegular.cantidad"
        />
        <div style="display:none">{{dataSendApiConceptoRegular}}</div>
        <div style="display:none">{{finalPaymentMachine}}</div>
        
    </fragment>
</template>
<script>
import ApiRest from '../js/Api'
import ButtonCancel from '../components/ButtonCancel'
import InsertPaymentMachine from '../components/InsertPaymentMachine'
export default {
    components:{
        ButtonCancel,
        InsertPaymentMachine
    },
    data(){
        return{
            total:0,
            interval:false,
            totalApagar:0,
            items:[],
            paymentID:[],
            saldo:0,
        }
    },
    destroyed(){
        console.log('detroy')
        
    },
    computed:{
        dataSendApiConceptoRegular(){
            console.log('detalle',this.$store.getters.dataSendApiConceptoRegular)
            // this.increment()
            this.totalApagar = this.$store.getters.dataSendApiConceptoRegular.total
            let data = this.$store.getters.dataSendApiConceptoRegular.pagos
            this.saldo = this.$store.getters.dataSendApiConceptoRegular.saldo
            this.items = data
            
            for(let index in data){
                this.paymentID.push(data[index].id)
            }
            console.log('paymentID',this.paymentID)
            return this.$store.getters.dataSendApiConceptoRegular
        },
        finalPaymentMachine(){
            console.log('finalizo el pago',this.$store.getters.finalPaymentMachine)
            if(this.$store.getters.finalPaymentMachine.status){
                this.$router.push({ name: 'FinishPaymentCR'})
            }
            
            return this.$store.getters.finalPaymentMachine
        }
    }
}
</script>