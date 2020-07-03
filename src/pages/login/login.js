import React from "react";
import "./login.less";
import logo from "../../assets/images/logo.png";
import { reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import { Form, Input, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import storageUtils from "../../utils/storageUtils";

// 登录的路由组件
export default class Login extends React.Component {
	onFinish = async (values) => {
		const { username, password } = values;
		const result = await reqLogin(username, password)
		console.log('登陆结果', result); // 可能出现(已经在子数组data中了,前面指定了ajax.js)：{status: 0,data:user}; {status: 1,msg:'xxx'}
		if (result.status === 0) { //指定登陆成功情况（外层有个status:200是接口请求成功的status,当然我们已经指定在data中了）
			message.success('登陆成功');

			// 保存user以便主页显示
			const user = result.data;
			memoryUtils.user = user; // 保存在内存中
			storageUtils.saveUser(user); // 保存在local中/或session中(第二步=>在入口的index.js读取)

			this.props.history.replace('/');
			// history中replace()和push()方法的区别：是否可以回退,不可以前者，可以后者
		} else {
			message.error(result.msg)
		}

	};

	validatePwd = (rule, value) => {
		if (!value) {
			return Promise.reject("密码必须输入");
		} else if (value.length < 4) {
			return Promise.reject("密码必须大于四位");
		} else if (value.length > 12) {
			return Promise.reject("密码必须小于12位");
		} else if (!/^[a-zA-z0-9_]+$/.test(value)) {
			return Promise.reject("密码必须是英文、数字或下划线组成");
		} else {
			return Promise.resolve();
		}
	};

	render() {
		return (
			<div className="login">
				<header className="login-header">
					<img src={logo} alt="logo" />
					<h1>后台管理系统</h1>
				</header>

				<section className="login-content">
					<h2>用户登录</h2>
					<Form
						name="normal_login"
						className="login-form"
						onFinish={this.onFinish}
					>
						<Form.Item
							name="username" // 配置对象：属性名是特定的一些名称
							rules={[
								// 声明式验证：直接使用定义好的验证机制进行验证，可定义多条规则(数组对象格式)
								{
									required: true,
									whitespace: true,
									message: "用户名必须输入!",
								},
								{ min: 4, message: "用户名至少4位!" },
								{ max: 12, message: "用户名最多12位!" },
								{
									pattern: /^[a-zA-z0-9_]+$/,
									message: "用户名必须是英文、数字或下划线组成",
								},
							]}
						>
							<Input prefix={<UserOutlined />} placeholder="用户名" />
						</Form.Item>

						<Form.Item
							name="password"
							rules={
								// 如果定义的规则没有符合开发要求，也可以自定义声明，如下例子
								[{ validator: this.validatePwd }]
							}
						>
							<Input
								prefix={<LockOutlined />}
								type="password"
								placeholder="密码"
							/>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
							>
								登录
                           </Button>
						</Form.Item>
					</Form>
				</section>
			</div>
		);
	}
}
