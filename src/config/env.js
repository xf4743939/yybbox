/**
 * 配置编译环境和线上环境
 * baseUrl:域名地址
 * baseImgPath:图片存放地址
 */

 let baseUrl='';
 let routerMode='history';
 let baseImgUrl;

 if(process.env.NODE_ENC == 'development'){
     baseImgUrl='http://follow.yybbox.com';
 }else{
    baseUrl='http://follow.yybbox.com';
 }

 export {
     baseUrl,
     routerMode,
     baseImgUrl
 }