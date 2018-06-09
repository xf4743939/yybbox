const  message=function(that,res={},tip='',type='warning',fresh=false){
  
    if(Object.keys(res).length){
        that.$message({      
            message:res.error.message,
            type:type,
            duration:2000,
            center:true,
            onClose:function(){
              that.isShow=true;
              if(fresh){
                  that.$router.go(0)
              }
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
                if(fresh){
                    that.$router.go(0)
                }
              }
        })  
    }
    return;
}

export default message