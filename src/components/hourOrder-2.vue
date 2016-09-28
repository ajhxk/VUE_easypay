<style src="../assets/css/hourOrder.css"></style>

<template>
    <div class="order_Table" style="margin-bottom:50px">

        <div id="table_Head" class="table_box table_box_Head" >
            <ul class="table_box_head">
                <li v-for="(index, timeblock) in timeLine">{{timeLine[index]}}
            </ul>
        </div>

        <div id="table_Column" class="table_box table_box_Column"">

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
                        <li v-if="i!=0 && priceBlock[index][i-1] == 'noval'" class="text_hide">-
                        <!-- 打包块除第一格 -->
                        <li v-if="i!=0 && priceBlock[index][i-1] == 'pg'" class="text_hide hide">pg
                        <!-- 非打包 -->
                        <li v-if="i!=0 && (priceBlock[index][i-1] != 'noval') && (priceBlock[index][i-1].hours==1)"
                            class="j-sale"
                            addr="{{index}}*{{i-1}}"
                    >{{priceBlock[index][i-1].price}}
                        <!-- 打包 -->
                        <li v-if="i!=0 && (priceBlock[index][i-1] != 'noval') && (priceBlock[index][i-1].hours > 1 )"
                            v-bind:class="{
                            'W2':(priceBlock[index][i-1].hours==2),
                            'W3':(priceBlock[index][i-1].hours==3),
                            'W4':(priceBlock[index][i-1].hours==4)
                            }"
                            class="j-sale"
                            addr="{{index}}*{{i-1}}"
                    >
                            {{priceBlock[index][i-1].price}}


                    </template>
                </ul>
            </template>
        </div>
    </div>

</template>

<script>

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
                          _hours = fields[k].hours;
                      priceBlock[H][W] ={
                          price:_price,
                          hours:_hours
                      };
                      //打包价格标注
                      if(fields[k].hours>1){
                          for (var i=1;i<fields[k].hours;i++){
                              priceBlock[H][W+i] = 'pg'
                          }
                      }
                  }

                  return priceBlock;
              }
          }
        },

        watch:{
            "timeLine":function(val,oldVal){
                console.log(this.timeLine);
                console.log(this.fieldLine)
                console.log(this.priceBlock)
                $('.order_Table').css({"height":$('#table_Content').height()});
                $('.j-sale').on('click',function(){
                $('.j-hourPriceBlock').toggleClass('hide');
                });
            }
        },

        ready:function(){
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

        }
    }
</script>
