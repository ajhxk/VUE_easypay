<template>

    <headbar :placename="title" :leftshow="lshow" :rightshow="rshow" :tel="tel">
    </headbar>

    <datenav :dateitems="ditems" ></datenav>


    <order-item ></order-item>

    <price-model></price-model>

</template>

<style></style>


<script>
import headbar from '../../components/headbar.vue'
import datenav from '../../components/dateNav.vue'
import orderitem from '../../components/orderitem.vue'
import pricemodel from '../../components/pricemodel.vue'

import { getDateList } from '../../vuex/actions'

    export default{
        vuex:{
            getters:{
                title:function({header}){
                  return header.option.title
                },

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

        components:{
            'headbar':headbar,

            'datenav':datenav,

            'order-item':orderitem,

            'price-model':pricemodel
        },

        ready:function(){

            this.getDateList();


        }

    }
</script>
