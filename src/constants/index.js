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
    getHomeDelegateOrder:getHomeDelegateOrder
}

export default api;