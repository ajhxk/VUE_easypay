
import indexPage from './indexPage.vue'

import store from '../../vuex/store'

window.ajaxJsonpUrl = 'http://192.168.0.129:8011/vuex/easy-pay/';

window.codingAjaxUrl = 'https://coding.net/u/hxk/p/test/git/raw/master/';




new Vue({
    el:'body',
    store,
    components:{
        indexPage
    }
})