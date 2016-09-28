<template>


    <headbar :placename="title" :leftshow="lshow" :rightshow="rshow" :tel="tel">
    </headbar>

    <datenav :dateitems="ditems" :chargetypein="chargetype" venue-id-nav="venueid" field-id-nav="fieldid"></datenav>

    <hour-order></hour-order>

    <pricemodel-h></pricemodel-h>

    <loading></loading>


</template>

<style></style>


<script>
    import headbar from '../../components/headbar.vue'
    import datenav from '../../components/dateNav.vue'
    import hourOrder from '../../components/hourOrder.vue'
    import loading from '../../components/loading.vue'
    import pricemodelH from '../../components/pricemodelHour.vue'

    import { getDateList } from '../../vuex/actions'

    export default{
        vuex:{
            getters:{

                lshow:function({header}){
                    return header.option.leftshow
                },

                rshow:function({header}){
                    return header.option.rightshow
                },

                tel:function({header}){
                    return header.option.tel
                },

                ditems:function({dateNav}){
                    return dateNav.dateitems
                }

            },

            actions:{
                getDateList
            }

        },

        props:["chargetype","title","venueid","fieldid"],

        components:{
            'headbar':headbar,

            'datenav':datenav,

            'hour-order':hourOrder,

            'pricemodel-h':pricemodelH,

            'loading':loading
        },

        ready:function(){
            var _this = this;
            var orderType =  _this.chargetype;
            this.getDateList(orderType,_this.venueid,_this.fieldid);


        }

    }
</script>
