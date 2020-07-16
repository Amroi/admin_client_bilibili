## Ⅰ. 高阶组件withRouter的使用

### 1. 为啥要用呢？

	 withRouter高阶组件，作用是包装非路由组件，返回一个新的组件，新的组件向非路由组件传递三个属性:history/location/match

![image.png](https://i.loli.net/2020/06/27/9co37vPhzLsebVj.png)
	
	 如果我们不使用withRouter高阶函数,而且我们某个组件不是一个Router,组件里面就没有上面这三个属性

### 2. 使用方法
### `a. 头部注入(但好像编辑器要配置内容,因为这是es7的语法)`
![image.png](https://i.loli.net/2020/06/27/nEQxl5W7RMhYszk.png)	

### 推荐这种
### `b. 包裹组件`
![image.png](https://i.loli.net/2020/06/27/tDNyw2bs1kjnVWG.png)


## Ⅱ. 高阶函数概念

    1). 一类特别的函数
        a. 接受函数类型的参数
        b. 返回值是函数
    2). 常见例子
        a. 定时器：setTimeout() / setInterval()
        b. Promise：Promise(() => {}) then( value => {} , error => {})
        c. 数据遍历相关的方法：forEach()/filter()/map()/reduce()/find()/findIndex()
        d. 函数对象的bind()
        e. From.create()
    3). 高阶函数更新动态，更加具有扩展性

### 2. 高阶组件

    1). 本质就是一个函数
    2). 接收一个组件(被包装组件)，返回一个新的组件(包装组件)，包装组件会向被包装组件传入特定属性
    3). 作用：扩展组件的功能
    4). 高阶组件也是高阶函数：接收一个组件函数，返回是一个新的组件函数


