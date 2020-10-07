import Vue from 'vue'
import App from './App'
import {VueTyper} from 'vue-typer'

import {faPlusSquare, faEye, faEdit, faTrash, faSave, faUndo, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";

import router from './router/router';
import store from './store'

library.add(faEye, faEdit, faTrash, faSave, faUndo, faTimes, faPlusSquare);

Vue.config.productionTip = false;

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('vue-typer', VueTyper)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  store,
  template: '<App/>',

  created() {
    this.$store.commit('initialiseStore');
  }
})
