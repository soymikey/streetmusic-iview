// 自动加载 global 目录下的 .js 结尾的文件
const componentsContext = require.context('./', true, /\.js$/)
let obj = {}
let componentConfig = {}
componentsContext.keys().forEach(component => {

    componentConfig = { ...componentsContext(component) }


    // obj = { ...obj, ...componentConfig }
    // /**
    // * 兼容 import export 和 require module.export 两种规范
    // */
    // const ctrl = componentConfig.default || componentConfig
    // Vue.component(ctrl.name, ctrl)
})

console.log('componentConfig', Object.keys(componentConfig));
export { componentConfig } 