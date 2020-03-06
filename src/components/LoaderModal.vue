<template>
    <v-dialog
      v-model="loader.dialog"
      
      persistent
      width="50%"
      
    >
      <v-card
        color="primary"
        dark
        class="pt-10 pb-10"
      >
        <v-card-text>
        <p class="secondary--text text-center">{{loader.text}}</p>
          
          <v-progress-linear
            indeterminate
            color="third"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
    data(){
        return{
            dialog:true
        }
    },
    computed:{
        loader(){
            return this.$store.getters.loader
        },
    }
}
</script>