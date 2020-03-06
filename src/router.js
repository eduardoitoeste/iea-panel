import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store';
import InitSession from './views/InitSession.vue'
import StartPayment from './views/StartPayment.vue'
import SelectPayments from './views/SelectPayments.vue'
import InsertPayment from './views/InsertPayment.vue'
import FinishPayment from './views/FinishPayment.vue'
import SelectTypePayment from './views/SelectTypePayment.vue'
import InsertPaymentConceptoRegular from './views/InsertPaymentConceptoRegular.vue'
import SelectPaymentPagoRegular from './views/SelectPaymentPagoRegular.vue'
import FinishPaymentTest from './views/FinishPaymentTest.vue'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ingresar',
      name: 'InitSession',
      component: InitSession
    },
    {
      path: '/inicar-pago',
      name: 'StartPayment',
      component: StartPayment,
      beforeEnter: (to,from, next)=>{
        // console.log('middleware',store.getters.credentials.auth)
        // console.log('middleware',store.getters.credentials)
        if(store.getters.credentials.auth){
          next();
        }else{
          next({ name: 'home' })
        }
        
      }
    },
    {
      path: '/seleccionar-pago',
      name: 'SelectPayments',
      component: SelectPayments,
      beforeEnter: (to,from, next)=>{
        // console.log('middleware',store.getters.credentials.auth)
        // console.log('middleware',to)
        if(store.getters.credentials.auth){
          next();
        }else{
          next({ name: 'home' })
        }
        
      }
    },
    {
      path: '/insertar-pago',
      name: 'InsertPayment',
      component: InsertPayment,
      beforeEnter: (to,from, next)=>{
        if(store.getters.credentials.auth){
          next();
        }else{
          next({ name: 'home' })
        }
        
      }
    },
    {
      path: '/finalizado-pago',
      name: 'FinishPayment',
      component: FinishPayment,
      beforeEnter: (to,from, next)=>{
        if(store.getters.credentials.auth){
          next();
        }else{
          next({ name: 'home' })
        }
        
      }
    },
    {
      path: '/seleccionar-tipo-pago',
      name: 'SelectTypePayment',
      component: SelectTypePayment,
      beforeEnter: (to,from, next)=>{
        if(store.getters.credentials.auth){
          next();
        }else{
          next({ name: 'home' })
        }
        
      }
    },
    {
      path: '/seleccionar-pago-regular',
      name: 'SelectPaymentPagoRegular',
      component: SelectPaymentPagoRegular,
      beforeEnter: (to,from, next)=>{
        if(store.getters.credentials.auth){
          next();
        }else{
          next({ name: 'home' })
        }
        
      }
    },
    {
      path: '/insertar-pago-concepto-regular',
      name: 'InsertPaymentConceptoRegular',
      component: InsertPaymentConceptoRegular,
      beforeEnter: (to,from, next)=>{
        if(store.getters.credentials.auth){
          next();
        }else{
          next({ name: 'home' })
        }
        
      }
    },
    {
      path: '/finalizado-pago-concepto-regular',
      name: 'FinishPaymentCR',
      component: FinishPaymentTest,
      beforeEnter: (to,from, next)=>{
        if(store.getters.credentials.auth){
          next();
        }else{
          next({ name: 'home' })
        }
        
      }
    },

    
  ]
})
