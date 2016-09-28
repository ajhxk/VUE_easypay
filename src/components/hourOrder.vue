<style src="../assets/css/hourOrder.css"></style>

<template>

    <div class="order_Table" :class="{'mb145':(hoursSum.hours>0)}">

        <div id="table_Head" class="table_box table_box_Head" >
            <ul class="table_box_head">
                <li v-for="(index, timeblock) in timeLine">{{timeLine[index]}}
            </ul>
        </div>

        <div id="table_Column" class="table_box table_box_Column">

            <template v-for="(index,fieldblock) in fieldLine">
                <ul  v-bind:class="{'table_box_second': index==0}">
                    <li>{{fieldLine[index]}}
                </ul>
            </template>
        </div>

        <div id="table_Content" class="table_box table_box_Content" >
            <ul class="table_box_head">
                <li v-for="(index, timeblock) in timeLine">{{timeLine[index]}}
            </ul>

            <template v-for="(index,fieldblock) in fieldLine">
                <ul  v-bind:class="{'table_box_second': index==0}">

                    <template v-for="(i,timeblock) in timeLine">
                        <!-- 场地号 -->
                        <li v-if="i==0">{{fieldLine[index]}}
                        <!-- 不显示价格 -->
                        <li v-if="i!=0 && priceBlock[index][i-1] == 'noval'" class="text_hide out_sale">-
                        <!-- 打包块除第一格 -->
                        <li v-if="i!=0 && priceBlock[index][i-1] == 'pg'" class="text_hide hide">pg


                        <!-- 非打包 -->
                        <li v-if="i!=0
                            && (priceBlock[index][i-1] != 'noval')
                            && (priceBlock[index][i-1].hours==1)
                            &&(priceBlock[index][i-1].stopSelling==0)
                            && (priceBlock[index][i-1].stockStatus==1) "
                            class="j-sale on_sale"

                            data-W = "{{i-1}}"
                            data-H = "{{index}}"
                            data-price = "{{priceBlock[index][i-1].price}}"
                            data-hours = "{{priceBlock[index][i-1].hours}}"
                            data-startHour = "{{priceBlock[index][i-1].startHour}}"
                            @click="saleBlockDo"
                    >{{priceBlock[index][i-1].price}}
                        <!-- 打包 -->
                        <li v-if="
                            i!=0
                            && (priceBlock[index][i-1] != 'noval')
                            && (priceBlock[index][i-1].hours > 1 )
                            &&(priceBlock[index][i-1].stopSelling==0)
                            && (priceBlock[index][i-1].stockStatus==1)"
                            v-bind:class="{
                            'W2':(priceBlock[index][i-1].hours==2),
                            'W3':(priceBlock[index][i-1].hours==3),
                            'W4':(priceBlock[index][i-1].hours==4)
                            }"
                            class="j-sale on_sale"

                            data-W = "{{i-1}}"
                            data-H = "{{index}}"
                            data-price = "{{priceBlock[index][i-1].price}}"
                            data-hours = "{{priceBlock[index][i-1].hours}}"
                            data-startHour = "{{priceBlock[index][i-1].startHour}}"
                            @click="saleBlockDo($event)"
                    >{{priceBlock[index][i-1].price}}


                        <!-- 非打包 停售或者库存异常 -->
                        <li v-if="
                            i!=0
                            && (priceBlock[index][i-1] != 'noval')
                            && (priceBlock[index][i-1].hours==1)
                            && (priceBlock[index][i-1].stopSelling==1)

                            || i!=0
                            && (priceBlock[index][i-1] != 'noval')
                            && (priceBlock[index][i-1].hours==1)
                            && (priceBlock[index][i-1].stockStatus!=1)
                            "

                            class="out_sale"

                            data-W = "{{i-1}}"
                            data-H = "{{index}}"
                            data-price = "{{priceBlock[index][i-1].price}}"
                            data-hours = "{{priceBlock[index][i-1].hours}}"
                            data-startHour = "{{priceBlock[index][i-1].startHour}}"
                        >{{priceBlock[index][i-1].price}}

                        <!-- 打包 停售或者库存异常 -->
                        <li v-if="
                            i!=0
                            && (priceBlock[index][i-1] != 'noval')
                            && (priceBlock[index][i-1].hours>1)
                            && (priceBlock[index][i-1].stopSelling==1)

                            || i!=0
                            && (priceBlock[index][i-1] != 'noval')
                            && (priceBlock[index][i-1].hours>1)
                            && (priceBlock[index][i-1].stockStatus!=1)
                            "
                            v-bind:class="{
                            'W2':(priceBlock[index][i-1].hours==2),
                            'W3':(priceBlock[index][i-1].hours==3),
                            'W4':(priceBlock[index][i-1].hours==4)
                            }"
                            class="out_sale"

                            data-W = "{{i-1}}"
                            data-H = "{{index}}"
                            data-price = "{{priceBlock[index][i-1].price}}"
                            data-hours = "{{priceBlock[index][i-1].hours}}"
                            data-startHour = "{{priceBlock[index][i-1].startHour}}"
                        >{{priceBlock[index][i-1].price}}

                    </template>
                </ul>
            </template>
        </div>
    </div>
</template>

