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
    getCard:getCard
}

export default api;