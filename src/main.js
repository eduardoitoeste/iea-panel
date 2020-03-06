import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueSocketIO from 'vue-socket.io'
const DEBUG = true
Vue.config.productionTip = false
Vue.config.devtools=DEBUG
Vue.use(new VueSocketIO({
  debug: DEBUG,
  connection: 'http://192.168.0.72:3000',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  // options: { path: "/my-app/" } //Optional options
}))
let old_console_log = console.log;
console.log = function() {
    if ( DEBUG ) {
        old_console_log.apply(this, arguments);
    }
}
new Vue({
  router,
  store,
  vuetify,
  sockets: {
    connect: function () {
        console.log('socket connected')
        this.$socket.emit('register-machine', 1);
    },
    customEmit: function (data) {
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  render: h => h(App)
}).$mount('#app')
