import * as types from './mutation-types'


/**
 *  查询日期列表
 * @from: dateNav.js
 * @use: indexPage.vue
 * @param dispatch
 * @param chargetype
 */
export const getDateList = function ({dispatch},chargetype,venueid,fieldid){
    var TIME_start = new Date().getTime();//起始时间
    $.ajax({
        type:"get",
        url: ajaxJsonpUrl+'src/mock/dateNav.txt',
        dataType : "jsonp",
        jsonp: "callback",
        jsonpCallback:'handleResponse',
        success:function(data){
            var TIME_ =  new Date().getTime() - TIME_start;//接受时间
            console.log( 'ajax getDateList: ' + TIME_ + 'ms');
            if(data.type==200){
                //获取日期列表
                dispatch(types.GET_DATE_LIST,data.infos.date);

                //查询当天订单(2:hour/1:ticket)
                if(chargetype === 1 ){
                    searchDayOrder({dispatch},data.infos.date[0].id,true);
                }
                else if(chargetype === 2){
                    searchHourOrder({dispatch},data.infos.date[0].id);
                }

            }
        },
        error:function(data){

        }
    })

}

//查询订单列表(ticket)
export const searchDayOrder = function({dispatch}, id, isInitPriceModel){

    $.ajax({
        type:"get",
        url:ajaxJsonpUrl+'src/mock/field_'+id+'.js',
        dataType : "jsonp",
        jsonp: "callback",
        jsonpCallback:'handleResponseField',
        success:function(data){
            if(data.type==200){
                //初始化价格栏信息
                if(isInitPriceModel === true){
                    updatePriceColumn( {dispatch},data.infos.oitem[0].orderprice,data.infos.oitem[0].ordersurp);
                    initPriceModel({dispatch});
                }
                dispatch(types.SEARCT_DAY_ORDER, data.infos.oitem);
            }
        },
        error:function(data){

        }
    });

}

//更新价格栏信息
export const updatePriceColumn = function({dispatch},price,surp){
    dispatch(types.UPDATE_PRICE_COLUMN,price,surp)
}
//修改价格栏动画类型
export const changeDoType = function({dispatch},type){
    dispatch(types.CHANGE_DO_TYPE,type)
}

//初始化价格信息
export const initPriceModel = function({dispatch}){
    dispatch(types.INIT_PRICEMODEL)
}

//增加数量计算价格
export const addCalc = function({dispatch}){
    dispatch(types.ADD_CALC)
}

//减数量计算价格
export const reduceCalc = function({dispatch}){
    dispatch(types.REDUCE_CALC)
}

//修改价格栏中的字段方法
export const changeDataInPriceModel = function({dispatch},data){
    dispatch(types.CHANGE_VAL_IN_PRICEMODEL,data)
}



/*==================
    小时制下单模块
 ===================*/

/**
 *  查询小时制订单列表
 * @from hourOrder.js
 * @use dateDav.vue
 * @param dispatch
 * @param id
 * @param isInitPriceModel
 */
export const searchHourOrder = function({dispatch}, id){
    var TIME_start = new Date().getTime();//起始时间
    $.ajax({
        type:"get",
        url:ajaxJsonpUrl+'src/mock/hourfield_'+id+'.js',
        dataType : "jsonp",
        jsonp: "callback",
        jsonpCallback:'handleHour',
        success:function(data){
            var TIME_ =  new Date().getTime() - TIME_start;//接受时间
            console.log( 'ajax searchHourOrder: ' + TIME_ + 'ms');
            if(data.type==200){
                window.TIME_start = new Date().getTime();//起始时间
                stopLoading({dispatch});
                dispatch(types.SEARCH_HOUR_ORDER, data.infos);

            }
        },
        error:function(data){

        }
    });

}

/**
 * 接收要取消激活订单块位置信息
 * @param dispatch
 * @param data
 */
export const getHourPosition = function({dispatch},data){
    dispatch(types.GET_HOUR_POSITION,data)
}

/*==================
    小时制价格模块
 ===================*/
/**
 * 增加小时制订单
 * @param dispatch
 * @param data
 */
export const addHourOrder = function({dispatch}, data){
    dispatch(types.ADD_HOUR_ORDER,data)
}
/**
 * 删除小时制订单
 * @param dispatch
 * @param data
 */
export const delHourOrder = function({dispatch}, data){
    dispatch(types.DEL_HOUR_ORDER,data)
}
export const delHourCount = function({dispatch},hours){
    dispatch(types.DEL_HOUR_COUNT ,hours)
}
export const initHourPrice = function({dispatch}){
    dispatch(types.INIT_HOUR_PRICE)
}

/*==================
    loading模块
 ===================*/
export const stopLoading = function({dispatch}){
    dispatch(types.STOP_LOADING)
}

export const doLoading = function({dispatch}){
    dispatch(types.DO_LOADING)
}
