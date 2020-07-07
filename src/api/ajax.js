import { message } from 'antd'
/*
能发送异步ajax请求的函数模块。
封装axios库。(axios用法参考网页'https://github.com/axios/axios')
ajax请求函数的返回值是Promise对象(所以加return)。
1.优化1：统一处理请求异常？
	在外层包一个自己创建的promise对象；(line: 22)(axios本身有promise对象,为了集中处理错误自己包一个)
	在请求出错时，不调用reject(error)，而是显示错误提示 
	(Why do?一个个错误处理不会太麻烦？对我们有用的是正确的值，不是错误信息)
2.优化2：异步得到不是response(line: 30)	,而是response.data
	在请求成功resolve时：resolve(response.data)
	(Why do?因为response有很多子对象，data为数据对象（个人理解）)
*/
import axios from 'axios';

export default function ajax(url, data = {}, type = "GET") {
    /* 
    (上述参数（为请求接口的三个必须参数）：url必然会传，data这样指定是因为有可能某个接口没有参数，
    指定一个默认值的做法，没传就是空对象，出现undefined并不太好)
    */

	return new Promise((resolve, reject) => {
		let promise;
		// 1.执行异步ajax请求
		if (type === 'GET') {  // 发送GET请求
			promise = axios.get(url, {  // 配置对象
				params: data // 指定请求参数
			})
		} else {  // 发送POST请求
			promise = axios.post(url, data)
		}

		promise.then(response => {
			// 2.成功 = 调用resolve(value)
			resolve(response.data)  // (两个data可把我给整蒙圈了...这个是外层ajax请求的data(ajax数组里我们需要的数组),接口里面有个自己自定义的对象名为data[见login.js中line:20])
		}).catch(error => {
			// 3.失败 = 不调用reject(error),而是提示异常信息
			message.error('请求出错了：' + error.message)
		})
	})

}

// 请求登录接口
// ajax('/login', {username: 'Tome', password: '12345'}, 'POST').then()