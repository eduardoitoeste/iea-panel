<template>
  <v-row style="position:fixed; z-index:9999; left:42%"
  >
    <v-col cols="12" sm="12" md="12">
      <v-card width="300" class="text-center" elevation="10">
        <v-card-title style="padding-left:25%;">Cargando...</v-card-title>
        <v-card-text>
          <v-progress-circular
            size="100"
            width="10"
            color="green"
            indeterminate
          >
        </v-progress-circular>
        </v-card-text>
      
    </v-card>
    </v-col>
  </v-row>
  
    
</template>