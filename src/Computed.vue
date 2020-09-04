<template>
    <div>
        <div class="header">
            修改computed的值 当你的值既需要计算 又需要使用input进行修改的时候我们是可以使用computed的get 和 set
        </div>
        <!-- 桌腿的数是deskleg -->
        <input type="range" v-model="deskleg"> {{ deskleg }}

        <!-- 能做桌子的数量是多少 -->
        <input type="text" v-model="desk" @input="update">{{ desk }}
    </div>
</template>

<script>
export default {
    data(){
        return {
            deskleg: 0
        }
    },
    computed: {
        desk: {
            get(){
                if(this.deskleg < 4) return 0
                return Math.floor(this.deskleg / 4)
            },
            set(value){
                if(value > 25) return 100
                this.deskleg = value * 4
            }
        }
    },
    methods: {
        update(e){
            if(e.target.value > 25) return (this.desk = 25)
            this.desk = e.target.value
        }
    }
}
</script>

<style>

</style>