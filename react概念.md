### 1.1 react 生命周期方法

    1). componentWillMount
        a. 在第一次render()之前执行一次，为第一次render()准备数据(是同步准备)。
       （一些数据应该放在这里准备，放在render中会多次渲染）
    2). componentDidMount
      	a. 第一次render()之后执行一次，一般在这个生命周期函数内执行异步操作。
      	如：发送ajax请求/启动定时器。

    （下面这两个好像用的比较少。）
    3). componentWillReceiveProps
      	a. 会在已挂载的组件接收新的 props 之前被调用。这个方法在初始化(第一次)render时不会被调用。(需要更新状态以响应prop更改)
    4). shouldComponentUpdate
      	a. 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。
      	b. 可以在你确认不需要更新组件时使用。

    5). componentWillUpate
      	a. 在组件接收到新的props或者state但还没有渲染时被调用(更新前的准备操作，完成后才进行更新)。在初始化render时不会被调用。
    6). componentDidUpdate
      	a. 在组件完成更新后立即调用(React 可确保在用户看到更新的 UI 之前完成更改值，虽然比render迟一点)。在初始化render时不会被调用。(异步)

    7). componentWillUnmount
      	a. 在组件从 DOM 中移除之前立刻被调用。当前组件卸载(死亡)之前调用。
       （通常用来卸载计时器啊等等）

### 1.2 参考图示(改变分自身 state 发生改变和父组件 props)

![image.png](https://i.loli.net/2020/07/13/s1ntvR8lepTI3BY.png)

### 2. componentDidUpdate vs componentWillReceiveProps

    1). 区别
    	a. 在React生命周期调用时机
      	Ⅰ. componentWillReceiveProps在组件接受新的props之前触发
      	Ⅱ. componentDidUpdate在组件接受新的props之后触发
      	(如果你想在组件收到新props之前做一些事情，你可以使用componentWillReceiveProps，如果你想在收到新的props或状态后做某事，你可以使用componentDidUpdate)

    	b. 更新的方式
      	Ⅰ. componentWillReceiveProps更新状态是同步的
      	Ⅱ. componentDidUpdate更新状态是异步的
      	(这点区别非常重要，也是componentWillReceiveProps生命周期被废弃的重要原因(可能导致某些问题))
        **: 所以推荐使用componentDidUpdate

### 3.async 和 await

    1）作用？
    a. 简化promise对象的使用：不用再使用then()来指定成功/失败的回调函数，
    以同步编码（没有回调函数了）方式实现异步流程

    2）哪里写await？
    a. 在返回promise的表达式左侧写await：不想要promise，
    想要promise异步执行的成功的value数据

    3）哪里写async？
    a. await所在函数（最近的）定义的左侧写async
