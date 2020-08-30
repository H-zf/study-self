<template>
    <div>
        <label v-if="label">{{label}}</label>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Emitter from '@/components/emitter'
export default {
    name:'iFormItem',
    mixins: [Emitter],
    inject: ['form'],
    props: {
        // label是组件中需要显示的文字
        label: {
            type: String,
            default: ''
        },
        // prop是需要做校验的时候需要判断的字段
        prop: {
            type: String
        }
    },
    methods: {
        setRules(){
            this.$on('on-form-blur',this.onFieldBlur)
            this.$on('on-form-change',this.onFieldChange)
        },
        getRules(){
            let formRules = this.form.rules
            formRules = formRules ? formRules[this.prop] : []
            return [].concat(formRules || [])
        },
        getFilteredRule(trigger){
            // 存在trigger就判断是不是有满足条件的 
            // 如果不存在trigger就取全部的
            const rules = this.getRules()
            return rules.filter(item => !item.trigger || rule.trigger.indexOf(trigger) !== -1 ) 
        },
        validate(trigger,callback = function(){}){
            let rules = this.getFilteredRule(trigger)
            if(!rules||rules.length === 0){
                return true //终止会返回一个true
            }

            let descriptor = {}
            descriptor[this.prop] = rules
            const validate = new AsyncValidator(descriptor)
            let model = {}
            model[this.prop] = this.fieldValue
            validate.validate(model,{firstFields: true},errors => {
                this.validateState = !errors ? 'success' : 'errors'
                this.validateMessage = errors ? errors[0].message : ''
                callback(this.validateMessage)
            })
        },
        onFieldBlur(){
            this.validate('blur')
        },
        onFieldChange(){
            this.validate('change')
        }
    },
    data(){
        return {
            validateState: '',//校验状态
            validateMessage: '' //校验不通过的提示
        }
    },
    computed:{
        fieldValue(){
            return this.form.model[this.prop] //获取校验的数据
        }
    },
    mounted() {
        //   父子组件的执行顺序先弄明白
        // 父组件要收集子组件的数据
        if(prop){
            this.dispatch("iForm",'on-form-item-add',this)
            this.setRules()
        }
    },
    beforeDestory(){
        this.dispatch('iForm','on=form-item-remove',this)
    }
}
</script>