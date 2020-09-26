<template>
    <div class="left">
        <el-input v-model="input" @change="change" placeholder="请输入内容"></el-input>
        <el-checkbox-group v-model="checkListPro">
            <el-checkbox v-for="item in checkList" :key="item.name" :label="item.label" style="display:block;">
                <div>
                    {{item.label}}
                </div>
            </el-checkbox>
        </el-checkbox-group>
    </div>
</template>
<script>
export default {
    props:{
        selectedData:{
            type:Function
        },
        singleDel:{
            type:String
        },
        multiple:{
            type:Array
        }
    },
    data(){
        return {
            checkList: [
                {
                    label:'复选框1',
                    name:'a'
                },
                {
                    label:'复选框2',
                    name:'b'
                },
                {
                    label:'复2框',
                    name:'y'
                },
                {
                    label:'复选框3',
                    name:'c'
                },
                {
                    label:'复选框4',
                    name:'d'
                },
                {
                    label:'复选框5',
                    name:'e'
                },
                {
                    label:'复选框6',
                    name:'f'
                }
            ],
            checkListPro: [],
            input:''
        }
    },
    methods: {
        change(val){
            if (!val) {
                this.checkList = [
                        {
                        label:'复选框1',
                        name:'a'
                    },
                    {
                        label:'复选框2',
                        name:'b'
                    },
                    {
                        label:'复选框3',
                        name:'c'
                    },
                    {
                        label:'复选框4',
                        name:'d'
                    },
                    {
                        label:'复选框5',
                        name:'e'
                    },
                    {
                        label:'复选框6',
                        name:'f'
                    }
                ]
            } else {
                this.checkList = this.checkList.filter(item => {
                    return item.label.includes(val)
                })
            }
        }
    },
    watch:{
        checkListPro(val){
            this.selectedData(val)
        },
        singleDel(val){
            this.checkListPro = this.checkListPro.filter(item => item !== val)
        },
        // multiple(val){
        //     if(val.length){
        //         let newArr = []
        //         val.forEach(key => {
        //             this.checkListPro.forEach((item,index) => {
        //                 if(item === key){
        //                     this.checkListPro.splice(index,1)
        //                 }
        //             })
        //         })
        //         this.checkListPro = this.checkListPro.filter(item => !item.includes('isrepeat'))
        //     }
        // }
    }
}
</script>
<style scoped>
    .left {
        width: 200px;
        height: 400px;
    }
</style>