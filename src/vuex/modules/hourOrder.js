import {
    SEARCH_HOUR_ORDER,
    GET_HOUR_POSITION
} from '../mutation-types'

const state = {
    hourOitems:{},
    position:{}
}

const mutations = {

    [SEARCH_HOUR_ORDER] (state,data){
        state.hourOitems = data;
    },

    [GET_HOUR_POSITION] (state,data){
        state.position = data;
        console.log(state.position)
    }
}

export default{
    state,
    mutations
}


