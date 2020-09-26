<template>
    <div class="right">
        <el-input v-model="input" @change="change" placeholder="请输入内容"></el-input>
        <div v-for="item in needdata" :key="item">
            {{item}}
            <span style="float:right;cursor:pointer;" @click="click(item)">x</span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        arr:{
            type: Array
        },
        deldata: {
            type: Function
        },
        multipleDel: {
            type: Function
        }
    },
    data(){
        return {
            needdata:[],
            saveData:[],
            input:'',
            saveSelectList: []
        }
    },
    methods: {
        click(item){
            console.log(item)
            console.log(this.needdata)
            if(this.input !== ''){
                this.needdata = this.needdata.filter(key => key !== item)
            }
            this.deldata(item)
        }, 
        change(val){
            if(this.needdata.length && val !== ''){
                this.needdata = this.needdata.filter(item => item.includes(val))
            }

            if(val === ''){
                this.needdata = this.saveSelectList
            }
        },
        saveSelectData(val){
            this.saveData.push(val)
        }
    },
    watch:{
        arr(val){
            if(this.input === ''){
                this.needdata = val
            } else {
                this.saveSelectList = val
            }
        }
    }
}
</script>
<style scoped>
    .right {
        width: 200px;
        height: 400px;
    }
</style>