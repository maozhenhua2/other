import Index from '../vue/index.vue';
import P1 from '../vue/p1.vue';
import P2 from '../vue/p2.vue';
import P3 from '../vue/p3.vue';
import P4 from '../vue/p4.vue';
import P404 from '../vue/p404.vue';

var routes = [
  {path: '/', component: Index, name: 'index'},
  {path: '/p1/:name', component: P1, name: 'p1'},
  {path: '/p2/:name', component: P2, name: 'p2'},
  {path: '/p3/:name', component: P3, name: 'p3'},
  {path: '/p4/:name', component: P4, name: 'p4'},
  {path: '*', component: P404, name: '404'},
];

const router = new VueRouter({
  routes: routes
});

export {
  router
}
