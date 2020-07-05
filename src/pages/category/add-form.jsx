import React, { Component } from "react";
import { Form, Select, Input } from "antd";
import PropTypes from "prop-types";
// PropTypes 提供一系列验证器，传入的 prop 值类型不正确时，JavaScript 控制台将会显示警告。
const { Option } = Select;

// 添加分类中的Form组件
export default class AddForm extends Component {
    formRef = React.createRef();
    static propTypes = {
        categorys: PropTypes.array.isRequired, // 一级分类的数组
        parentId: PropTypes.string.isRequired, // 父分类的ID
        setForm: PropTypes.func.isRequired,
    };

    componentDidMount() {
        // 不能用componentWillMount，因为拿不到form实体(没渲染)
        this.props.setForm(this.formRef.current);
    }

    componentDidUpdate() {
        this.formRef.current.setFieldsValue({
            parentId: this.props.parentId,
        });
    }

    render() {
        const { categorys, parentId } = this.props;
        return (
            <Form layout="vertical" ref={this.formRef} hideRequiredMark>
                <Form.Item
                    label="所属分类"
                    name="parentId"
                    initialValue={parentId}
                >
                    <Select>
                        <Option value="0">一级分类</Option>
                        {categorys.map((item, index) => (
                            <Option key={index} value={item._id}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="分类名称"
                    name="categoryName"
                    rules={[
                        {
                            required: true,
                            message: "分类名称必须输入！！",
                        },
                    ]}
                >
                    <Input placeholder="请输入分类名称" />
                </Form.Item>
            </Form>
        );
    }
}
