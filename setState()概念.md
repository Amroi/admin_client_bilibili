### 1. setState()用法及概念
	1). 例子文件地址：E:\dev\web\other_people_project\companies-react-guli-master\react-guli\code\admin-client_final\test
	2). 概念：setState() 将对组件 state 的更改排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件

#### 一. 基本用法(实例)：
	Ⅰ. 实现内容：想让初始值count增加1。
	1). 函数方式(语法：setState(updater, [callback]) )
	参数一为带有形式参数的updater函数：(state, props) => stateChange
	a. 本例子的做法：
	this.setState(state => ({count: state.count+1}))

	2). 对象方式(语法：setState(stateChange[, callback]) )
	a. 本例子的做法：
	const count = this.state.count + 1;
	this.setState({ count })

	Ⅱ. 总结：
	1). 如果新状态依赖于原状态 ==> 使用函数方式(即在原状态上动手脚)
	
	2). 如果新状态不依赖于原状态 ==> 使用对象方式(即变成另外一个对象)
	
	3). 如果需要在setState()后获取最新的状态数据,在第二个callback函数中读取。

#### 二. 更新状态异步同步的问题（上述总结第三点的延伸）
	1). 执行setState()的位置(即第一个外层的函数是什么类型)?
          在react控制的回调函数中: 生命周期方法中 / react事件监听回调
          非react控制的异步回调函数中: 定时器回调 / 原生事件监听回调 / promise回调 /...
    
	2). 异步 OR 同步?
          react控制的相关回调中: 异步
			(即setState()方法后当前方法中仍然为原状态数据,
			在重新render之后变为新状态数据)
          非react控制的异步回调中: 同步
		   （在执行更改语句后(console.log())马上能得到新状态数据)

	3). 例子 ==> 到文件位置查看

	4). 一个回调中多次调用render的能得到什么结果?
	【前提是在react控制的回调中因为它不能马上得到新数据】	
	a. 例子 ==> 到文件位置查看
	b. 多次调用, 如何处理?
          Ⅰ. setState({}): 合并更新一次状态, 只调用一次render()更新界面 
				---状态更新和界面更新都合并了
          Ⅱ. setState(fn): 更新多次状态, 但只调用一次render()更新界面  
				---状态更新没有合并, 但界面更新合并了
	c. 总结：
	官网有句话能够很好的解析。
	updater 函数中接收的 state 和 props 都保证为最新。

#### 三. 更多详情见例子文件地址