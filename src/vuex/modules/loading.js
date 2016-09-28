import {
    STOP_LOADING,
    DO_LOADING
} from '../mutation-types'

const state = {
    isLoading:true
}

const mutations = {

    [STOP_LOADING] (state){
        state.isLoading = false;
        var TIME_ =  new Date().getTime() - window.TIME_start;//接受时间
        console.log( 'acrion STOP_LOADING: ' + TIME_ + 'ms');
    },
    [DO_LOADING] (state){
        state.isLoading = true;
    }
}

export default{
    state,
    mutations
}


