// 包含n个日期时间处理的工具函数模块

// 格式化时间
export function formateDate(time) {
	if (!time) return '';
	let date = time;
	return date.getFullYear() +
		'-' + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) +
		'-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()) +
		"\xa0" + (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) +
		':' + (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) +
		':' + (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds())
}
// ''\xa0'在字符串里面插入空格