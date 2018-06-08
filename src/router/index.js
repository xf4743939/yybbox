import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const login = r => require.ensure([],() => r(require('../page/login')),'login');

const home= r => require.ensure([],() => r(require('../page/home')),'home');

const user= r => require.ensure([],() => r(require('../page/user/index')),'user');

const account = r => require.ensure([],() => r(require('../page/user/account.vue')),'account');

const wallet = r => require.ensure([],() => r(require('../page/user/wallet.vue')),'wallet');

const detail = r => require.ensure([],() => r(require('../page/user/subWallet/detail.vue')),'detail'); 

const drawing = r => require.ensure([],() => r(require('../page/user/subWallet/drawing.vue')),'drawing'); 

const prepaid = r => require.ensure([],() => r(require('../page/user/subWallet/prepaid.vue')),'prepaid'); 

const routes=[
  {
    path:'/',
    component:home
  },
  {
    path:'/login',
    component:login
  },
  {
    path:'/user',
    component:user,
    children:[
      {
        path:'index',
        component:account,
        meta: { requireAuth:true },      
      },
      {
        path:'wallet',
        component:wallet,
        meta: { requireAuth:true },
        children:[
          {
            path:'prepaid',
            component:prepaid
          },
          {
            path:'drawing',
            component:drawing
          },
          {
            path:'detail',
            component:detail
          }
        ]     
      }
   ]
  }
]

export default new Router({
  routes,
  mode:'history',
  strict:process.env.NODE_ENV !== 'production'
})