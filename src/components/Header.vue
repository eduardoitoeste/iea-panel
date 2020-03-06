<template>
    <div>
        <v-toolbar flat color="primary" class="mb-5" prominent>
            
            <v-toolbar-title class="secondary--text mb-4" v-show="this.$route.name != 'home' && this.$route.name != 'InsertPayment'  ">
                <ButtonBack/>
            </v-toolbar-title>
            <v-toolbar-title class="secondary--text ml-10">
                <h1 style="font-size: 4rem;">IEA</h1>
            </v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-toolbar-title v-if="subTitleHeader.type === 'text'" class="white--text mr-5 hidden-xs-only hidden-sm-only" >
                <b class="third--text" style="font-size: 2rem;">{{subTitleHeader.title}}</b>
                <br>
                <b class="third--text float-right" style="font-size: 2rem;">{{subTitleHeader.subTitle}}</b>
            </v-toolbar-title>

            <v-toolbar-title v-if="subTitleHeader.type === 'alert'" class="white--text mr-5 hidden-xs-only hidden-sm-only" >
                <v-alert 
                    color="alertHeader"
                    icon="mdi-alert"
                >
                    <b>{{subTitleHeader.title}}</b>
                    <br>
                    <b>{{subTitleHeader.subTitle}}</b>
                </v-alert>
            </v-toolbar-title>

            
        </v-toolbar>
        <v-divider class="white"></v-divider>
    </div>
</template>

<script>
import ButtonBack from './ButtonBack'
export default {
    name:'Header',
    components:{
        ButtonBack
    },
    mounted () {
        
    },
    data(){
        return{
            text:'hola'
        }
    },
    computed: {
      subTitleHeader(){
          return this.$store.getters.subTitleHeader
      }
    },
    methods: {
    }
}
</script>