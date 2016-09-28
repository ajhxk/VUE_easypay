<style>
    .loading_mask{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #333333;
        opacity: 0.5;
        z-index: 300;
        display: none;
    }
    .loading_block{
        width: 100px;
        height: 100px;
        background-image:url("../assets/img/loading.gif");
        background-size: 100px 100px;
        position: fixed;
        top:50%;
        left: 50%;
        margin: -50px 0 0 -50px;
        z-index: 301;
        
    }
    .show{display: block}
</style>
<template>
    <div class="loading_mask" :class="{'show':(isLoading === true)}">
        <div class="loading_block"></div>
    </div>
</template>

<script>

    export default{
        vuex:{
            getters:{
                isLoading:function({loading}){
                    return loading.isLoading
                }
            }
        }
    }
</script>
