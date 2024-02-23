import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import axios from "axios";
import VueAxios from 'vue-axios'
axios.defaults.baseURL = "http://192.168.0.117:8080/";
Vue.use(VueAxios, axios);

Vue.use(Vuetify);

export default new Vuetify({
});
