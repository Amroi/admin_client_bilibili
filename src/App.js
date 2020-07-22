import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import Login from './pages/login/login';
// import Admin from './pages/admin/admin';

import Loadable from 'react-loadable';
import Loading from '../src/components/loading';

const Login = Loadable({
	loader: () => import('./pages/login/login'),
	loading: Loading
})

const Admin = Loadable({
	loader: () => import('./pages/admin/admin'),
	loading: Loading
})

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>  {/*只匹配其中一个*/}
					<Route path="/login" component={Login} />
					<Route path="/" component={Admin} />  {/*当做主页面还有子路由，所以最好斜杠就行*/}
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App;