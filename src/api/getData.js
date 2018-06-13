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
export const getBankCards= () => post(api.getBankCards)

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

//获得所有的开户银行
export const getAllBanks = () => post(api.getAllBanks)

//解绑银行卡
export const deleteCard= data => post(api.deleteCard + data)

//设置默认银行卡
export const setDefaultCard= data => post(api.setDefaultCard + data)

//添加用户银行卡
export const addBankCard = data => post(api.addBankCard,data)

//核对当前手机号是否是当前账户
export const checkPhoneNumIsYourSelf = data => post(api.checkPhoneNumIsYourSelf,data)

//获取手机验证码（type=1 为修改手机号码第一个验证码  type=4为新手机号验证码）
export const getPhoneCode= data => post(api.getPhoneCode + "?phoneNumber=" + data.phoneNumber + "&type=" + data.type)

//验证经纪商账号是否属于您自己
export const checkBrokerCompanyAccountIsYourSelf= data => post(api.checkBrokerCompanyAccountIsYourSelf,data)

//更新手机号码
export const upDatePhoneNum= data => post(api.upDatePhoneNum,data)

//更新登录密码
export const upDateLoginPwd= data => post(api.upDateLoginPwd,data);

//修改提款密码
export const upDatePayPwd= data => post(api.upDatePayPwd,data);

//创建实盘跟投关系
export const followCreate= data => post(api.followCreate,data)

//解除跟投关系
export const unFollowBind= data => post(api.unFollowBind,data)

//根据国内国际获取一个经纪商账号
export const getBrokerCompanyAccountOrNullFC= data => post(api.getBrokerCompanyAccountOrNullFC + data)

//交易者详细 //获取策略投资下的交易员列表
export const getTraderList= data => post(api.getTraderList,data)

//获取当前用户的参赛状态
export const currentUserGameStatus= data => post(api.currentUserGameStatus + data)
