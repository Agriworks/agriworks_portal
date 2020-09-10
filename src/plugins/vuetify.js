import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import GoogleIcon from "../components/GoogleIcon.vue"


Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      google: {
        component: GoogleIcon
      }
    }
  },
  theme:{
      themes: {
        light: {
          primary: '#017afd',
          secondary: '#00008b',
          accent: '#2196f3',
          error: '#b71c1c',
        },
        dark: {
          primary: '#4CAF50',
          secondary: '#57bb63',
        }
      },
      dark : false,
      options: {
        customProperties: true,
      },
  },

})
