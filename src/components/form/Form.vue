<template>
    <div>
        <form>
            //将所有的item丢进form标签中
            <slot></slot>
        </form>
    </div>
</template>

<script>
export default {
    name:'iForm',
    provide(){
        return {
            form: this
        }
    },
    props: {
        model: {
            type: Object
        },
        rules: {
            type: Object
        }
    },
    data() {
        return {
            fields: []
        }
    },
    created() {
        this.$on('on-form-item-add',(field) => {
            if(field) this.fields.push(field)
            // 存进去的是this整个对象
        })
        this.$on('on-form-item-remove',(field) => {
            if(field.prop) this.fields.splice(this.fields.indexOf(field),1)
        })
    },
    methods: {
        validate(callback){
            return new Promise(resolve => {
                let value = true
                let count= 0
                this.fields.forEach(field => {
                    field.validate('',errors => {
                        if(errors){
                            valid = false
                        }
                        if(++count === this.fields.length){
                            resolve(valid)
                            if(typeof callback === 'function'){
                                callback(valid)
                            }
                        }
                    })
                })
            })
        }
    }
}
</script>