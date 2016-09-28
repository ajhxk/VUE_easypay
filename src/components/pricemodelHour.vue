<style src="../assets/css/pricemodelHour.css"></style>
<template>
    <div class="j-hourPriceBlock priceModel_H " :class="{'hide':(orderBox.length==0)}">
        <ul class="priceBlockBox">

            <li class="priceBlock" v-for="(index, order) in orderBox"
                data-W = {{order.w}}
                data-H = {{order.h}}
                @click="priceSwitch(order.w,order.h,order.hours,order.price)"
            >
                <div class="price_venueName">{{order.venueName}}</div>
                <div class="price_venueTime">{{order.venueTime}}</div>
                <div class="price_pack" :class="{'text_hide':(order.package !== '打包时段')}">打包时段</div>
        </ul>
        <div class="priceTextBox">
            <span class="priceTextBox_text">￥ {{priceSum}}</span>
            <input class="priceTextBox_btn" type="button" value="预定">
        </div>
    </div>
</template>

<script>
    import {delHourOrder,getHourPosition,delHourCount} from '../vuex/actions'

    export default{
        vuex:{
            getters:{
                orderBox:function({pricemodelHour}){
                    return pricemodelHour.hourOitems
                },
                priceSum:function({pricemodelHour}){
                    return pricemodelHour.priceSum
                }
            },
            actions:{
                delHourOrder,
                getHourPosition,
                delHourCount
            }
        },

        methods:{
            'priceSwitch':function(W,H,hours,price){
                var _this = this;
                var sendData={
                    w:W,
                    h:H,
                    price:price
                };
                _this.delHourOrder(sendData);
                _this.getHourPosition(sendData);
                _this.delHourCount(hours);
            }
        }

    }
</script>
