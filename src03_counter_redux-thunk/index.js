import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './containers/App';

import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>), document.getElementById('root'));