import React, { Component } from "react";
import { Form, Select, Input } from "antd";

const { Option } = Select;

// 添加分类中的Form组件
export default class AddForm extends Component {
    render() {
        return (
            <Form layout="vertical">
                <Form.Item label="所属分类" name="parentId" initialValue="1">
                    <Select>
                        <Option value="1">一级分类</Option>
                        <Option value="2">电脑</Option>
                        <Option value="3">手机</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="分类名称" name="categoryName">
                    <Input placeholder="请输入分类名称" />
                </Form.Item>
            </Form>
        );
    }
}
