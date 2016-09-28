<style src="../assets/css/pricemodel.css"></style>

<template>

    <!--页脚场地价格-->
    <div class="priceBox" >
        <div class="priceBox_tip">*{{tips}}</div>
        <div class="priceBox_calc">
            <span class="priceBox_calc_s">￥{{price}}</span>
            <div class="priceBox_calc_add" @click="addCalc"></div>
            <span class="priceBox_calc_num">{{num}}</span>
            <div class="priceBox_calc_redu" @click="reduceCalc"></div>
            <span class="priceBox_calc_remain">剩余库存:{{surpluscount}}</span>
        </div>
        <div class="priceBox_foot" >
            <h1 class="priceBox_foot_h">￥{{sum}}</h1>
            <input class="priceBox_foot_btn" type="button" value="预订"  />
        </div>
    </div>

</template>

<script>
    import {changeDataInPriceModel,updatePriceColumn,addCalc, reduceCalc } from '../vuex/actions'
    export default{
        vuex:{
            getters:{
                tips:function({pricemodel}){
                    return pricemodel.tips
                },
                price:function({pricemodel}){
                    return pricemodel.price
                },
                num:function({pricemodel}){
                    return pricemodel.num
                },
                surpluscount:function({pricemodel}){
                    return pricemodel.surpluscount
                },
                sum:function({pricemodel}){
                    return pricemodel.sum
                },
                doType:function({pricemodel}){
                    return pricemodel.doType
                },
                sw_priceColumn_control:function({pricemodel}){
                    return pricemodel.sw_priceColumn_control
                },
                oitems:function({orderitem}){
                    return orderitem.oitems
                }
            },
            actions:{
                changeDataInPriceModel,
                addCalc,
                reduceCalc
            }
        },
        data(){
            return{
                timer:undefined
            }
        },
        watch:{
            "sw_priceColumn_control":function(val,oldVal){
                if(this.doType == 'show'){
                    this.$emit('price-toggle-show')
                }
                else if(this.doType == 'hide'){
                    this.$emit('price-toggle-hide')
                }
                else if(this.doType == 'toggleshow'){
                    this.$emit('price-toggle-toggleshow')
                }
            }
        },
        events:{
            'price-toggle-show':function(){
                var tar = $('.priceBox');
                tar.show().animate({height:"125px"});

            },

            'price-toggle-hide':function(){
                var tar = $('.priceBox'),
                        timer;

                if(timer != undefined){
                    clearTimeout(timer);
                }
                timer = null;
                tar.animate({height:"0px"});

                timer = setTimeout(function(){
                    tar.hide();
                },200);
            },

            'price-toggle-toggleshow':function(){
                var tar = $('.priceBox');

                tar.animate({height:0}).hide();

                tar.show().animate({height:"125px"});

            }
        },

        ready:function(){
            this.changeDataInPriceModel('sw_priceColumn_control');
        }

    }

</script>
