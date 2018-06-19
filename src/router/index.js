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

const safe = r => require.ensure([],() => r(require('../page/user/safe.vue')),'safe')

const setting = r => require.ensure([],() => r(require('../page/user/setting.vue')),'setting')

const shareMoney = r => require.ensure([],() => r(require('../page/user/shareMoney.vue')),'shareMoney')

const info= r => require.ensure([],() => r(require('../page/user/subSetting/info.vue')),'info')

const avator=r => require.ensure([],() => r(require('../page/user/subSetting/avator.vue')),'avator')

const oauth = r => require.ensure([],() => r(require('../page/user/subSafe/oauth.vue')),'oauth')

const bankCard = r => require.ensure([],() => r(require('../page/user/subSafe/bankCard.vue')),'bankCard')

const getMoneyPwd = r => require.ensure([],() => r(require('../page/user/subSafe/getMoneyPwd.vue')),'getMoneyPwd')

const loginPwd = r => require.ensure([],() => r(require('../page/user/subSafe/loginPwd.vue')),'loginPwd')

const phoneNumber = r => require.ensure([],() => r(require('../page/user/subSafe/phoneNumber.vue')),'phoneNumber')

const email = r => require.ensure([],() => r(require('../page/user/subSafe/email.vue')),'email')

const trader = r => require.ensure([],() => r(require('../page/strategy/index.vue')),'trader')

const tradeDetail = r => require.ensure([],() => r(require('../page/tarderOrFollow/index.vue')),'tradeDetail')

const follower= r => require.ensure([],() => r(require('../page/follow/index.vue')),'follower')

const game= r => require.ensure([],() => r(require('../page/game/index.vue')),'game')

const routes=[
  {
    path:'/',
    component:home
  },
  {
    path:'/home',
    component:home
  },
  {
    path:'/login',
    component:login
  },
  {
     path:'/tradeDetail/:traderUserId/:worldOrHomw/:isTrader',
     component:tradeDetail
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
      },
      {
         path:'safe',
         component:safe,
         meta: { requireAuth:true },  
         children:[
           {
             path:'',
             component:oauth 
           },
           {
             path:'oauth',
             component:oauth
           },
           {
              path:'bankCard',
              component:bankCard
           },
           {
             path:'getMoneyPwd',
             component:getMoneyPwd
           },
           {
             path:'loginPwd',
             component:loginPwd
           },
           {
             path:'phoneNumber',
             component:phoneNumber
           },
           {
              path:'email',
              component:email
           }
         ]
      },
      {
        path:'setting',
        component:setting,
        meta: { requireAuth:true },  
        children:[
          {
             path:'',
             component:info
          },
          {
            path:'info',
            component:info
          },
          {
            path:'avator',
            component:avator
          }
          
        ]
      },
      {
        path:'shareMoney',
        component:shareMoney,
        meta: { requireAuth:true },  
      }
   ]
  },
  {
    path:'/trader',
    component:trader
  },
  {
     path:'/follower',
     component:follower
  },
  {
    path:'/game',
    component:game   
  }
]

export default new Router({
  routes,
  mode:'history',
  strict:process.env.NODE_ENV !== 'production'
})