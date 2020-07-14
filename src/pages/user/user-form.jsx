import React, { PureComponent } from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;
const { Item } = Form;

// 创建/更新用户的表单
export default class UserForm extends PureComponent {
    formRef = React.createRef();

    validatePwd = (_, value) => {
        if (!value) {
            return Promise.reject("密码是必填的！");
        } else if (value.length < 6) {
            return Promise.reject("密码应该设置在6位以上！");
        } else if (!/^[a-z A-z 0-9 _]+$/.test(value)) {
            return Promise.reject("密码必须是英文,数字或者下划线组成！");
        } else {
            return Promise.resolve();
        }
    };

    validatePhone = (_, value) => {
        if (!value) {
            return Promise.reject("手机号码是必填的！");
        } else if (!/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(value)) {
            return Promise.reject("请输入11位有效的手机号码！");
        } else {
            return Promise.resolve();
        }
    };

    componentDidMount() {
        this.props.getForm(this.formRef.current);
    }

    componentDidUpdate() {
        const {
            username,
            password,
            phone,
            email,
            role_id,
            _id,
        } = this.props.user;
        this.formRef.current.setFieldsValue({
            username,
            password,
            phone,
            email,
            role_id,
            _id,
        });
    }

    render() {
        const formLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
        };

        const { roles, user } = this.props;

        return (
            <Form
                {...formLayout}
                ref={this.formRef}
                hideRequiredMark
                initialValues={user}
            >
                <Item
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "请输入用户名",
                        },
                    ]}
                >
                    <Input placeholder="请输入用户名" allowClear />
                </Item>

                {user._id ? (
                    <Item
                        label="密码"
                        name="password"
                        rules={[{ validator: this.validatePwd }]}
                    >
                        <Input.Password
                            placeholder="请输入密码"
                            allowClear
                            disabled
                        />
                    </Item>
                ) : (
                    <Item
                        label="密码"
                        name="password"
                        rules={[{ validator: this.validatePwd }]}
                    >
                        <Input.Password placeholder="请输入密码" allowClear />
                    </Item>
                )}

                <Item
                    label="手机号"
                    name="phone"
                    rules={[{ validator: this.validatePhone }]}
                >
                    <Input placeholder="请输入手机号" allowClear />
                </Item>

                <Item
                    label="邮箱"
                    name="email"
                    rules={[
                        {
                            type: "email",
                            message: "请输入正确的邮箱形式",
                        },
                        {
                            required: true,
                            message: "请输入邮箱地址",
                        },
                    ]}
                >
                    <Input placeholder="请输入邮箱" allowClear />
                </Item>

                <Item
                    label="角色"
                    name="role_id"
                    rules={[{ required: true, message: "请选择邮箱地址！" }]}
                >
                    <Select placeholder="请选择角色" style={{ width: 200 }}>
                        {roles.map((role) => {
                            return (
                                <Option key={role._id} value={role._id}>
                                    {role.name}
                                </Option>
                            );
                        })}
                    </Select>
                </Item>
            </Form>
        );
    }
}
