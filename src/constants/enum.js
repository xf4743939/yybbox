//导航序号判断点击那个
export const navIndex={
    one:1,
    two:2,
    three:3,
    four:4,
    five:5,
    six:6
}

export const followStatus={
    following:1, //表示正在跟投
    followed:2, //表示历史跟投
    vipFollow:3 //表示已付费
}

//交易员(跟随者)搜索排序字段
export const sortField={
   noSort:0, //默认排序
   profit:1, //盈亏金额
   winRate:2,//交易胜率
   avgAmt:3, //平均获利点数
   proAmt:4, //盈亏点数
    qty:5,//交易手数
   followNUm:6,//跟投人数
   week:7,//交易周期
   followProfit:8 //跟随获利 
}

//排序的方向
export const sortDirection={
    desc:1, //从高到底
    asc:2 //从低到高
}


export const prdUrl='http://follow.yybbox.com';