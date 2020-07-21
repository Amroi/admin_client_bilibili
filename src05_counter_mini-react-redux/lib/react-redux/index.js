/*
react-redux库的主模块(实现自定义react-redux)
	1). react-redux 向外暴露了 2 个 API
	a. Provider组件类
	b. connect函数
	
	2). Provider组件
	接收store属性
	让所有的容器组件都可以看到store,从而通过store读取/更新状态
	
	3). connect组件
	接收2个参数: mapStateToProps和mapDispatchToProps
	mapStateToProps: 是一个函数,用来指定向UI组件传递哪些一般属性
	mapDispatchToProps: 是一个函数或者对象,用来指定向UI组件传递哪些函数属性
	connect()执行返回的是一个高阶组件: 包装UI组件,返回一个新的容器组件
	容器组件会向UI组件传入前面指定的一般/函数类型属性
*/
import React from 'react'
import PropTypes from 'prop-types'

/*
用来向所有容器组件提供store的组件类(通过context)
*/
export class Provider extends React.Component {
	static propTypes = {
		store: PropTypes.object.isRequired // 声明接收store
	}

	// 声明提供的context的数据名称和类型
	static childContextTypes = {
		store: PropTypes.object.isRequired
	}

	// 向所有有声明子组件提供包含要传递数据的context对象
	getChildContext() {
		return { store: this.props.store }
	}

	render() {
		// 返回渲染<Provider></Provider>中的所有子节点
		return this.props.children
	}
}

/*
connect高阶函数:
	接收2个参数: mapStateToProps和mapDispatchToProps,返回一个高阶组件函数
高阶组件: 接收一个UI组件,返回一个容器组件
*/
export function connect(mapStateToProps, mapDispatchToProps) {
	// 返回高阶组件函数
	return (UIComponent) => {
		return class ContainerComponent extends React.Component { // 返回容器组件

			// 声明接收的context数据的名称和类型
			static contextTypes = {
				store: PropTypes.object
			}

			constructor(props, context) {
				super(props)
				console.log('ContainerComponent context.store', context.store);

				// 取出store并得到包含所有一般属性的对象
				const { store } = context
				const stateProps = mapStateToProps(store.getState()) // 可能为{count: 1}(会变化)
				// 将所有的一般属性作为容器的状态数据(变化的存在state中)
				this.state = { ...stateProps }

				// 得到包含所有函数属性的对象
				let dispatchProps;
				if (typeof mapDispatchToProps === 'function') {
					dispatchProps = mapDispatchToProps(store.dispatch)
				} else {
					dispatchProps = Object.keys(mapDispatchToProps).reduce((pre, key) => {
						const actionCreator = mapDispatchToProps[key]
						pre[key] = (...args) => store.dispatch(actionCreator(...args)) // 参数透传(因为数量未知)
						return pre
					}, {})
				}
				// 保存到组件上(不会变化)
				this.dispatchProps = dispatchProps

				// 绑定store的state变化的监听
				store.subscribe(() => { // store内部的状态数据发生了变化
					// 更新容器组件 => UI组件也就会更新
					this.setState({ ...mapStateToProps(store.getState()) })
				})
			}

			render() {
				return <UIComponent {...this.state} {...this.dispatchProps} /> // 返回UI组件的标签
			}
		}
	}
}

