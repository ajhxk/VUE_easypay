<style src="../assets/css/orderitem.css"></style>

<template>

    <div>
    <template v-for="(index,item) in oitems">

        <div class="timeOption" @click="selectedToggle(index)" v-bind:class="{'check': index==0, 'uncheck': index!=0}">

            <div class="timeOption_wrap">
                <div class="timeOption_wrap_title">
                    <p>{{item.ordername}}</p>
                    <span class="fr">{{item.orderprice}}</span>
                </div>
                <div class="timeOption_wrap_content">
                    <span class="timeOption_wrap_content_btn" ></span>
                    <span class="timeOption_wrap_content_year">{{item.ordertime}}</span>
                    <span class="timeOption_wrap_content_week">({{item.orderweek}})</span>
                    <span class="timeOption_wrap_content_hour" >{{item.orderhour}}</span>
                    <div class="timeOption_wrap_content_intro " >
                        {{item.ordercontent}}
                    </div>
                </div>
                <div class="timeOption_wrap_footBtn" @click.stop="toggleOpen(index)" >
                    <div class="timeOption_wrap_footBtn_triangleDown"></div>
                </div>
            </div>

        </div>
    </template>
    </div>

</template>

<script>
    import {
            updatePriceColumn,
            changeDoType,
            changeDataInPriceModel,
            initPriceModel } from '../vuex/actions'

    export default{
        vuex:{
            getters:{
                oitems:function({orderitem}){
                    return orderitem.oitems
                }
            },

            actions:{
                updatePriceColumn,
                changeDoType,
                changeDataInPriceModel,
                initPriceModel
            }
        },
        data(){
            return {

                "textArray": [],

                "textArray_length": [],

                "textArray_height": [],

                "strArray": [],

                "h": [],

                "clickIndex": 0
            }
        },

        watch:{
            "oitems":'pinit'

        },


        methods:{

            pinit:function(){
                var _this = this;

                /**
                 * 场地列表字段场地控制
                 */
                !function lenJudge(){
                   var  tar =  $('div.timeOption .timeOption_wrap_content_intro'),
                        btn =  $('.timeOption_wrap_footBtn'),
                        num = tar.length;
                    for (var i=0;i<num;i++){
                        _this.textArray[i] = tar.eq(i).text().trim();
                        _this.textArray_length[i] = _this.textArray[i].length;
                        _this.textArray_height[i] = tar.eq(i).height();
                        _this.strArray[i] = _this.textArray[i].substr(0,55)+"...";
                        _this.h[i] = _this.textArray_height[i] + "px";

                        if(_this.textArray_length[i]>55){
                            tar.eq(i).text(_this.strArray[i]);
                            btn.eq(i).show();
                        }
                    }
                }();

            },

            toggleOpen:function(item){
                var btn = $('.timeOption_wrap_footBtn'),
                    tar = $('div.timeOption .timeOption_wrap_content_intro'),
                    h = this.h[item],
                    _this = this;

                tar.eq(item).animate({height:h});
                tar.eq(item).text(_this.textArray[item]);
                btn.eq(item).hide();

            },

            selectedToggle:function(item){
                var tip = $('.timeOption'),
                    tar = tip.eq(item),
                    _this = this,
                    pretar = tip.eq(_this.clickIndex);

                //更新价格模块状态
                _this.updatePriceColumn( _this.oitems[item].orderprice,_this.oitems[item].ordersurp);
                _this.initPriceModel();


                //已选中  与前一次点击目标相同
                if(tar.hasClass('check') && (_this.clickIndex == item) ){
                    _this.changeDoType('hide');
                    _this.changeDataInPriceModel('sw_priceColumn_control');
                }

                //未选中 与前一次点击目标相同
                if(tar.hasClass('uncheck') && (_this.clickIndex == item) ){
                    _this.changeDoType('show');
                    _this.changeDataInPriceModel('sw_priceColumn_control');
                }

                //未选中 与前一次点击目标不同  前一次状态为选中
                if(tar.hasClass('uncheck') && (_this.clickIndex != item) && pretar.hasClass('check')){
                    _this.changeDoType('toggleshow');
                    _this.changeDataInPriceModel('sw_priceColumn_control');
                }

                //未选中 与前一次点击目标不同 前一次状态为未选中
                if(tar.hasClass('uncheck') && (_this.clickIndex != item) && pretar.hasClass('uncheck')){
                    _this.changeDoType('show');
                    _this.changeDataInPriceModel('sw_priceColumn_control');
                }


                _this.clickIndex = item;

                if(tar.hasClass('check')){
                    tar.removeClass('check').addClass('uncheck')
                }else{
                    tar.addClass('check').removeClass('uncheck').siblings().removeClass('check').addClass('uncheck');
                }
            }
        }


    }


</script>
