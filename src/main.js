import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import Venues from './Venues.vue'
import Login from './Login.vue'
import createUser from './createUser.vue'
import LoginHome from './LoginHome.vue'
import createVenues from './createVenues.vue'
import PersonalInfo from './PersonalInfo.vue'
import oneVenues from './oneVenues.vue'
import infoChange from './infoChange.vue'
import ModifyVenues from './ModifyVenues.vue'
import AddReview from './AddReview.vue'
import longinVenues from './longinVenues.vue'
import Users from './Users.vue'
import loginReviews from './loginReviews.vue'
import VenuePhoto from './VenuePhoto.vue'
import AfteroneVenue from './AfteroneVenue.vue'


//VenuePhoto
import iview from '../node_modules/iview/dist/iview.min';
import 'iview/dist/styles/iview.css';
import locale from 'iview/dist/locale/en-US'
Vue.use(iview,{locale});


import VueRouter from 'vue-router'
Vue.use(VueRouter);

import VueResource from 'vue-resource'
Vue.use(VueResource);

import VueCookies from 'vue-cookies'
Vue.use(VueCookies);

// var Vue = require('vue')
// Vue.use(require('vue-cookies'))

import VueGeolocation from 'vue-browser-geolocation';
Vue.use(VueGeolocation);

// import VueGeolocation from 'vue-browser-geolocation';
// Vue.use(VueGeolocation);


Vue.http.options.emulateJSON=false;

const routes=[
  {
    path:'/',
    name:'home',
    component:Home
  },
  {
    path:'/Login',
    name:'login',
    component:Login
  },
  {
    path:'/LoginHome',
    name:'loginHome',
    component:LoginHome
  },
  {
    path:'/createUser',
    name:'createUser',
    component:createUser
  },
  {
    path:'/Venues',
    name:'venues',
    component:Venues
  },
  {
    path:'/createVenues',
    name:'createVenues',
    component:createVenues
  },
  {
    path:'/PersonalInfo',
    name:'personalInfo',
    component:PersonalInfo
  },
  {
    path:'/oneVenues/:venue_id',
    name:'oneVenues',
    component:oneVenues
  },
  {
    path:'/infoChange',
    name:'infoChange',
    component:infoChange
  },
  {
    path:'/ModifyVenues/:venue_id',
    name:'ModifyVenues',
    component:ModifyVenues
  },
  {
    path:'/longinVenues',
    name:'longinVenues',
    component:longinVenues
  },
  {
    path:'/Users',
    name:'users',
    component:Users
  },
  {
    path:'/AddReview/:venue_id',
    name:'AddReview',
    component:AddReview
  },
  {
    path:'/loginReviews',
    name:'loginReviews',
    component:loginReviews
  },
  {
    path:'/VenuePhoto/:venue_id',
    name:'VenuePhoto',
    component:VenuePhoto
  },
  {
    path:'/AfteroneVenue/:venue_id',
    name:'AfteroneVenue',
    component:AfteroneVenue
  },
];

const router=new VueRouter({
  routes:routes,
  mode:'history'
});

new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
});
