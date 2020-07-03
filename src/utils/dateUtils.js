// 包含n个日期时间处理的工具函数模块

/*
	格式化时间
*/
export function formateDate(time) {
	if (!time) return '';
	let date = new Date(time);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
		+ "\xa0" + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}
// ''\xa0'在字符串里面插入空格