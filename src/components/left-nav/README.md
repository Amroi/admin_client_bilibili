## 说一个高阶组件withRouter的使用

## `为啥要用呢？`

### withRouter高阶组件，作用是包装非路由组件，返回一个新的组件，新的组件向非路由组件传递三个属性:history/location/match

![image.png](https://i.loli.net/2020/06/27/9co37vPhzLsebVj.png)
### 如果我们不使用withRouter高阶函数,而且我们某个组件不是一个Router,组件里面就没有上面这三个属性

## `使用方法`
### `1.头部注入(但好像编辑器要配置内容,因为这是es7的语法)`
![image.png](https://i.loli.net/2020/06/27/nEQxl5W7RMhYszk.png)	

### 推荐这种
### `2.包裹组件`
![image.png](https://i.loli.net/2020/06/27/tDNyw2bs1kjnVWG.png)