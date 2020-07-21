import store from 'store';
/*
进行local数据存储管理的工具模块。
(localStorage 属性语法详见：'https://www.runoob.com/jsref/prop-win-localstorage.html')
	优化存储到内存里的不足，改进成()：
		1.登陆后, 刷新后依然是已登陆状态 (维持登陆)
		2.登陆后, 关闭浏览器后打开浏览器访问依然是已登陆状态 (自动登陆)
		3.登陆后, 访问登陆路径自动跳转到管理界面(就说一旦登录了指定去登陆路径也不奏效)

（但我个人而言我觉得，第二和三条就没必要了，就是说关闭页面了为啥还要到已登录界面？
所以我选择用sessionStorage替换了一开始使用的localStorage方法，具体差别可参考上面网站。）

（注：实现第二条就改回localStorage/store方法，
实现第三条就还要在login.js界面（的render()方法里）再加上admin.js里面一样的登陆判断条件）
*/
const USER_KEY = 'user_key';
export default {
	// 保存user 
	saveUser(user) {
		// sessionStorage.setItem(USER_KEY, JSON.stringify(user)) //因为保存的必须是对象的json字符串 
		store.set(USER_KEY, user)  // 内部会自动转换成 json再保存
	},

	// 读取user
	getUser() {
		// return JSON.parse(sessionStorage.getItem(USER_KEY) || "{}")
		return store.get(USER_KEY) || {}
	},

	// 删除user
	removeUser() {
		// sessionStorage.removeItem(USER_KEY)
		store.remove(USER_KEY)
	}
}

/*
使用封装库store的好处：
1.解决一些浏览器的不支持localStorage方法的问题
2.语法更简洁，内部会自动转换成 json再保存
参考使用文档：'https://github.com/marcuswestin/store.js/blob/master/README.md'
*/