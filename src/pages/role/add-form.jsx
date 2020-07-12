import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const { Item } = Form;

export default class AddForm extends Component {
    formRef = React.createRef();
    static propTypes = {
        setForm: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.setForm(this.formRef.current);
    }

    render() {
        return (
            <Form hideRequiredMark ref={this.formRef}>
                <Item
                    label="角色名称"
                    name="roleName"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    rules={[
                        { required: true, message: "角色名称必须输入！！" },
                    ]}
                >
                    <Input placeholder="请输入角色名称" />
                </Item>
            </Form>
        );
    }
}
