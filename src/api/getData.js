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

//得到用户的所有银行卡
export const getBankCards= data => post(api.getBankCards,data)

//提款到银行卡
export const moneyCreateFc= data => post(api.moneyCreateFc,data);

//钱包明细 财务条件筛选数据
export const getAllFC= data => post(api.getAllFC,data)

//转化预付费
export const conversionFeeMoney= data => post(api.conversionFeeMoney,data)

//更新用户基本资料
export const upDateUser = data => post(api.upDateUser,data)

//上传头像
export const updateHeadImg= data => post(api.updateHeadImg,data)

//身份实名认证
export const realNameAuthentication= data => post(api.realNameAuthentication,data)

//得到身份证类型
export const getCard = data => post(api.getCard,data)