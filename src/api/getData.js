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