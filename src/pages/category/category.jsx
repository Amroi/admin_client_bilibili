import React, { Component } from "react";
import { Card, Table, Button, message, Modal } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";
import { reqCategorys } from "../../api";

// 商品分类路由
export default class Category extends Component {
    state = {
        loading: false, //是否正在获取数据中
        categorys: [], //一级分类列表
        subCategorys: [], //二级分类列表
        parentId: "0", //当前需要显示的分类列表的parentId(即请求一级或者二级,一级为"0",二级为!"0")
        parentName: "", // 当前需要显示的分类列表的父分类名称(即从哪个名称打开的二级分类列表)
        showStatus: 0, // 标识添加/更新的确认框是否显示，0：都不显示，1：显示添加，2：显示更新
    };

    // Modal点击取消响应:隐藏确认框
    handleCancel = () => {
        this.setState({ showStatus: 0 });
    };

    // 显示添加分类的Modal
    showAdd = () => {
        this.setState({ showStatus: 1 });
    };

    // 显示更新分类的Modal
    showUpate = () => {
        this.setState({ showStatus: 2 });
    };

    // 添加分类
    addCategory = () => {};

    //更新分类
    upateCategory = () => {};

    // 初始化Table所有列的数组
    initColumns = () => {
        this.columns = [
            {
                title: "分类的名称",
                dataIndex: "name",
            },
            {
                title: "操作",
                width: 300,
                render: (category) => (
                    <span>
                        <LinkButton onClick={this.showUpate}>
                            修改分类
                        </LinkButton>
                        {this.state.parentId === "0" ? (
                            <LinkButton
                                onClick={() => this.showSubCategorys(category)}
                            >
                                {/* 如何向事件回调函数传递参数(如上):先定义一个匿名函数,在函数调用处理的函数并传入参数*/}
                                查看子分类
                            </LinkButton>
                        ) : null}
                    </span>
                ),
            },
        ];
    };

    // 异步获取一级/二级分类列表显示
    getCategorys = async () => {
        // 在发请求前，显示loading
        this.setState({ loading: true });

        const { parentId } = this.state;
        // 发异步ajax请求，获取数据
        const result = await reqCategorys(parentId); // 注意是0字符串

        //在发请求完成后，隐藏loading
        this.setState({ loading: false });

        if (result.status === 0) {
            // 取出分类数组(可能是一级也可能是二级的)
            const categorys = result.data;
            if (parentId === "0") {
                // 更新一级分类到页面Table的dataSource中
                this.setState({
                    categorys, // 简写，实则为categorys：categorys
                });
            } else {
                // 更新二级分类
                this.setState({
                    subCategorys: categorys,
                });
            }
        } else {
            message.error("获取分类列表失败");
        }
    };

    // 显示指定一级分类对象的二级列表
    showSubCategorys = (category) => {
        this.setState(
            {
                parentId: category._id,
                parentName: category.name, // 这两个属性是二级分类区别于一级的
            },
            () => {
                //在状态更新且重新render()后执行
                // console.log("this.state.parentId", this.state.parentId); // 在此函数中id才改变了;

                this.getCategorys(); // 获取二级分类列表显示
            } /*
			这种setState()比较少见,语法详见:'https://react.docschina.org/docs/react-component.html#setstate'
			里面的这句话：setState() 的第二个参数为可选的回调函数，它将在 setState 完成合并并重新渲染组件后执行。
			*/
        );
    };

    // 从二级列表再回到一级(不是再去ajax请求而是类似清空当前状态,变化成一级列表时的状态)
    showFirstCategorys = () => {
        this.setState({
            parentId: "0",
            parentName: "",
            subCategorys: [],
        });
    };

    // 把Table表头的数据放在这里不放在render中是因为避免更新又重新数据渲染，多次渲染死值无意义
    componentWillMount() {
        this.initColumns();
    }

    // 异步请求：获取分类列表
    componentDidMount() {
        this.getCategorys(); // 获取一级分类列表显示
    }

    render() {
        // 读取状态数据
        const {
            categorys,
            loading,
            subCategorys,
            parentName,
            parentId,
            showStatus,
        } = this.state;

        // card的左侧
        const title =
            parentId === "0" ? (
                <span>一级分类列表</span>
            ) : (
                <span>
                    <LinkButton onClick={this.showFirstCategorys}>
                        一级分类列表
                    </LinkButton>
                    <ArrowRightOutlined />
                    <span style={{ marginLeft: 5 }}>{parentName}</span>
                </span>
            );

        // card的右侧
        const extra = (
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={this.showAdd}
            >
                添加
            </Button>
        );

        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={parentId === "0" ? categorys : subCategorys}
                    columns={this.columns}
                    bordered
                    rowKey="_id"
                    loading={loading}
                    pagination={{ defaultPageSize: 6, showQuickJumper: true }}
                />

                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>add</p>
                </Modal>
                <Modal
                    title="更新分类"
                    visible={showStatus === 2}
                    onOk={this.upateCategory}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>upate</p>
                </Modal>
            </Card>
        );
    }
}
