import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';

import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

// import storageUtils from './utils/storageUtils';
// import memoryUtils from './utils/memoryUtils';

import { Provider } from 'react-redux'
import store from './redux/store'

/* 
读取local/或session中保存的user，保存到内存中(在项目入口就执行，一有刷新同样跟着更新)。
我感觉就是缓存和内存的区别。
我试了试注释下面代码，发现一刷新我储存在内存的user没了，相当没有登录了
使用redux后,不需要下列代码
*/
// const user = storageUtils.getUser();
// memoryUtils.user = user;

ReactDOM.render(
	<Provider store={store}>
		<ConfigProvider locale={zh_CN}>
			<App />
		</ConfigProvider>
	</Provider>,
	document.getElementById('root')
);

