<style src="../assets/css/dateNav.css"></style>

<template>
    <div class="dateMenu">


        <template v-for="(index,dateitem) in dateitems" >

            <div class="dateMenu_box fl" v-bind:class="{'active': index==0, 'week': dateitem.dateStr=='六' || dateitem.dateStr=='日' }" v-on:click="setActive(index)">

                <div class="dateMenu_box_time">{{dateitem.time}}</div>
                <div class="dateMenu_box_num">{{dateitem.dateStr}}</div>
            </div>

        </template>



    </div>
</template>

<script>
    import {searchDayOrder,
            changeDoType,
            changeDataInPriceModel,
            searchHourOrder,
            initHourPrice,
            doLoading
    } from '../vuex/actions'

    export default{
        vuex:{
            getters:{
                oitems:function({orderitem}){
                    return orderitem.oitems
                }
            },
            actions:{
                searchDayOrder,
                changeDoType,
                changeDataInPriceModel,
                searchHourOrder,
                initHourPrice,
                doLoading
            }
        },

        props:{

            dateitems:{
                type:Array,
                default:[]
            },

            chargetypein:{
                type:Number
            },

            venueIdNav:{

            },

            fieldIdNav:{

            }

        },

        ready:function(){

        },

        methods:{
            setActive:function(index){
                var TIME_start = new Date().getTime();//起始时间

                var _this = this,
                    _id = this.dateitems[index].id;
                $('.dateMenu_box').eq(index).addClass('active').siblings().removeClass('active');
                $('#table_Content ul li').removeClass('active');

                if(this.chargetypein == 1){
                    _this.searchDayOrder(_id,true);
                    _this.changeDoType('toggleshow');
                    _this.changeDataInPriceModel('sw_priceColumn_control');
                }
                else if(this.chargetypein ==2){
                    _this.searchHourOrder(_id);
                    _this.initHourPrice();
                }




                _this.doLoading();
                var TIME_ =  new Date().getTime() - TIME_start;//接受时间
                console.log( 'setActive: ' + TIME_ + 'ms');
            }
        }

    }
</script>
