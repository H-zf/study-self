<template>
    <div>
        <input type="text" :value="currentValue" @input="handleInput" @blur="handleBlur">
    </div>
</template>

<script>
import Emitter from '@/components/emitter'
export default {
    name:'iInput',
    props: {
        value: {
            type: String,
            default :''
        }
    },
    data(){
        return {
            currentValue: this.value //props优先于data初始化 此方法不会存在数据的双向绑定
        }
    },
    watch: {
        value(val){
            this.currentValue = val
        }
    },
    methods: {
        handleBlur(){
            this.dispatch('iFormItem','on-form-blur',this.currentValue)
        },
        handleInput(e){
            const value = e.target.value
            this.currentValue = value
            this.$emit('input',value) // 此时的值是在这里传递到了about组件中
            this.dispatch('iFormItem','on-form-change',value)
        }
    }
}
</script>