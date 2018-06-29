import {getStore} from './mUtils'

const getUser=function(that){
    //user 写死了每个子组件都要添加
    //that 对象this name子组件的属性
    if(!that.userInfo){  
        let getInfo=JSON.parse(getStore("userInfo"));  
          if(getInfo){          
            that.user=getInfo.user;
           }else{
             that.user=null;
           }        
      }else{
        that.user=that.userInfo.user;
      }
}
export default getUser