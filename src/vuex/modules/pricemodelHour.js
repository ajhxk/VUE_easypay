import {
    ADD_HOUR_ORDER,
    DEL_HOUR_ORDER,
    DEL_HOUR_COUNT,
    INIT_HOUR_PRICE
} from '../mutation-types'

const state = {
    hourOitems:[
/*        {
            "venueName":'场地2',
            "venueTime":'17:00-18:00',
            "package":'打包时段',
            "price":1.2
        }*/
    ],
    hoursSum:{
        hours:0
    },
    priceSum:0
}

const mutations = {

    /**
     * 增加小时制订单
     * @param state
     * @param data
     */
    [ADD_HOUR_ORDER] (state,data){
        var indexData = {
            w: data.w,
            h: data.h
        }
        //总时间数计数
        state.hoursSum.hours += data.hours;
        //总价格计算
        state.priceSum =(state.priceSum*10) + (data.price*10);
        state.priceSum = (state.priceSum /10);

        state.hourOitems.push(data);

    },

    /**
     * 删除小时制订单
     * @param state
     * @param data
     */
    [DEL_HOUR_ORDER] (state,data){

        var _hourItem = state.hourOitems,
            index;
        for(var i=0,len=_hourItem.length; i<len; i++){

            if(( _hourItem[i].w == data.w ) && (_hourItem[i].h == data.h) ){
                index = i;
            }

        }
        _hourItem.splice(index,1);

        //总价格计算
        state.priceSum = (state.priceSum*10) - (data.price*10);
        state.priceSum = (state.priceSum /10);
    },

    /**
     * 小时数减法处理
     * @param state
     * @param hours
     */
    [DEL_HOUR_COUNT] (state,hours){
        state.hoursSum.hours -= hours;
    },

    [INIT_HOUR_PRICE] (state){
        state.hourOitems = [],
        state.hoursSum = {hours:0},
        state.priceSum = 0;
    }
}

export default{
    state,
    mutations
}


