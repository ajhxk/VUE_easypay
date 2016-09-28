import {
    UPDATE_PRICE_COLUMN,
    CHANGE_DO_TYPE,
    CHANGE_VAL_IN_PRICEMODEL,
    INIT_PRICEMODEL,
    ADD_CALC,
    REDUCE_CALC
} from '../mutation-types'

const state = {

    tips:'门票价格会随节假日浮动',

    price:'--',

    num:'1',

    surpluscount:'--',

    sum:'--',

    isShow:true,

    doType:'show',

    sw_priceColumn_control:true

}

const mutations = {

    [UPDATE_PRICE_COLUMN] (state,price,surp){
        state.price = price;
        state.surpluscount = surp;
    },
    [CHANGE_DO_TYPE] (state,type){
        state.doType = type;
        console.log('state.doType: '+state.doType);
    },
    [CHANGE_VAL_IN_PRICEMODEL] (state,data){
        console.log('switch start: '+ data+ '= ' + state[data])
        state[data] = !state[data];
        console.log('switch over: '+  data+ '= '+state[data])
    },
    [INIT_PRICEMODEL] (state){
        if(state.surpluscount == 0){
            state.num = 0;
            state.sum = 0;
        }else{
            state.num = 1;
            state.sum = state.num * (state.price)
        }
    },
    [ADD_CALC] (state){
        if(state.num >= state.surpluscount){
            state.num = state.surpluscount
            return false;
        }
        state.num++;
        state.sum = state.price *(state.num);
    },
    [REDUCE_CALC] (state){
        if(state.num <= 0){
            state.num = 0;
            return false;
        }
        state.num--;
        state.sum = state.price * (state.num);
    }

}

export default{
    state,
    mutations
}


