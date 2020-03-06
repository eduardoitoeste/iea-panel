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
        <v-col cols="12" sm="12" md="10" class="ml-8">
            <v-card
                width="100%"
                height="100%"
                elevation="1"
                color="danger"
                tile="tile"
                class="text-center"
                @click="closeSession()"
            >
                <h1 class="secondary--text pt-3 pb-3">CANCELAR
                </h1>
            </v-card>
            <div style="display:none">{{logout}}</div>
        </v-col>
    </fragment>
</template>

<script>
export default {
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
                // this.$store.dispatch('logout',false)
                // this.$router.replace({name:'home'})
            }
            return this.$store.getters.logout
        },
    },
    methods:{
        closeSession(){
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