<template>
    <v-container fluid class="fill-height">
        <v-row
            align="center"
            justify="center"
        >
            <v-col cols="12" sm="12" md="12" class="text-center">
                <h2 class="secondary--text ml-5">Seleccioná tu carrera , Curso o</h2>
                <h2 class="secondary--text ml-5">Taller que vas a pagar:</h2>
            </v-col>
            <!-- <v-row
                align="center"
                justify="center"
            > -->
                <fragment v-if="coursesVar.length == 0">
                    <v-col cols="12" sm="12" md="3" class="mt-10">
                        <v-card
                            width="100%"
                            height="100%"
                            elevation="1"
                            color="danger"
                            
                            class="text-center"
                            @click="closeSession()"
                        >
                            <h1 class="secondary--text pt-3 pb-3">Sin registros</h1>
                        </v-card>
                    </v-col>
                </fragment>
                
                
                <v-col cols="12" sm="12" md="10" v-for="(item,index) in coursesVar" :key="index">
                    <v-card
                        :color=" item.selected ? 'fourth' : 'primary' "
                        width="100%"
                        height="100%"
                        :elevation="item.selected ? '0' : '5'"
                        tile="tile"
                        class="text-center float-right"
                        @click="selecOptionCourse(index)"
                    >
                    <h1 class="secondary--text pr-5 pt-2 pb-2">
                        <img :src="img" v-if="item.selected" alt="" class="ml-3 float-left" width="50">
                        {{item.course}} - {{item.campus}}
                    </h1>
                    </v-card>
                </v-col>
            <!-- </v-row> -->
            <v-col cols="12" sm="12" md="3" class="mt-10" v-if="coursesVar.length != 0">
                <v-card
                    width="100%"
                    height="100%"
                    elevation="1"
                    color="fourth"
                    tile="tile"
                    class="text-center"
                    @click="nextPage()"
                >
                    <h1 class="secondary--text pt-3 pb-3">SIGUIENTE
                    </h1>
                </v-card>
                <ButtonCancel v-if="coursesVar.length != 0"/>
            </v-col>

            
            
        </v-row>
        <div style="display:none;">{{courses}}</div>
        <div style="display:none;">{{paymentPlans}}</div>
        <div style="display:none;">{{modal}}</div>
        
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
        this.$store.dispatch('subTitleHeader',{title:'Atencion! Esta máquina no entrega vuelto. En caso de pagar de mas que el saldo',subTitle:'deudor, la diferencia se aplicará como saldo a favor para la próxima cuota',type:'alert'})
        this.$store.dispatch('courses',true)
        this.coursesVar = []
    },
    data(){
        return{
            coursesVar:[
                // {course:'aaaaaaaa',campus:'caballito',id:1 ,selected:true},
                // {course:'bbbbbbbb',campus:'caballito',id:2 ,selected:false},
                // {course:'cccccccc',campus:'caballito',id:3 ,selected:false},
            ],
            courseSelected:null,
            img:img
        }
    },
    computed: {
        courses(){
            
            let response = this.$store.getters.courses
            // console.log('computer',response[0])
            if(!response){
                return
            }
            this.coursesVar = []
            // console.log('response',response)
            let dataTemp=[]
            for(let index in response){
                let selected = false;
                
                if(response[index].cruso_data != null){
                    dataTemp.push({
                        id:response[index].Curso,
                        course:response[index].cruso_data.Feriado,
                        campus:response[index].cruso_data.sede.Feriado,
                        selected:selected
                    })
                }
                
            }
            dataTemp[0].selected = true
            this.courseSelected = dataTemp[0].id
            this.coursesVar = dataTemp
            // console.log('selected',this.courseSelected)
            return this.$store.getters.courses
        },
        paymentPlans(){
            
            return this.$store.getters.paymentPlans
        },
        modal(){
            if(this.$store.getters.modal.result){
                this.$store.dispatch('logout',true)
                // this.$store.dispatch('paymentPlans',this.courseSelected)
                // this.$router.push({ name: 'SelectPayments'})
                // paso al store el result null para cuando lo reciba en la siguiente vista no redireccione al entrar
                this.$store.dispatch('modal',{title:'¿Esta seguro que desea pagar estas cuotas?',subTitle:'No podra regresar a esta pantalla una vez selecionada las opciones',dialog:false,result:null})
            }
            return this.$store.getters.modal
        },

    },
    methods:{
        
        selecOptionCourse(key){
            // let that = this
            for(let index in this.coursesVar){
                this.coursesVar[index].selected = false
            }
            this.coursesVar[key].selected = true
            this.courseSelected = this.coursesVar[key].id
            // console.log(this.coursesVar[key].id)
            console.log('select',this.courseSelected)
        },
        nextPage(){
            if(this.courseSelected === null){
                this.$store.dispatch('alertSys',{snackbar:true,text:'Error de sistema, No se ha seleccionado ninguna opcion',color:'danger'})
            }else{
                console.log('next')
                this.$store.dispatch('paymentPlans',this.courseSelected)
                this.$router.push({ name: 'SelectPayments'})
                // this.$store.dispatch('modal',{title:'¿Esta seguro que desea pagar este curso?',subTitle:'No podra regresar a esta pantalla despues de seleccionar una opcion',dialog:true,result:null})
            }
            
        },
        closeSession(){
            this.$store.dispatch('logout',true)
        }
    }
}
</script>