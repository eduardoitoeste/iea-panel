import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import {Plugin} from 'vue-fragment'
Vue.use(Plugin);
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg', // default - only for display purposes
  },
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken3,
        secondary: "#FFFFFF",
        third: colors.lightGreen.accent3,
        fourth: colors.blue,
        danger: '#FF5252',
        alertHeader:colors.lime.accent3,
        success:colors.green,
        warning:colors.yellow.darken3,
        info:colors.blue,
        disabledItem:colors.grey.lighten1
      },
    },
  },
});
