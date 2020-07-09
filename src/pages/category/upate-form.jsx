import React, { Component } from "react";
import PropTypes from "prop-types";
// PropTypes语法解析(验证器)：'https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html#gatsby-focus-wrapper'
import { Form, Input } from "antd";

// 更新分类中的Form组件
export default class UpateForm extends Component {
    formRef = React.createRef();
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired,
    };

    componentDidMount() {
        // 将form对象通过setForm()传递给父组件使用
        this.props.setForm(this.formRef.current);
        console.log("这个参数里有getFieldValue方法=>", this.formRef.current);
    }

    componentDidUpdate() {
        this.formRef.current.setFieldsValue({
            categoryName: this.props.categoryName,
        });
    } /* (这个问题思考了挺久还是看博客才解决的)
	1.使用原因：antd4.0表单的默认值不会同步更新了，因为这鬼更新，有个bug令我不得其解：
	就是在父组件的打开Modal方法中测试能正常传递值，但是打开第二个form的默认值不会发生更新。
	2.使用方法：componentDidUpdate在组件接受新的props之后触发，所以这个生命周期能触发更改每次传递的值，
	然后在通过antd API中设定值的方法完成初始值设定。
	*/

    render() {
        const { categoryName } = this.props;

        return (
            <Form ref={this.formRef}>
                <Form.Item
                    name="categoryName"
                    initialValue={categoryName}
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
