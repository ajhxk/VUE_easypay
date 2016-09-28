import Vuex from  'vuex'
import header from './modules/header'
import dateNav from './modules/dateNav'
import orderitem from './modules/orderitem'
import pricemodel from './modules/pricemodel'
import pricemodelHour from './modules/pricemodelHour'
import hourOrder from './modules/hourOrder'
import loading from './modules/loading'
import middlewares from './middlewares'


const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

//Vue.config.debug = debug

export  default new Vuex.Store({
    modules:{
        header,
        dateNav,
        orderitem,
        pricemodel,
        pricemodelHour,
        loading,
        hourOrder
    },
  /*  strict:debug,*/
    strict:true,
/*    middlewares*/
})
