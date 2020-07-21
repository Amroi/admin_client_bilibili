import React, { Component } from "react";
import { Button } from "antd";
import PropTypes from 'prop-types'

import { increment, decrement } from './redux/actions'

export default class App extends Component {
	static propTypes = {
		store: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.numberRef = React.createRef();
	}

	// 各按钮回调
	increment = () => {
		const number = this.numberRef.current.value * 1;

		// this.setState((state) => ({
		// 	count: state.count + number,
		// }));
		this.props.store.dispatch(increment(number))
	};

	decrement = () => {
		const number = this.numberRef.current.value * 1;
		this.props.store.dispatch(decrement(number))
	};

	incrementIfOdd = () => {
		const number = this.numberRef.current.value * 1;
		if (this.props.store.getState().count % 2 === 1) {
			this.props.store.dispatch(increment(number))
		}
	};

	incrementAsync = () => {
		const number = this.numberRef.current.value * 1;
		setTimeout(() => {
			this.props.store.dispatch(increment(number))
		}, 1000);
	};


	render() {
		const count = this.props.store.getState().count

		return (
			<div style={{ padding: 30 }}>
				<p style={{ fontSize: 18 }}>click {count} times</p>
				<select ref={this.numberRef} style={{ width: 50, height: 30 }}>
					<option>1</option>
					<option>2</option>
					<option>3</option>
				</select>
			 &nbsp;&nbsp;
				<Button type="primary" onClick={this.increment}>
					+
			 </Button>
			 &nbsp;&nbsp;
				<Button onClick={this.decrement}>-</Button>&nbsp;&nbsp;
				<Button
					type="primary" danger
					disabled={count % 2 === 1 ? false : true}
					onClick={this.incrementIfOdd}
				>
					当前是奇数才能增加
			 </Button>
			 &nbsp;&nbsp;
				<Button type="primary" onClick={this.incrementAsync}>
					延迟一秒增加
			 </Button>
			</div>
		);
	}
}