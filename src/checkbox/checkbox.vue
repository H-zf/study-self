<template>
    <div class="parent">
        <!-- <el-checkbox-group v-model="checkListPro">
            <el-checkbox v-for="item in checkList" :key="item.name" :label="item.label" style="display:block;">
                <div>
                    {{item.label}}
                </div>
            </el-checkbox>
        </el-checkbox-group>

        <div v-for="item in checkListPro" :key="item.name">
            {{item}}
        </div> -->
        <left :selectedData="selectedData" :singleDel="singleDel" :multiple="multiple"></left>
        <right :arr="arr" :deldata="deldata" :multipleDel="multipleDel"></right>
    </div>
</template>

<script>
import Left from './left.vue'
import Right from './right.vue'
export default {
    components:{
        Left,
        Right
    },
    data(){
        return {
            arr:[],
            singleDel:'',
            multiple: []
        }
    },
    methods: {
        selectedData(arr){
            this.arr = arr
        },
        deldata(single){
            this.singleDel = single
        },
        multipleDel(multiple){
            this.multiple = multiple
        }
    }
}
</script>

<style>
  .parent {
      display: flex;
  }
  .left {
      width: 200px;
      height: 400px;
  }
  .right {
      width: 200px;
      height: 400px;
  }
</style>