import React, { Component } from "react";
import { Card, Table, Button, message, Modal } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";
import { reqCategorys, reqUpdateCategory, reqAddCategory } from "../../api";
import AddForm from "./add-form";
import UpateForm from "./upate-form";

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

    // Modal点击取消响应
    handleCancel = () => {
        this.formRef_crt.resetFields(); // 清除输入数据(以免更改下一个是上一个的更改值)
        this.setState({ showStatus: 0 }); //隐藏确认框
    };

    // 显示添加分类的Modal
    showAdd = () => {
        this.setState({ showStatus: 1 });
    };

    // 显示更新分类的Modal
    showUpate = (category) => {
        this.category = category; // 保存分类对象
        this.setState({ showStatus: 2 });
    };

    // 添加分类(的确认按钮)
    addCategory = () => {
        this.formRef_crt.validateFields().then(async (values) => {
            // 实现1：隐藏Modal
            this.setState({ showStatus: 0 });

            // 异步请求的参数提供
            const { parentId, categoryName } = values;
            // 清除输入数据(以免更改下一个是上一个的更改值)
            this.formRef_crt.resetFields();

            // 实现2：搜集数据，并提交添加分类的请求
            const result = await reqAddCategory(parentId, categoryName);
            if (result.status === 0) {
                if (parentId === this.state.parentId) {
                    // 若添加的分类(表单里选择的分类)就是当前列表下的分类
                    this.getCategorys(); // 实现3(情况一)：重新获取添加后的当前分类列表显示
                } else if (parentId === "0") {
                    this.getCategorys("0");
                    /* 实现3(情况二)：此时即在二级分类列表下添加一级分类,重新获取一级分类列表数据,
				但我们不希望页面跳转到一级分类列表*/
                }
            }
        });
    };

    //更新分类(的确认按钮)
    upateCategory = () => {
        // 进行表单验证，只有通过了才处理
        this.formRef_crt.validateFields().then(async (values) => {
            // 实现1：隐藏Modal
            this.setState({ showStatus: 0 });

            // 异步请求的参数提供
            const categoryId = this.category._id;
            // const categoryName = this.formRef_crt.getFieldValue("categoryName");
            const { categoryName } = values;
            // 清除输入数据(以免更改下一个是上一个的更改值)
            this.formRef_crt.resetFields();

            //实现2：发请求更新分类
            const result = await reqUpdateCategory({
                categoryId,
                categoryName,
            });
            if (result.status === 0) {
                //实现3：重新获取更新后的分类列表显示
                this.getCategorys();
            }
        });
    };

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
                        <LinkButton onClick={() => this.showUpate(category)}>
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
    getCategorys = async (parentId) => {
        // 在发请求前，显示loading
        this.setState({ loading: true });

        /* 参数parentId：如果没有指定根据状态(state)中的parentId请求,
		如果指定了根据指定的请求(在添加分类中有应用) */
        parentId = parentId || this.state.parentId;
        // 发异步ajax请求，获取数据
        const result = await reqCategorys(parentId);

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
			里面的这句话：setState() 的第二个参数为可选的回调函数，它将在 setState 完成合并并重新渲染组件后执行
			(异步，类似于componentDidUpate生命周期)。
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
    UNSAFE_componentWillMount() {
        this.initColumns();
    }

    /* 异步请求：获取分类列表
	(如果是打开界面就需要数据或者没有前置事件监听,就需要用到生命周期
		所以还有其他两个ajax请求(更新和添加)是在用到的函数里写不用先写在这)*/
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
        // 读取指定的分类
        const category = this.category || {}; //如果还没有指定一个空对象

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
                    <AddForm
                        categorys={categorys}
                        parentId={parentId}
                        setForm={(current) => {
                            this.formRef_crt = current;
                        }}
                    />
                </Modal>
                <Modal
                    title="更新分类"
                    visible={showStatus === 2}
                    onOk={this.upateCategory}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <UpateForm
                        categoryName={category.name}
                        setForm={(current) => {
                            this.formRef_crt = current;
                            /*
					        参数名current可以随意取名,
							它只是'包装'从子(UpateForm)组件中函数传递过来的参数(即this.formRef.current)存到=左边的属性名中,
							供父(此)组件的upateCategory方法里调用(line:46)。<=反向数据流？
							*/
                        }}
                    />
                </Modal>
            </Card>
        );
    }
}
