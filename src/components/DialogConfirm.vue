<template>
  <div class="text-center">
    <v-dialog
      v-model="modal.dialog"
      persistent
      width="800"
    >
      <!-- <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          Click Me
        </v-btn>
      </template> -->

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{modal.title}}
        </v-card-title>

        <v-card-text class="mt-4">
          {{modal.subTitle}}
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions v-if="modal.type == 'ALERT'">
          <div class="flex-grow-1"></div>
          <v-btn
            color="success"
            text
            @click="result(false)"
          >
            ACEPTAR
          </v-btn>
        </v-card-actions>
        <v-card-actions v-else-if="modal.type == 'PAGO'">
          <div class="flex-grow-1"></div>
          <v-btn
            color="danger"
            text
            @click="result(false)"
          >
            NO, SEGUIR PAGANDO
          </v-btn>
          <v-btn
            color="success"
            text
            @click="result(true)"
          >
            SI
          </v-btn>
        </v-card-actions>
        <v-card-actions v-else>
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
</template>
<script>
export default {
    data(){
        return{
            dialog:true
        }
    },
    computed:{
        modal(){
            return this.$store.getters.modal
        },
    },
    methods:{
        result(type){
            this.$store.dispatch('modal',{title:'',subTitle:'',dialog:false,result:type})
        }
    }
}
</script>