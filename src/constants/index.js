/*
 *首页轮播图 
 */
const getArticleListByPageFilter='/api/services/app/articleService/getArticleListByPageFilter';

// 国际国内收益榜
const getTraderForProfitSortList='/api/services/app/brokerCompanyAccountService/GetTraderForProfitSortList';

//login oauth 认证
const getToken='/oauth/token'

//获得登陆信息
const getCurrentLoginInformations="/api/services/app/session/GetCurrentLoginInformations"

//根据账号类型获取账户信息
const getByUserIdAndAccountTypeFC="/api/services/app/brokerCompanyAccountInfoService/GetByUserIdAndAccountTypeFC"

//微信支付生成二维码
const createCode="/api/services/app/wxPayAPIService/MakeQRCode?money="

//得到用户的所有银行卡
const getBankCards="/api/services/app/bankCardService/GetBankCardForUser"

//提款到银行卡
const moneyCreateFc = "/api/services/app/financialRecordService/CreateFC";

//钱包明细 财务条件筛选数据
const getAllFC = "/api/services/app/financialRecordService/GetAllFC";

//转化预付费
const conversionFeeMoney = "/api/services/app/financialRecordService/ConversionFeeMoney";

//更新用户基本资料
const upDateUser = "/api/services/app/userService/UpdateUser";

//头像上传
const updateHeadImg="/api/services/app/userService/UpdateHeadImg"

//身份实名认证
const realNameAuthentication = "/api/services/app/userService/RealNameAuthentication";

//得到身份证类型
const getCard = "/api/services/app/cardTypeService/GetAll";

//获得所有的开户银行
const getAllBanks ="/api/services/app/bankService/GetAll";

//解绑银行卡
const deleteCard ="/api/services/app/bankCardService/Delete?id=";

//设置默认卡
const setDefaultCard="/api/services/app/bankCardService/SetDefault?id=";

//添加用户银行卡
const addBankCard = "/api/services/app/bankCardService/Create";

//核对当前手机号是否是当前账户
const checkPhoneNumIsYourSelf = "/api/services/app/userService/CheckPhoneNumIsYourSelf";

//获取手机验证码（type=1 为修改手机号码第一个验证码  type=4为新手机号验证码）
const getPhoneCode= "/api/Sms";

//验证经纪商账号是否属于您自己
const checkBrokerCompanyAccountIsYourSelf = "/api/services/app/brokerCompanyAccountService/CheckBrokerCompanyAccountIsYourSelf";

//更新手机号码
const upDatePhoneNum = "/api/services/app/userService/UpdatePhoneNum";

//更新登录密码
const upDateLoginPwd='/api/services/app/userService/UpDatePassword'

//修改提款密码
const upDatePayPwd = "/api/services/app/userService/UpdatePayPassword"

//创建实盘跟投关系
const followCreate = "/api/services/app/followRelationshipService/Create"

//解除跟投关系
const unFollowBind = "/api/services/app/followRelationshipService/UnBind"

//根据国内国际获取一个经纪商账号
const getBrokerCompanyAccountOrNullFC = "/api/services/app/brokerCompanyAccountService/GetBrokerCompanyAccountOrNullFC?worldOrHome="

//交易者详细 //获取策略投资下的交易员列表
const getTraderList="/api/services/app/brokerCompanyAccountService/GetTraderList"

//跟投者详细 (跟投达人)
const getTraderForNBList="/api/services/app/brokerCompanyAccountService/GetTraderForNBList"

//获取当前用户的参赛状态
const currentUserGameStatus="/api/services/app/gameUserService/CurrentUserGameStatus?worldOrHome="

//获取跟投列表信息
const followRelationshipService="/api/services/app/followRelationshipService/GetALLFC";

//获取全部国际合约
const getAllWorldInstrument="/api/services/app/baseInstrumentService/GetAll"

//获取过不国内合约
const getAllHomeInstrument="/api/services/app/baseHomeInstrumentService/GetAll"

//获取国际商品货物信息
const getWordProducts="/api/services/app/baseProductService/GetAll"

//获取国内所有商品
const getAllHomeProduct='/api/services/app/baseHomeProductService/GetAll'

//通过用户id获取国际挂单
const getDelegateOrder='/api/services/app/todayBrokerCompanyAccountDelegateOrderService/GetDelegateOrder?userId='

