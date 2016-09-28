import {
    SEARCT_DAY_ORDER
} from '../mutation-types'

const state = {
    oitems:[]
}

const mutations = {

    [SEARCT_DAY_ORDER] (state,data){
        state.oitems = data;
    }
}

export default{
    state,
    mutations
}


