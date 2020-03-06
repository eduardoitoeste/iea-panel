import Route from './RouteApi'
import axios from 'axios'
let host = 'http://localhost:5000/bill';
const messageErrorMaquina = 'Sin conexion con la maquina lectora'
// axios.defaults.headers.common['Authorization'] = 'Bearer bbbbb'

// axios.defaults.headers.common['Content-Type'] ='application/json';


export default class Api {
    
    post(data){
        let that = this
        return new Promise((resolve,reject)=>{
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.token;
            axios.defaults.headers.common['Content-Type'] = 'application/json';
            // console.log('token',localStorage.token)
            let url = Route+data.url
            let form = data.data
            console.log('ROUTE POST >>>',url)
            console.log('DATA POST >>>>',data.data)
            axios.post(url,form).then((response)=>{
                console.log('RESPONSE POST >>>>',response)
                resolve(response.data)
                return
             }).catch(err=>{
                // console.error('ERROR POST ERROR >>>>',err)
                console.error('ERROR POST Mensaje >>>>',err.response.data)
                console.error('ERROR POST status >>>>',err.response.status)
                that.responseStatus(err,url,'peticion')
                reject(err)
                return
             })
        })
    }

    get(data){
        return new Promise((resolve,reject)=>{
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.token;
            axios.defaults.headers.common['Content-Type'] = 'application/json';
            // console.log('token',localStorage.token)
            let url = Route+data.url
            console.log('ROUTE GET >>>',url)
            // console.log('DATA >>>>',data.data)
            axios.get(url).then((response)=>{
                console.log('RESPONSE GET >>>>',response)
                resolve(response.data)
                return
             }).catch(err=>{
                console.error('ERROR GET Mensaje >>>>',err.response.data)
                console.error('ERROR GET status >>>>',err.response.status)
                that.responseStatus(err,url,'peticion')
                reject(err)
                return
             })

        })
    }

    login (data){
        return new Promise((resolve,reject)=>{
            let url = '/alumno/login'
            this.post({url:url,data:data}).then((response)=>{
                resolve(response)
            }).catch(err=>{
                reject(err)
            })
        })
    }

    logOut (data){
        return new Promise((resolve,reject)=>{
            let url = '/alumno/logout'
            this.post({url:url,data:data}).then((response)=>{
                resolve(response)
            }).catch(err=>{
                reject(err)
            })
        })
    }


    // obtener consultas de cursos acticvos
    getCourse (data){
        return new Promise((resolve,reject)=>{
            let url = '/alumno/cursos/activos'
            this.get({url:url}).then((response)=>{
                resolve(response)
            }).catch(err=>{
                reject(err)
            })
        })
    }

    // obteneer planes de pagos
    getPaymentPlans (data){
        return new Promise((resolve,reject)=>{
            let url = '/alumno/pagar/'+data
            this.get({url:url}).then((response)=>{
                resolve(response)
            }).catch(err=>{
                reject(err)
            })
        })
    }

    getAlumno (data){
        return new Promise((resolve,reject)=>{
            let url = '/alumno/get/'+data.id
            this.get({url:url}).then((response)=>{
                resolve(response)
            }).catch(err=>{
                reject(err)
            })
            
        })
    }

    addpayment (data){
        return new Promise((resolve,reject)=>{
            let url = '/pagoMaquina/store'
            this.post({url:url,data:data}).then((response)=>{
                resolve(response)
            }).catch(err=>{
                reject(err)
            })
        })
    }

    // agregar billetes a la tabla
    addTickets(data){
        return new Promise((resolve,reject)=>{
            let url = '/insertar-billetes-pago'
            
            this.post({url:url,data:data}).then((response)=>{
                resolve(response)
            }).catch(err=>{
                reject(err)
            })
        })
    }


    
    uploadPaymentpayment (data){
        return new Promise((resolve,reject)=>{
            let url = '/pagoMaquinaDetalle/store'
            this.post({url:url,data:data}).then((response)=>{
                resolve(response)
            }).catch(err=>{
                reject(err)
            })
        })
    }


    // para los billetes
    
    machineStatus(data){
        let that = this
        return new Promise((resolve,reject)=>{
            let url = host+`?pay&make&tdoc=${data.type}&ndoc=${data.doc}&id=${data.id}`;
            console.log('ROUTE >>>',url)
            fetch(url)
            .then(function(response) {
                
                return response.json();
            })
            .then(function(resp) {
                that.responseStatus(resp,url,'maquina')
                if(resp.data[0].code === 200){
                    resolve({status:true,data:resp})
                }else{
                    console.error('ERROR 500 server',resp)
                    reject({status:false,data:resp})
                    return
                }
            }).catch(err=>{
                console.error('ERROR GET Mensaje >>>>',err)
                that.responseStatus(messageErrorMaquina,url,'maquina')
                reject({status:false,data:err})
                return
            })
            ;
        })
    }