//通过用户id获取国际模拟挂单
const getHomeDelegateOrder='api/services/app/todayHomeBrokerCompanyAccountDelegateOrderService/GetDelegateOrder?userId='

//获取国际国内比赛期数
const getGameCycle='/api/services/app/gameCycleService/GetAllFC'

//获取大赛排名
const getMatchResult='/api/services/app/gameUserService/GetMatchResult'

//解绑实盘账号
const unBind='/api/services/app/brokerCompanyAccountService/UnBind?worldOrHome='

//得到所有经纪商
const getAllForNormalFC='/api/services/app/brokerCompanyService/GetAllForNormalFC?worldOrHome='

//创建经纪商账号(实盘账号)
const createBrokerCompanyAccountFC="/api/services/app/brokerCompanyAccountService/CreateBrokerCompanyAccountFC"

//注册
const register='/api/services/app/userService/CreateUser'

//忘记密码
const findPassword="/api/services/app/userService/FindPassword"

//得到文章分类的目录
const getArticleTypeList="/api/services/app/articleTypeService/GetArticleTypeList"

//获取介绍类文章
const getArticleList="/api/services/app/articleService/getArticleListByPageFilter"

//获得具体的文章
const getArticleById="/api/services/app/articleService/Get?id="

//获取推荐策略组合
const getAllForTop="/api/services/app/combiStrategyService/GetAllForTop?wh="

//获取汇率
const getAllexchangeRate='/api/services/app/exchangeRateService/GetAll'

//获取组合策略列表
const getStrategyListByFilter="/api/services/app/combiStrategyService/GetStrategyListByFilter"

//适合我的组合策略
const getStrategyListForMeByFilter= "/api/services/app/combiStrategyService/GetStrategyListForMeByFilter"

//获取组合策略详细信息
const getCombiStrategyDetail="/api/services/app/combiStrategyService/GetCombiStrategyDetail"

//组合策略跟投
const strategyFollow="/api/services/app/combiStrategyService/Follow"

 //组合策略取消跟投
const unFollowStrategy="/api/services/app/combiStrategyService/UnFollow"

//分享赚钱推广介绍
const seoUserStatistice="/api/services/app/userService/SeoUserStatistice"

//推广的用户集合
const seoUserList="/api/services/app/userService/SeoUserList"

//得到大赛详情
const getGameDetailOfUserId="/api/services/app/gameUserService/GetGameDetailOfUserId";

//国际实盘持仓单
const brokerCompanyAccountPositionService="/api/services/app/brokerCompanyAccountPositionService/GetListFC"

//国际模拟持仓单
const simBrokerCompanyAccountPositionService="/api/services/app/simBrokerCompanyAccountPositionService/GetListFC"

//国内实盘持仓单
const homeBrokerCompanyAccountPositionService="/api/services/app/homeBrokerCompanyAccountPositionService/GetListHFC"

//国内模拟持仓单
const homeSimBrokerCompanyAccountPositionService="/api/services/app/homeSimBrokerCompanyAccountPositionService/GetListHFC"

//国际实盘成交单
const todayTradeOrderService="/api/services/app/todayTradeOrderService/GetTradeOrderListFC"

//国际模拟成交单
const todaySimTradeOrderService="/api/services/app/todaySimTradeOrderService/GetTradeOrderListFC"

//国内实盘成交单
const todayHomeTradeOrderService="/api/services/app/todayHomeTradeOrderService/GetTradeOrderListFC"

//国内模拟成交单
const todayHomeSimTradeOrderService="/api/services/app/todayHomeSimTradeOrderService/GetTradeOrderListFC"

//国际实盘挂单
const brokerCompanyAccountDelegateOrderService="/api/services/app/todayBrokerCompanyAccountDelegateOrderService/GetDelegateOrderListFC"

//国际模拟挂单
const simDelegateOrderService="/api/services/app/todaySimDelegateOrderService/GetDelegateOrderListFC"

//国内实盘挂单
const homeBrokerCompanyAccountDelegateOrderService="/api/services/app/todayHomeBrokerCompanyAccountDelegateOrderService/GetDelegateOrderListFC"

//国内模拟挂单
const homeSimDelegateOrderService="/api/services/app/todayHomeSimDelegateOrderService/GetDelegateOrderListFC"

