import React, { Component } from "react";
import { Button } from "antd";

export default class App extends Component {
	state = { count: 1 }
	constructor(props) {
		super(props);
		this.numberRef = React.createRef();
	}

	// 各按钮回调
	increment = () => {
		const number = this.numberRef.current.value * 1;

		this.setState((state) => ({
			count: state.count + number,
		}));
	};

	decrement = () => {
		const number = this.numberRef.current.value * 1;
		this.setState((state) => ({
			count: state.count - number,
		}));
	};

	incrementIfOdd = () => {
		const number = this.numberRef.current.value * 1;
		if (this.state.count % 2 === 1) {
			this.setState((state) => ({
				count: state.count + number,
			}));
		}
	};

	incrementAsync = () => {
		const number = this.numberRef.current.value * 1;
		setTimeout(() => {
			this.setState((state) => ({
				count: state.count + number,
			}));
		}, 1000);
	};


	render() {
		return (
			<div style={{ padding: 30 }}>
				<p style={{ fontSize: 18 }}>click {this.state.count} times</p>
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
					disabled={this.state.count % 2 === 1 ? false : true}
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