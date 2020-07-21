/*
reducer函数模块：根据旧的state和指定的action返回一个新的state
*/
import { combineReducers } from 'redux'
import { INCREMENT, DECREMENT } from './action-types'

// 管理count状态数据的reducer(参数类型是固定的)
function count(state = 1, action) {
	console.log('count()', state, action); // 第一个参数为初始值；action为对象
	switch (action.type) {
		case INCREMENT:
			return state + action.data
		case DECREMENT:
			return state - action.data
		default:
			return state
	}
}

const initUser = {}
// 管理user状态数据的reducer
function user(state = initUser, action) {
	switch (action.type) {
		default:
			return state
	}
}

/*
combineReducers函数：接收包含所有的reducer函数对象,返回一个新的reducer函数(总reducer)
总reducer函数管理的state的结构(是对象类型而非数组)：
	{
		count：1,
		user：{}
	}对象值便为state的(初始)值
*/
export default combineReducers({
	count,
	user
})