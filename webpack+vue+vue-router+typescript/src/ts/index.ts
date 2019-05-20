import App from '../vue/app.vue';
import "../scss/index.scss";

import {router} from './router';

new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
});
