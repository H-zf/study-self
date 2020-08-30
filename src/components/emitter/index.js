function broadcast(componentName,eventName,params){
    this.$children.forEach(child => {
        const name = child.$options.name
        if(name===componentName){
            // apply后面的都是一些参数
            child.$emit.apply(child,[eventName].concat(params))
        } else {
            // 这个broadcast相当于重新被调用 并且传递了三个参数给到这个方法
            // 数组中的合并
            // [1,2].concat([{a:'2'}])
            // (3) [1, 2, {…}]
            //     0: 1
            //     1: 2
            //     2: {a: "2"}
            //     length: 3
            broadcast.apply(child,[componentName,eventName].concat([params]))
        }
    })
}
export default {
    methods: {
        dispatch(componentName,eventName,params){
            let parent = this.$parent || this.$root
            let name = parent.$options.name
            // ||语句  前面为false再去判断后面的语句  为ture不判断
            // parent存在 并且 name存在的时候来执行||语句判断是不是与componentName相等 什么时候终止不执行  是当你的name为false的时候 如果你的name存在且不等于componentname的时候来执行
            while(parent && (!name || name !== componentName)){
                parent = parent.$parent
                if(parent){
                    name = parent.$options.name
                }
            }
            // 上面的操作是为了找到praent和name
            if(parent){
                parent.$emit.apply(parent,[eventName].concat(params))
            }
        },
        broadcast(componentName,eventName,params){
            broadcast.call(this,componentName,eventName,params)
        }
    }
}