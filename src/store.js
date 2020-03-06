import Vue from 'vue'
import Vuex from 'vuex'
import ApiRest from './js/Api'
const MAQUINA = 1
let Api = new ApiRest()
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    verifySys:true,
    subTitleHeader:'',
    alertSys:'',
    credentials:'',
    logout:false,
    courses:'',
    paymentPlans:'',

    dataSendApi:'',

    loader:'',
    modal:'',
    finalPayment:'',

    dataSendApiConceptoRegular:'',
    finalPaymentMachine:''

  },
  getters:{
    subTitleHeader (state){
    	return state.subTitleHeader
    },
    alertSys (state){
    	return state.alertSys
    },
    credentials (state){
    	return state.credentials
    },
    logout (state){
    	return state.logout
    },
    courses (state){
    	return state.courses
    },
    paymentPlans (state){
    	return state.paymentPlans
    },
    dataSendApi (state){
    	return state.dataSendApi
    },
    loader (state){
    	return state.loader
    },
    modal (state){
    	return state.modal
    },
    finalPayment (state){
    	return state.finalPayment
    },
    dataSendApiConceptoRegular (state){
    	return state.finalPayment
    },
    finalPaymentMachine (state){
    	return state.finalPaymentMachine
    },
    verifySys (state){
    	return state.verifySys
    },
    
    
  },
  mutations: {
    subTitleHeader(state,step){
      return state.subTitleHeader = step
    },
    alertSys(state,step){
      return state.alertSys = step
    },
    credentials(state,step){
      return state.credentials = step
    },
    logout(state,step){
      return state.logout = step
    },
    courses(state,step){
      return state.courses = step
    },
    paymentPlans(state,step){
      return state.paymentPlans = step
    },
    dataSendApi(state,step){
      return state.dataSendApi = step
    },
    loader(state,step){
      return state.loader = step
    },
    modal(state,step){
      return state.modal = step
    },
    finalPayment(state,step){
      return state.finalPayment = step
    },
    dataSendApiConceptoRegular (state,step){
    	return state.finalPayment = step
    },
    finalPaymentMachine (state,step){
    	return state.finalPaymentMachine = step
    },
    verifySys (state,step){
    	return state.verifySys = step
    },

    
    
  },
  actions: {
    subTitleHeader (context,data) {
      context.commit('subTitleHeader',data)
    },
    alertSys (context,data) {
      context.commit('alertSys',data)
    },
    credentials (context,data) {
      let nada = {}
      Api.login(data).then(resolve=>{
        if(resolve.repeat){
          context.commit('credentials',{token:resolve.token,user:resolve.user,auth:false,infoSys:data,repeated:true})
        }else{
          context.commit('credentials',{token:resolve.token,user:resolve.user,auth:true,infoSys:data,repeated:false})
          localStorage.token = resolve.token
        }
        
        // localStorage.user = resolve.user
      }).catch(err=>{
        context.commit('credentials',{auth:false})
        context.commit('alertSys',{snackbar:true,text:err.response.data,color:'danger'})
      })
    },
    courses (context,data) {
      // this.$store.dispatch('loader',{dialog:true,text:'cargando'})
      context.commit('loader',{dialog:true,text:'Descargando Cursos'})
      Api.getCourse(data).then(resolve=>{
        context.commit('courses',resolve)
        context.commit('loader',{dialog:false,text:'Descargando Cursos'})
      }).catch(err=>{
        context.commit('loader',{dialog:false,text:'Descargando Cursos'})
        context.commit('courses',false)
        context.commit('alertSys',{snackbar:true,text:err.response.data,color:'danger'})
      })
    },
    paymentPlans (context,data) {
      context.commit('loader',{dialog:true,text:'Descargando Pagos'})
      // console.log('paymentPlans store')
      Api.getPaymentPlans(data).then(resolve=>{
        context.commit('paymentPlans',resolve)
        context.commit('loader',{dialog:false,text:'Descargando Pagos'})
      }).catch(err=>{
        context.commit('paymentPlans',false)
        context.commit('alertSys',{snackbar:true,text:err.response.data,color:'danger'})
        context.commit('loader',{dialog:false,text:'Descargando Pagos'})
      })
    },

    dataSendApi (context,data) {
      context.commit('loader',{dialog:true,text:'Cargando ingresos de pagos'})

      Api.searchMachine().then(resolveMachine=>{
        
        let maquina = resolveMachine.data[0].PC
        console.log('MAQUINAAAAAAAAAAAA',maquina)
        Api.addpayment({escanerBillete_id:maquina,total:data.total}).then(resolve=>{
          
          let dataTemp = {
            paymentId:resolve.detailPayment.id,
            total:data.total,
            cantidad:data.cantidad,
            items:data.items,
            code:resolve.detailPayment.code,
            saldo:resolve.saldo
          }
          context.commit('dataSendApi',dataTemp)
          context.commit('loader',{dialog:false,text:'Cargando ingresos de pagos'})
        }).catch(err=>{
          context.commit('alertSys',{snackbar:true,text:err.response.data,color:'danger'})
          context.commit('loader',{dialog:false,text:'Cargando ingresos de pagos'})
        })
        
      }).catch(err=>{
          context.commit('alertSys',{snackbar:true,text:err.response.data,color:'danger'})
          context.commit('loader',{dialog:false,text:'Cargando ingresos de pagos'})
      })
      
      
    },
    
    logout (context,data) {
      if(data){
        Api.logOut(data).then(resolve=>{
          localStorage.token = '';
          localStorage.user = ''
          context.commit('subTitleHeader','')
          context.commit('alertSys','')
          context.commit('credentials','')
          // context.commit('logout','')
          context.commit('courses','')
          context.commit('paymentPlans','')
          context.commit('dataSendApi','')
          context.commit('loader','')
          context.commit('modal','')
          context.commit('finalPayment','')
          context.commit('dataSendApiConceptoRegular','')
          context.commit('finalPaymentMachine','')
          context.commit('logout',true)
        }).catch(err=>{
          context.commit('alertSys',{snackbar:true,text:err.response.data,color:'danger'})
          context.commit('logout',false)
        })
      }else{
        context.commit('logout',false)
      }
      
    },

    // data a enviar para pagos regulares
    dataSendApiConceptoRegular (context,data){
      
      
      let datos = [];
      let temp = data.items
      // console.log('dataaaaaaaa',temp)
      for(let index in temp){
        datos.push(temp[index].IDF)
      }
      
      Api.searchMachine().then(resolveMachine=>{
        let maquina = resolveMachine.data[0].PC
        let dataSend = {
          maquina:maquina,
          datos:datos
        }
        
        Api.startPaymentPagoRegular(dataSend).then(response=>{
          console.log(response)
          data.pagos = response.data
          data.saldo = response.saldo
          context.commit('dataSendApiConceptoRegular',data)
        }).catch(err=>{
          context.commit('alertSys',{snackbar:true,text:err.response.data,color:'danger'})
        })
      }).catch(err=>{
          context.commit('alertSys',{snackbar:true,text:err.response.data,color:'danger'})
          // context.commit('loader',{dialog:false,text:'Cargando ingresos de pagos'})
      })
    	
    },

    loader (context,data) {
      context.commit('loader',data)
    },
    modal (context,data) {
      context.commit('modal',data)
    },
    finalPayment (context,data) {
      Api.uploadPaymentpayment(data.data).then(response=>{
        context.commit('finalPayment',{data:data.data,status:true,response:response})
      }).catch(err=>{
        context.commit('finalPayment',{data:data.data,status:false})
      })
    },

    clearStore(context,data){
      context.commit('subTitleHeader','')
      context.commit('alertSys','')
      context.commit('credentials','')
      // context.commit('logout','')
      context.commit('courses','')
      context.commit('paymentPlans','')
      context.commit('dataSendApi','')
      context.commit('loader','')
      context.commit('modal','')
      context.commit('finalPayment','')

      context.commit('dataSendApiConceptoRegular','')
      context.commit('finalPaymentMachine','')
      
      context.commit('logout',true)
    },

    finalPaymentMachine(context,data){
      console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',data)
      if(data.route == 'false' || data.route == false ){
        context.commit('finalPaymentMachine',{data:data.data,status:true,response:0})
      }else{
        Api.uploadPaymentpaymentGeneral(data).then(response=>{
          context.commit('finalPaymentMachine',{data:data.data,status:true,response:response})
        }).catch(err=>{
          context.commit('finalPaymentMachine',{data:data.data,status:false})
        })
      }
      
    },

    verifySys(context,data){
      Api.verifySystem(data).then(response=>{
        console.log('verificando systema',response.activate)
        if(response.activate == 1){
          context.commit('verifySys',true)
        }else{
          context.commit('verifySys',false)
        }
        
      }).catch(err=>{
        context.commit('verifySys',false)
        context.commit('alertSys',{snackbar:true,text:'ERROR!!!, No se puede establecer conexion con el servidor...',color:'danger'})
      })
    }


    

    
  }
})