<script>
    import {addHourOrder,delHourOrder,delHourCount} from '../vuex/actions'

    export default{
        vuex:{
          getters:{
              startTime:function({hourOrder}){
                  return hourOrder.hourOitems.startTime
              },
              endTime:function({hourOrder}){
                  return hourOrder.hourOitems.endTime
              },
              timeLine:function({hourOrder}){
                  var start = Number(hourOrder.hourOitems.startTime.split(':')[0]),
                      end = Number(hourOrder.hourOitems.endTime.split(':')[0]),
                      timeLine = [];

                      for(var i=start; i<=end; i++){
                          timeLine.push(i+':00');
                      }
                  return timeLine

              },
              fieldLine:function({hourOrder}){
                  var fieldCounts = hourOrder.hourOitems.fieldCounts,
                      fieldLine = [];
                      for(var i=1; i<=fieldCounts; i++){
                            fieldLine.push(i+'号场');
                      }
                  return fieldLine;
              },
              priceBlock:function({hourOrder}){
                  var TIME_start = new Date().getTime();//起始时间

                  //创建价格存放容器（二维数组）
                  var start = hourOrder.hourOitems.startTime.split(':')[0],
                      end = hourOrder.hourOitems.endTime.split(':')[0],
                      fieldCounts = hourOrder.hourOitems.fieldCounts,
                      priceBlock = [],
                      timenum = end - start;

                  for(var j=0; j<fieldCounts; j++){
                      priceBlock[j] = [];
                      for(var i=0; i<timenum; i++){
                          priceBlock[j][i] = 'noval';
                      }
                  }

                  //向二维数组中填价格
                  var fields = hourOrder.hourOitems.fields,
                      fieldsLen = fields.length;
                  for (var k=0;k<fieldsLen;k++){
                      var W = fields[k].startHour- start,
                          H = fields[k].fieldNo - 1,
                          _price = fields[k].price,
                          _startHour = fields[k].startHour,
                          _hours = fields[k].hours,
                          _stopSelling = fields[k].stopSelling,
                          _stockStatus = fields[k].stockStatus;
                      priceBlock[H][W] ={
                          price:_price,
                          startHour:_startHour,
                          hours:_hours,
                          stopSelling:_stopSelling,
                          stockStatus:_stockStatus
                      };
                      //打包价格标注
                      if(fields[k].hours>1){
                          for (var i=1;i<fields[k].hours;i++){
                              priceBlock[H][W+i] = 'pg'
                          }
                      }
                  }
                    var TIME_ =  new Date().getTime() - TIME_start;//接受时间
                  console.log( 'priceBlock getter: ' + TIME_ + 'ms');

                  return priceBlock;
              },
              closeOrder:function({hourOrder}){
                  return hourOrder.position
              },
              hoursSum:function({pricemodelHour}){
                  return pricemodelHour.hoursSum
              }
          },
          actions:{
              addHourOrder,
              delHourOrder,
              delHourCount
          }
        },

        watch:{
            "timeLine":function(val,oldVal){
                var TIME_start = new Date().getTime();//起始时间
                $('.order_Table').css({"height":$('#table_Content').height()});
                var TIME_ =  new Date().getTime() - TIME_start;//接受时间
                console.log( 'timeLine watch: ' + TIME_ + 'ms');
            },

            "closeOrder":function(val,oldVal){
                var _W = Number(val.w),
                    _H = Number(val.h);

                var $onSale = jQuery('.order_Table #table_Content ul li.on_sale'),
                    len = $onSale.length;

                for(var i=0; i<len; i++){
                    var tar = jQuery($onSale[i]);


                    if( (Number(tar.attr('data-w')) == _W) && (Number(tar.attr('data-h')) == _H) ){
                        tar.removeClass('active');
                    }
                }

            }


        },

        ready:function(){
            var TIME_start = new Date().getTime();//起始时间
            var $tableContent = $('#table_Content'),
                    $tableHead = $('#table_Head'),
                    $tableColumn = $('#table_Column');

            $tableContent.scroll(
                    function(){
                        $tableHead.scrollLeft($tableContent.scrollLeft());
                        $tableColumn.scrollTop($tableContent.scrollTop());
                    }
            );

            //table高度控制
            !function(){
                var winH = $(window).height(),
                    tableColumnH = winH - 126,
                    tableContentH = winH - 95;
                $('#table_Column').css({"max-height":tableColumnH});
                $('#table_Content').css({"max-height":tableContentH});
            }();
            var TIME_ =  new Date().getTime() - TIME_start;//接受时间
            console.log( 'ready: ' + TIME_ + 'ms');
        },

        methods:{
            "saleBlockDo":function(e){
                var _this = this,
                    $this = jQuery(e.currentTarget);


                var _price = Number($this.attr('data-price')),
                    _hours = Number($this.attr('data-hours')),
                    _startHour = Number($this.attr('data-startHour')),
                    _W = Number($this.attr('data-w')),
                    _H = Number($this.attr('data-h')),
                    _place = Number(_H)+ 1,
                    _package,
                    _venueTime;

                var _endHour = _startHour + _hours,
                    _venueTime = _startHour + ':00-'+_endHour+':00';

                (_hours == 1) && (_package='');
                (_hours >  1) && (_package='打包时段');


                var pData = {
                    w:_W,
                    h:_H,
                    venueName:_place+'号场',
                    venueTime:_venueTime,
                    package:_package,
                    price:_price,
                    hours:_hours
                }


                $this.toggleClass('active');

                if($this.hasClass('active')){
                    _this.addHourOrder(pData)
                }else{
                    _this.delHourOrder(pData);
                    _this.delHourCount(_hours);
                }

                if(_this.hoursSum.hours > 4){
                    $this.removeClass('active');
                    _this.delHourCount(_hours);
                    _this.delHourOrder(pData);
                    alert('只能预订四个场地！');
                }
            }
        }
    }
</script>
