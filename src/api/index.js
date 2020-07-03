// jsonp操作方法可参考'https://github.com/webmodules/jsonp/blob/master/Readme.md'
// import jsonp from 'jsonp';
// import { message } from 'antd';

/*
要求：能根据接口文档定义接口要求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

！！!都是根据接口文档(最好看postname先测)来定义下面的接口请求
*/
import ajax from "./ajax";
const BASE = 'http://39.100.225.255:5000'; // 更改后的数据请求接口的端口
// const BASE = 'http://localhost:5000';

const url = 'http://api.map.baidu.com/weather/v1/?district_id=441900&data_type=all&ak=ShR2M0IN99BCG2TUQC3lGt4DrAvrCjXZ&output=json'

// 登录
/*
export function reqLogin(username, password) {
	return ajax('/login', {username, password}, 'POST')
}
*/
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId }) // 形参默认值。前面定义过了所以第三个参数我们不需要再写'GET'

// 添加分类
export const reqAddCategory = (parentId, categoryName) => ajax(BASE + '/manage/category/add', { parentId, categoryName }, 'POST')

// 更新分类名称
export const reqUpateCategory = ({ categoryId, categoryName }) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST')

// 百度地图天气请求
export const reqWeather = () => ajax(url, {})


// json请求的接口请求函数
// export const reqWeather = (city_id) => {

// 	return new Promise((resolve, reject) => {
// 		const url = `http://api.map.baidu.com/weather/v1/?district_id=${city_id}&data_type=all&ak=ShR2M0IN99BCG2TUQC3lGt4DrAvrCjXZ&output=json`;
// 		jsonp(url, {
// 			param: 'callback', timeout: 30000
// 		}, (error, response) => {
// 			console.log('jsonp()', error, response);
// 			if (!error && response.status === 0) {
// 				// 取出需要数据
// 				const { text_day } = response.result.forecasts[0];
// 				resolve({ text_day })
// 			} else {
// 				message.error('获取天气信息失败！');
// 			}
// 		})
// 	})
// }
// reqWeather(441900);
