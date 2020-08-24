<template>
    <div>
        <h1>hello world</h1>
        <div class="router-css">
            <router-link :to="{name:'view',params:{id:'1'}}">首页</router-link>
            <router-link :to="{name: 'about'}">关于</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>