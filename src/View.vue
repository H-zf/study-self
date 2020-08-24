<template>
    <div>
        <div v-if="$route.params.id === '1'">
            这是传递值为1的界面
        </div>
        <div v-else>
            这是没有传递值的页面
        </div>
    </div>
</template>

<script>

</script>

<style>

</style>