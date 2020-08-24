import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/Home.vue'
import View from '@/View.vue'
import About from '@/About.vue'
Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect: 'view/1',//此属性的设置相当于父路由里面默认展开某个子路由
            children:[
                {
                    //写了/则代表路由上的不用带出父路由 没有写就直接带出是子路由
                    path:'/view/:id',
                    component: View,
                    name: 'view'
                },
                {
                    path:'/about',
                    component: About,
                    name: 'about'
                }
            ]
        }
    ]
})