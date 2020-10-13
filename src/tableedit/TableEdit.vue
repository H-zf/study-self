<template>
    <div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
            prop="date"
            label="日期"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="地址">
            <template slot-scope="scope">
                <div>
                    <span v-if="!scope.row.edit" @click="editAddress(scope.row)">{{scope.row.address}}</span>
                    <el-input v-else ref="input" @blur="inputblur(scope.row)" v-model="scope.row.address" placeholder="请输入内容"></el-input>
                </div>
            </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          edit: false
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods:{
        editAddress(row){
            row.edit = true
            this.$nextTick(() => {
                this.$refs.input.focus()
            })
        },
        inputblur(row){
            row.edit = false
        }
    }
  }
</script>