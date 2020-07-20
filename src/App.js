import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login/login';
import Admin from './pages/admin/admin';


class App extends React.Component {
	render() {
		return (
			<HashRouter>
				<Switch>  {/*只匹配其中一个*/}
					<Route path="/login" component={Login} />
					<Route path="/" component={Admin} />  {/*当做主页面还有子路由，所以最好斜杠就行*/}
				</Switch>
			</HashRouter>
		)
	}
}

export default App;