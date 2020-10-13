<template>
    <div>
        <ul>
            <li v-for="(item,index) in node" :key="item.key" @click="clickNode(item,$event)">
                <span v-for="(k,i) in getNum(item.level)" :key="k"> {{i === 0 ? '|' : '——'}}</span>{{item.name}}
                    <ul v-if="item.children" :class="{hide:!item.expand}">
                        <node
                            :node="item.children"
                        ></node>
                    </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'node',
    props:{
        node:{
            type: Array
        }
    },
    methods: {
        getNum(num){
            let arr = []
            return arr.length = num + 1
        },
        clickNode(item,e){
            e.stopPropagation()
            if(!item.children){
                return false
            }
            item.expand = !item.expand
        }
    }
}
</script>

<style scoped>
    ul,li {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    li {
        list-style: none;
    }
    .hide {
        display: none;
    }
</style>