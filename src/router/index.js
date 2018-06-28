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

const followDetail= r =>require.ensure([],() =>r(require('../page/tarderOrFollow/index.vue')),'followDetail')

const follower= r => require.ensure([],() => r(require('../page/follow/index.vue')),'follower')

const game= r => require.ensure([],() => r(require('../page/game/index.vue')),'game')

const world= r => require.ensure([],() => r(require('../page/game/world.vue')),'world')

const homeGame= r => require.ensure([],() => r(require('../page/game/home.vue')),'home')

const openFirm= r => require.ensure([],() => r(require('../page/user/openFirm/index.vue')),'openFirm')

const register = r => require.ensure([],() => r(require('../page/register.vue')),'register')

const forgetPassword = r => require.ensure([],() => r(require('../page/forgetPassword.vue')),'forgetPassword')

const introduce = r => require.ensure([],() => r(require('../page/introduce/index.vue')),'introduce')

const placard= r => require.ensure([],() => r(require('../page/introduce/subpage/placard.vue')),'placard')

const cardDetail= r =>require.ensure([],() => r(require('../page/introduce/subpage/cardDetail.vue')),'cardDetail')

const brief= r =>require.ensure([],() => r(require('../page/introduce/subpage/brief.vue')),'brief')

const about= r =>require.ensure([],() => r(require('../page/introduce/subpage/about.vue')),'about')

const partner= r =>require.ensure([],() => r(require('../page/introduce/subpage/partner.vue')),'partner')

const policy =r =>require.ensure([],() => r(require('../page/introduce/subpage/private.vue')),'policy')

const service = r=>require.ensure([],() => r(require('../page/introduce/subpage/service.vue')),'service')

const serviceDeatail= r =>require.ensure([],() => r(require('../page/introduce/subpage/serviceDetail.vue')),'serviceDeatail')

const declare= r =>require.ensure([],() =>r(require('../page/introduce/subpage/declare.vue')),'declare')

const guide= r =>require.ensure([],() =>r(require('../page/introduce/subpage/guide.vue')),'guide')

const guideDetail = r =>require.ensure([],() =>r(require('../page/introduce/subpage/guideDetail.vue')),'guideDetail')

const problem= r =>require.ensure([],() =>r(require('../page/introduce/subpage/problem.vue')),'problem')

const problemDetail= r =>require.ensure([],() =>r(require('../page/introduce/subpage/problemDetail.vue')),'problemDetail')

const groupDetail =r => require.ensure([],() =>r(require('../page/tarderOrFollow/group.vue')),'groupDetail')

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
     path:'/tradeDetail/:traderUserId/:worldOrHome/:isTrader',
     component:tradeDetail
  },
  {
    path:'/followDetail/:traderUserId/:worldOrHome/:isTrader',
    component:followDetail
  },
  {
     path:'/groupDetail/:comId/:worldOrHome',
     component:groupDetail
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
    component:game,
    children:[
      {
        path:'',
        component:world
      },
      {
        path:'world',
        component:world
      },
      {
        path:'home',
        component:homeGame
      }
    ]   
  },
  {
    path:'/openFirm',
    component:openFirm
  },
  {
    path:'/register',
    component:register
  },
  {
    path:'/forgetPassword',
    component:forgetPassword
  },
  {
    path:'/introduce',
    component:introduce,
    children:[
      {
        path:'placard',
        component:placard
      },
      {
        path:'article',
        component:cardDetail
      },
      {
        path:'brief',
        component:brief
      },
      {
        path:'about',
        component:about
      },
      {
        path:'partner',
        component:partner
      },
      {
        path:'policy',
        component:policy
      },
      {
        path:'service',
        component:service
      },
      {
        path:'serviceDetail',
        component:serviceDeatail
      },
      {
        path:'declare',
        component:declare
      },
      {
        path:'guide',
        component:guide
      },
      {
        path:'guideDetail',
        component:guideDetail
      },
      {
        path:'problem',
        component:problem
      },
      {
        path:'problemDetail',
        component:problemDetail
      }
    ]
  }
]

export default new Router({
  routes,
  mode:'history',
  strict:process.env.NODE_ENV !== 'production'
})