    searchMachine (data){
        let that = this
        return new Promise((resolve,reject)=>{
            let url = host+`?pc&result`;
            console.log('ROUTE >>>',url)
            fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(resp) {
                that.responseStatus(resp,url,'maquina')
                if(resp.data[0].code === 200){
                    resolve({status:true,data:resp.data})
                }else{
                    console.error('ERROR 500 server',resp)
                    reject({status:false,data:resp})
                    return
                }
            }).catch(err=>{
                console.error('ERROR GET Mensaje >>>>',err)
                that.responseStatus(messageErrorMaquina,url,'maquina')
                reject({status:false,data:err})
                return
            })
            ;
        })
    }

    startPayment(){
        let that = this
        return new Promise((resolve,reject)=>{
            let url = host+'?pay&result'
            fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(resp) {
                that.responseStatus(resp,url,'maquina')
                if(resp.data[0].code === 200){
                    resolve({status:true,data:resp})
                    return
                }else{
                    console.error('ERROR 500 2 server',resp)
                    reject({status:false,data:resp})
                    return
                }
            }).catch(err=>{
                console.error('ERROR GET 2 Mensaje >>>>',err)
                that.responseStatus(messageErrorMaquina,url,'maquina')
                reject({status:false,data:err})
                return
            })
        })
    }

    
    verifyIncome(){
        let that = this
        return new Promise((resolve,reject)=>{
            let url = host+'?money&result'
            fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(resp) {
                that.responseStatus(resp,url,'maquina')
                if(resp.data[0].code === 200){
                    resolve(resp)
                    return
                }else{
                    console.error('ERROR 500 2 server',resp)
                    reject(resp)
                    return
                }
            }).catch(err=>{
                console.error('ERROR GET 2 Mensaje >>>>',err)
                that.responseStatus(messageErrorMaquina,url,'maquina')
                reject(err)
                return
            })
        })
    }

    
    finishPayment(){
        let that = this
        return new Promise((resolve,reject)=>{
            let url = host+'?notpay&make'
            fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(resp) {
                that.responseStatus(resp,url,'maquina')
                if(resp.data[0].code === 200){
                    resolve(resp)
                    return
                }else{
                    console.error('ERROR 500 3 server',resp)
                    reject(resp)
                    return
                }
            }).catch(err=>{
                console.error('ERROR GET 3 Mensaje >>>>',err)
                that.responseStatus(messageErrorMaquina,url,'maquina')
                reject(err)
                return
            })
        })
    }


    // crear pago status 0 de concepto regulares
    startPaymentPagoRegular(data){
        return new Promise((resolve,reject)=>{
            let url = '/auth/pago-concepto-regular-cajero'
            this.post({url:url,data:data}).then((response)=>{
                resolve(response)
            }).catch(err=>{
                reject(err)
            })
        })
    }
    
    

    uploadPaymentpaymentGeneral (data){
        return new Promise((resolve,reject)=>{
            let url = data.route
            this.post({url:url,data:data.data}).then((response)=>{
                resolve(response)
            }).catch(err=>{
                reject(err)
            })
        })
    }
    addTicketsPagoRegular(data){
        return new Promise((resolve,reject)=>{
            // let url = '/insertar-billetes-pago'
            if(data.cantidad == 1){
                let paymentId = data.paymentId[0]
                data.paymentId = paymentId
            }
            let url = data.route
            this.post({url:url,data:data}).then((response)=>{
                resolve(response)
            }).catch(err=>{
                reject(err)
            })
        })
    }


    // verificar si se activa el panel
    verifySystem(){
        return new Promise((resolve,reject)=>{
            let url = '/verificacion-estado-panel-iea'
            this.get({url:url}).then((response)=>{
                resolve(response)
            }).catch(err=>{
                reject(err)
            })
        })
    }



    // regulador de respuestas

    responseStatus(data,url,mode){
        // console.log('statuuuuuuuuuuuuuuus')
        // console.log(data)
        // console.log(this.$socket)
        // if(mode == 'maquina'){

        //     if(data.data[0].code){
        //         if(data.data[0].code != 200){

        //         }
        //     }else{

        //     }

        // }else{
        //     if(data.status == 200){
        //         // console.log(200)
                
        //     }else{
        //         console.error(500)
        //     }
        // }
        
        
    }

    
    
}