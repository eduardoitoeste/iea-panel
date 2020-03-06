<template>
    <fragment>
        <div class="text-center">
            <v-dialog
            v-model="modal"
            persistent
            width="800"
            >
            <v-card>
                <v-card-title
                class="headline grey lighten-2"
                primary-title
                >
                ¿Esta seguro que desea salir del proceso de pago?
                </v-card-title>

                <v-card-text class="mt-4">
                
                </v-card-text>

                <v-divider></v-divider>
                <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn
                    color="danger"
                    text
                    @click="result(false)"
                >
                    CANCELAR
                </v-btn>
                <v-btn
                    color="success"
                    text
                    @click="result(true)"
                >
                    ACEPTAR
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </div>
        <v-btn icon fab dark large color="secondary" @click="backPage()">
        <v-icon x-large dark>mdi-arrow-left</v-icon>
        </v-btn>
        <div style="display:none">{{logout}}</div>
    </fragment>
</template>
<script>
export default {
    mounted(){
        // console.log('route',this.$route.path)
    },
    data(){
        return{
            modal:false
        }
    },
    computed:{
        logout(){
            console.log('cierra',this.$store.getters.logout)
            if(this.$store.getters.logout){
                this.modal = false
                this.$store.dispatch('logout',false)
                this.$router.replace({name:'home'})
            }
            return this.$store.getters.logout
        },
    },
    methods:{
        backPage(){
            console.log(this.$route.name)
            switch (this.$route.name) {
                case 'StartPayment':
                        this.modal = true
                    break;
                case 'InsertPayment':
                        this.modal = true
                    break;
                
                case 'SelectTypePayment':
                        this.modal = true
                    break;
                case 'InsertPaymentConceptoRegular':
                        this.modal = true
                    break;
            
                default:
                        this.$router.back()
                    break;
            }
            
        },
        result(type){
           if(type){
               this.$store.dispatch('logout',true)
           }else{
               this.modal = false
           }
        }
    }
}
</script>