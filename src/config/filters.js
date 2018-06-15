import Vue from 'vue'


Vue.filter('subStr',function(name,type,end){
    //type 1 表示姓名 2.表示电子邮箱 3. 证件号码 4.手机号码 5 银行卡
    switch(type) {
     case 1:
       if (name && name.length > 2) {
             return "**" + name.substring(name.length-end);
         } else {
             if (!name) {
                 return "";
             }
           return "*" + name.substring(name.length-end);
       }
         break;
       case 2:
       if (name && name.length > 2) {
       return name.substring(0, 1) + "***" + name.substring(name.length - end);
       }
       break;
       case 3:
       if (name && name.length > 2) {
       return name.substring(0, 2) + "*********" + name.substring(name.length - end);
       }
       break;
       case 4 :
       if (name && name.length > 2) {
         return name.substring(0,3) + "****" + name.substring(name.length - end);
        }
        break;
       default:
       if (name && name.length > 2) {
        return "****" + name.substring(name.length - end);
       }
    }
 });
 Vue.filter('format',function(value){
    if(!value) return '';
    
     let date1=value.split('T')[0]  
     let date2=value.split('T')[1]
     let date3=date2.substring(0,date2.lastIndexOf(":"))
     return date1 + " " +date3
   
 });

 Vue.filter('formatDate',function(value){
    if(!value) return '';   
     let date1=value.split('T')[0]  
     let date2=value.split('T')[1]
     return date1.replace(/(\/)/g,'-');
 });


 Vue.filter('toDecimal',function(x){
    let f=parseFloat(x);
    if(isNaN(x)){
        return false ;
    }
    let f1=Math.round(x*100)/100;
    let s=f1.toString();
    let rs=s.indexOf('.')
    if(rs<0){
        rs=s.length;
        s+='.'
    }
    while(s.length <= rs+2){
      s+='0'
    }
    return s;
 })

 Vue.filter('toPercent',function(x){
     if(!x) return ;
     let str=Number(x*100).toFixed(2)
     str+='%'
     return str;
 })