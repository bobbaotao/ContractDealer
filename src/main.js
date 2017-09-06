// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueClip from 'vue-clip';
require('es6-promise').polyfill();

Vue.config.productionTip = false
    //Vue.use(VueGoodTable);
Vue.use(Element, { locale });
Vue.use(VueAxios, axios);
Vue.use(VueClip);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
