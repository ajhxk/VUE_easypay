
import indexPage from './indexPage.vue'

import store from '../../vuex/store'

//window.ajaxJsonpUrl = 'http://192.168.1.101:1001/前端/新建文件夹/easy-pay/easy-pay/备份/';

window.ajaxJsonpUrl = 'https://coding.net/u/hxk/p/test/git/raw/master/';

//window.codingAjaxUrl = 'https://coding.net/u/hxk/p/test/git/raw/master/';



new Vue({
    el:'body',
    store,
    components:{
        indexPage
    }
})