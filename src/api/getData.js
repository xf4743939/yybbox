import {get,post} from '../config/fetch'

/**
 * 登陆
 */
export const login = data => post('/admin/login',data)



/**
 * 获取用户信息
 */

 export const getAdminInfo = () => get('/admin/info')