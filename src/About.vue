<template>
    <div>
        <vue-form :model="formValidate" :rules="ruleValidate">
            <vue-form-item label="用户名" prop="name">
                <vue-input v-model="formValidate.name"></vue-input>
            </vue-form-item>
            <vue-form-item label="邮箱" prop="mail">
                <vue-input v-model="formValidate.mail"></vue-input>
            </vue-form-item>
        </vue-form>
    </div>
</template>

<script>
    import Form from '@/components/form/Form.vue'
    import FormItem from '@/components/form/FormItem.vue'
    import Input from '@/components/form/Input.vue'
    export default {
        components:{
            VueForm: Form,
            VueFormItem: FormItem,
            VueInput: Input
        },
        data(){
            return {
                formValidate: {
                    name:'',
                    mail:''
                },
                ruleValidate: {
                    name:[
                        {required:true,message:'用户名不能为空',trigger:"blur"}
                    ],
                    mail:[
                        {required:true,message:'邮箱不能为空',trigger:'blur'},
                        {type:"email",message:"邮箱的格式不正确",trigger:'blur'}
                    ]
                }
            }
        }
    }
</script>