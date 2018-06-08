/**
 * 配置编译环境和线上环境
 * baseUrl:域名地址
 * baseImgPath:图片存放地址
 */

 let baseUrl='';
 let routerMode='history';
 let baseImgPath;

 if(process.env.NODE_ENC == 'development'){
     baseUrl='http://localhost:10086';
     baseImgPath='http://localhost:10086/img/'
 }else{
    baseUrl='http://cangdu.org:8001';
    baseImgPath='http://cangdu.org:8001/img/'
 }

 export {
     baseUrl,
     routerMode,
     baseImgPath
 }