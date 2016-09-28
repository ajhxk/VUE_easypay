
//获取日期列表
export const GET_DATE_LIST = 'GET_DATE_LIST'

//查询门票制订单列表
export const SEARCT_DAY_ORDER = 'SEARCH_DAY_LIST'

//更新价格栏信息
export const UPDATE_PRICE_COLUMN = 'UPDATE_PRICE_COLUMN'

//修改价格栏动画类型
export const CHANGE_DO_TYPE = 'CHANGE_DO_TYPE'

//初始化价格信息
export const INIT_PRICEMODEL = 'INIT_PRICEMODEL'

//增加数量计算价格
export const ADD_CALC = 'ADD_CALC'

export const REDUCE_CALC = 'REDUCE_CALC'

export const CHANGE_VAL_IN_PRICEMODEL = 'CHANGE_VAL_IN_PRICEMODEL'


/*==================
    小时制下单模块
===================*/
/**
 * 查询小时制订单列表
 * @type {string}
 */
export const SEARCH_HOUR_ORDER = 'SEARCH_HOUR_ORDER'
/**
 * 接收要取消激活订单块位置信息
 * @type {string}
 */
export const GET_HOUR_POSITION = 'GET_HOUR_POSITION'

/*==================
    小时制价格模块
 ===================*/
/**
 * 增加订单
 * @type {string}
 */
export const ADD_HOUR_ORDER = 'ADD_HOUR_ORDER'
/**
 * 减少订单
 * @type {string}
 */
export const DEL_HOUR_ORDER = 'DEL_HOUR_ORDER'
/**
 * 总时间数 减处理
 * @type {string}
 */
export const DEL_HOUR_COUNT = 'DEL_HOUR_COUNT'
/**
 * 价格模块初始化
 * @type {string}
 */
export const INIT_HOUR_PRICE = 'UPSET_HOUR_PRICE'

/*==================
    loading模块
 ===================*/
export const STOP_LOADING = 'STOP_LOADING'

export const DO_LOADING = 'DO_LOADING'