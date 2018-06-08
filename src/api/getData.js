import {get,post} from '../config/fetch'
import api from '../constants/index'
 /*
  * test 易又宝网站接口
  */
 export const getTraders = data => post('/api/services/app/brokerCompanyAccountService/GetTraderForProfitSortList',data);

 /*
  *首页的轮播图 
  */
 export const getSwipers = data => post(api.getArticleListByPageFilter,data)

// 国内国际收益榜
export const getTraderForProfitSortList = data => post(api.getTraderForProfitSortList,data)

//获取token

export const getToken= data => post(api.getToken,data);

//获取登陆信息
export const  getCurrentLoginInformations= () => post(api.getCurrentLoginInformations)

//根据账号类型获取账户信息
export const getByUserIdAndAccountTypeFC= data => post(api.getByUserIdAndAccountTypeFC,data)

//微信支付生成二维码
export const createCode= data => post(api.createCode + data)