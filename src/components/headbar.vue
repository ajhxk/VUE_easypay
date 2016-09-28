<style src="../assets/css/headbar.css"></style>

<template>
    <header class="headbar">
        {{placename}}
        <a class="headbar_left gobackIco" href="#" @click="historyBack" v-if="leftshow"></a>

        <a class="headbar_right phoneIco" href="tel:{{tel}}" v-if="rightshow"></a>
    </header>
</template>

<script>

    export default{

        props:{

            placename:{
                type:String,

                default:'TITLE'
            },

            leftshow:{
                type:Boolean,
                default:true
            },

            rightshow:{
                type:Boolean,
                default:true
            },

            tel:{
                type:String
            }

        },

        methods:{
            historyBack:function(){
                history.go(-1)
            }
        }
    }
</script>
