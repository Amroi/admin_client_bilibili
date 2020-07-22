/*
包含n个action creator函数的模块
同步action：对象 {type: 'xxx',data: 数组值}
异步action：函数 dispatch => {}
*/
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from './action-types'
import { reqLogin } from '../api'
import storageUtils from '../utils/storageUtils'
import { message } from 'antd'

// 设置头部标题的同步action
export const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle })

// 登录的异步action
export const login = (username, password) => {
	return async dispatch => {
		// 1. 执行异步ajax请求
		const result = await reqLogin(username, password) // {status: 0,data: user} {status: 1,msg: 'xxx'}
		// 2.1 如果成功,分发成功的同步action
		if (result.status === 0) {
			message.success('登录成功')

			const user = result.data
			storageUtils.saveUser(user) // 保存到local/session中
			dispatch(receiveUser(user)) // 分发接收用户的同步action
		} else { // 2.2 失败则分发失败的同步action
			const msg = result.msg
			// message.error(msg)
			dispatch(showErrorMsg(msg))
		}
	}
}

// 接收用户信息的同步action
export const receiveUser = (user) => ({ type: RECEIVE_USER, user })

// 显示登录错误信息的同步action
export const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg })

// 退出登录的同步action
export const logout = () => {
	// 1. 删除local中的user
	storageUtils.removeUser()
	// 2. 返回action对象
	return { type: RESET_USER }
}