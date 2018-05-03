import {get,post} from '../config/fetch'

/**
 * 登陆
 */
export const login = data => post('/admin/login',data)

/**
 * 退出
 */
export const signout = () => post('/admin/singout')

/**
 * 获取用户信息
 */

 export const getAdminInfo = () => get('/admin/info')

 /*
  *用户注册量 
  */
 export const userCount = data => get('/statis/user/' + data + '/count');

 /*
  *某天的订单量 
  */
 export const orderCount = data => get('/statis/order/' +data+ '/count');

 /*
  * 某一天管理员注册量 
  */
 export const adminDayCount = data => get('/statis/admin/' + data + '/count');

 /*
  *管理员数量 
  */
 export const adminCount = () => get('/admin/count')

 /*
  *获取 用户数量
  */
 export const getUserCount = data => get('/v1/users/count',data);

 /*
  *获取订单数量 
  */
 export const getOrderCount = data => get('/bos/orders/count',data);