//大赛状态信息
const currentUserJoinNewGame="/api/services/app/gameUserService/CurrentUserJoinNewGame?type="

//取消模拟大赛
const cancelGame="/api/services/app/gameUserService/Cancel"

//参加模拟大赛
const applyGame="/api/services/app/gameUserService/ApplyFC"

let api={
    getArticleListByPageFilter:getArticleListByPageFilter,
    getTraderForProfitSortList:getTraderForProfitSortList,
    getToken:getToken,
    getCurrentLoginInformations:getCurrentLoginInformations,
    getByUserIdAndAccountTypeFC:getByUserIdAndAccountTypeFC,
    createCode:createCode,
    getBankCards:getBankCards,
    moneyCreateFc:moneyCreateFc,
    getAllFC:getAllFC,
    conversionFeeMoney:conversionFeeMoney,
    upDateUser:upDateUser,
    updateHeadImg:updateHeadImg,
    realNameAuthentication:realNameAuthentication,
    getCard:getCard,
    getAllBanks:getAllBanks,
    deleteCard:deleteCard,
    setDefaultCard:setDefaultCard,
    addBankCard:addBankCard,
    checkPhoneNumIsYourSelf:checkPhoneNumIsYourSelf,
    getPhoneCode:getPhoneCode,
    checkBrokerCompanyAccountIsYourSelf:checkBrokerCompanyAccountIsYourSelf,
    upDatePhoneNum:upDatePhoneNum,
    upDateLoginPwd:upDateLoginPwd,
    upDatePayPwd:upDatePayPwd,
    followCreate:followCreate,
    unFollowBind:unFollowBind,
    getBrokerCompanyAccountOrNullFC:getBrokerCompanyAccountOrNullFC,
    getTraderList:getTraderList,
    currentUserGameStatus:currentUserGameStatus,
    getTraderForNBList:getTraderForNBList,
    followRelationshipService:followRelationshipService,
    getAllWorldInstrument:getAllWorldInstrument,
    getAllHomeInstrument:getAllHomeInstrument,
    getWordProducts:getWordProducts,
    getAllHomeProduct:getAllHomeProduct,
    getDelegateOrder:getDelegateOrder,
    getHomeDelegateOrder:getHomeDelegateOrder,
    getGameCycle:getGameCycle,
    getMatchResult:getMatchResult,
    unBind:unBind,
    getAllForNormalFC:getAllForNormalFC,
    createBrokerCompanyAccountFC:createBrokerCompanyAccountFC,
    register:register,
    findPassword:findPassword,
    getArticleTypeList:getArticleTypeList,
    getArticleList:getArticleList,
    getArticleById:getArticleById,
    getAllForTop:getAllForTop,
    getAllexchangeRate:getAllexchangeRate,
    getStrategyListByFilter:getStrategyListByFilter,
    getStrategyListForMeByFilter:getStrategyListForMeByFilter,
    getCombiStrategyDetail:getCombiStrategyDetail,
    strategyFollow:strategyFollow,
    unFollowStrategy:unFollowStrategy,
    seoUserStatistice:seoUserStatistice,
    seoUserList:seoUserList,
    getGameDetailOfUserId:getGameDetailOfUserId,
    brokerCompanyAccountPositionService:brokerCompanyAccountPositionService,
    simBrokerCompanyAccountPositionService:simBrokerCompanyAccountPositionService,
    homeBrokerCompanyAccountPositionService:homeBrokerCompanyAccountPositionService,
    homeSimBrokerCompanyAccountPositionService:homeSimBrokerCompanyAccountPositionService,
    todayTradeOrderService:todayTradeOrderService,
    todaySimTradeOrderService:todaySimTradeOrderService,
    todayHomeTradeOrderService:todayHomeTradeOrderService,
    todayHomeSimTradeOrderService:todayHomeSimTradeOrderService,
    brokerCompanyAccountDelegateOrderService:brokerCompanyAccountDelegateOrderService,
    simDelegateOrderService:simDelegateOrderService,
    homeBrokerCompanyAccountDelegateOrderService:homeBrokerCompanyAccountDelegateOrderService,
    homeSimDelegateOrderService:homeSimDelegateOrderService,
    currentUserJoinNewGame:currentUserJoinNewGame,
    cancelGame:cancelGame,
    applyGame:applyGame
}

export default api;