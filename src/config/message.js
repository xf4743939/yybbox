let message=function(that,res={},tip='',type='warning'){
    debugger;
    if(!res){
        that.$message({      
            message:res.error.message,
            type:type,
            duration:2000,
            center:true,
            onClose:function(){
              that.isShow=true;
            }
        })
    }else{         
      that.$message({
        message:tip,
        type:type,
        duration:2000,
        center:true,
        onClose:function(){
            that.isShow=true;
          }
    })  
 }
    return;
}

export default message