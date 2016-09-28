import {
    GET_DATE_LIST,

} from '../mutation-types'

const state = {
    dateitems:[]
}

const mutations = {

    [GET_DATE_LIST] (state,data){
        state.dateitems = data;
    }
}

export default{
    state,
    mutations
}


