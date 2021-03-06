import {spread,all,post,postList} from '../config/fetch'
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

//跟投者详细 (跟投达人)
export const getTraderForNBList= data => post(api.getTraderForNBList,data)

//获取跟投列表信息
export const followRelationshipService= data => post(api.followRelationshipService,data)

//获取全部国际合约
export const getAllWorldInstrument= () => postList(api.getAllWorldInstrument)

//获取全部国内合约
export const getAllHomeInstrument= () => postList(api.getAllHomeInstrument)

//获取国际全部商品
export const getWordProducts= () => postList(api.getWordProducts)

//获取国内全部商品
export const getAllHomeProduct= () => postList(api.getAllHomeProduct)

//获取国际国内货币和商品
export const getAllInstrumentAndproduct= data => all(data)

//分发请求对象
export const spreads = data => spread(data)

//通过用户id获取国际实盘挂单
export const getDelegateOrder= data => post(api.getDelegateOrder + data)

//通过用户id获取国内实盘挂单
export const getHomeDelegateOrder= data => post(api.getHomeDelegateOrder + data)

//获取国际国内比赛期数
export const getGameCycle= data => post(api.getGameCycle,data)

//获取大赛排名
export const getMatchResult= data => post(api.getMatchResult,data)

//解绑实盘账号
export const unBind= data => post(api.unBind + data)

//得到所有经纪商
export const getAllForNormalFC= data => post(api.getAllForNormalFC + data)

//创建经纪商账号(实盘账号)
export const createBrokerCompanyAccountFC= data => post(api.createBrokerCompanyAccountFC,data)

//注册
export const register= data => post(api.register,data)

//忘记密码
export const findPassword= data => post(api.findPassword,data)

//得到文章分类目录
export const getArticleTypeList= data => post(api.getArticleTypeList,data)

//获取介绍类文章
export const getArticleList= data => post(api.getArticleList,data)

//得到具体的文章
export const getArticleById= data => post(api.getArticleById + data)

//获取推荐组合策略
export const getAllForTop= data => post(api.getAllForTop + data)

//获取汇率
export const getAllexchangeRate = () => post(api.getAllexchangeRate)

//获取组合策略列表
export const getStrategyListByFilter= data =>post(api.getStrategyListByFilter,data)

//适合我的组合
export const getStrategyListForMeByFilter= data => post(api.getStrategyListForMeByFilter,data)

//获取组合策略的详细信息
export const getCombiStrategyDetail= data => post(api.getCombiStrategyDetail,data)

//组合策略跟投
export const strategyFollow= data => post(api.strategyFollow,data)

 //组合策略取消跟投
 export const unFollowStrategy= data => post(api.unFollowStrategy,data)

 //推广用户赚钱
 export const seoUserStatistice= () => post(api.seoUserStatistice)

 //推广的用户集合
 export const seoUserList=() =>post(api.seoUserList)

 //得到大赛详情
 export const getGameDetailOfUserId= data => post(api.getGameDetailOfUserId,data)

 //国际实盘持仓单
 export const brokerCompanyAccountPositionService= () =>post(api.brokerCompanyAccountPositionService)

 //国际模拟持仓单
 export const simBrokerCompanyAccountPositionService= () =>post(api.simBrokerCompanyAccountPositionService)

 //国内实盘持仓单
 export const homeBrokerCompanyAccountPositionService= () =>post(api.homeBrokerCompanyAccountPositionService)

 //国内模拟持仓单
 export const homeSimBrokerCompanyAccountPositionService= () =>post(api.homeSimBrokerCompanyAccountPositionService)

 //国际实盘成交单
 export const todayTradeOrderService=() =>post(api.todayTradeOrderService)

 //国际模拟成交单
 export const todaySimTradeOrderService=() =>post(api.todaySimTradeOrderService)

 //国内实盘成交单
 export const todayHomeTradeOrderService=() =>post(api.todayHomeTradeOrderService)

 //国内模拟成交单
 export const todayHomeSimTradeOrderService=() =>post(api.todayHomeSimTradeOrderService)

 //国际实盘挂单
 export const brokerCompanyAccountDelegateOrderService=() =>post(api.brokerCompanyAccountDelegateOrderService)

 //国际模拟挂单
 export const simDelegateOrderService=() =>post(api.simDelegateOrderService)

 //国内实盘挂单
 export const homeBrokerCompanyAccountDelegateOrderService=() =>post(api.homeBrokerCompanyAccountDelegateOrderService)

 //国内模拟挂单
 export const homeSimDelegateOrderService=() =>post(api.homeSimDelegateOrderService)

 //当前用户大赛状态
 export const currentUserJoinNewGame= data =>post(api.currentUserJoinNewGame + data)

 //取消大赛
 export const cancelGame=data => post(api.cancelGame,data)

 //参加模拟大赛
 export const applyGame=data => post(api.applyGame,data)