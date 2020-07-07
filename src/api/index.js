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

const url = '';

// 登录
/*
export function reqLogin(username, password) {
	return ajax('/login', {username, password}, 'POST')
}
*/
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

// 获取一级/二级分类下的所有列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId }) // 形参默认值。前面定义过了所以第三个参数我们不需要再写'GET'

// 添加分类
export const reqAddCategory = (parentId, categoryName) => ajax(BASE + '/manage/category/add', { parentId, categoryName }, 'POST')
// 参数为多个的时候，不加一个{}变成对象处理的话。传递参数时要格外小心，必须要一一对应。

// 更新分类名称
export const reqUpateCategory = ({ categoryId, categoryName }) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST')

// 获取一级/二级分类下的某个项
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', { categoryId })

// 更新商品的状态(上架/下架)
export const reqUpateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', { productId, status }, 'POST')

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', { pageNum, pageSize })

/* 这样分开写搜索商品似乎太麻烦和笨绌
// 搜索商品分页列表(根据商品名称)
export const reqSearchProducts1 = ({ pageNum, pageSize, searchName }) => ajax(BASE + '/manage/product/search', {
	pageNum,
	pageSize,
	productName: searchName
})
// 搜索商品分页列表(根据商品描述)
export const reqSearchProducts2 = ({ pageNum, pageSize, searchName }) => ajax(BASE + '/manage/product/search', {
	pageNum,
	pageSize,
	productDesc: searchName
})
*/

// 搜索商品分页列表(根据商品名称/商品描述)
// 参数searchType：搜索的类型。(商品名称/商品描述productName/productDesc)
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/manage/product/search', {
	pageNum,
	pageSize,
	[searchType]: searchName // 想要一个变量的值作为属性名的时候，外层包裹中括号
})

// 百度地图天气请求(实时)
export const reqWeather = () => ajax(url + '/weather/v1/?district_id=441900&data_type=all&ak=ShR2M0IN99BCG2TUQC3lGt4DrAvrCjXZ&output=json' + new Date().getTime(), {})


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
