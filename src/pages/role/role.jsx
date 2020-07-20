import React, { Component } from "react";
import { Card, Button, Table, message, Modal } from "antd";
import { reqRoles, reqAddRole, reqUpdateRole } from "../../api";
import memoryUtils from "../../utils/memoryUtils.js";
import storageUtils from "../../utils/storageUtils";
import { formateDate } from "../../utils/dateUtils.js";
import AddForm from "./add-form";
import UpateForm from "./update-form";

// 角色路由
export default class Role extends Component {
    constructor(props) {
        super(props);
        this.auth = React.createRef();
    }

    state = {
        roles: [], // 所有角色的列表
        role: {}, // 选中的角色(根据此要实现表格前面的按钮对应高亮)
        loading: false,
        add_visible: false,
        update_visible: false,
    };

    showAddModal = () => {
        this.setState({ add_visible: true });
    };

    cancelAddModal = () => {
        this.setState({ add_visible: false });
        // this.formRef_current.resetFields();
    };

    okAddModal = () => {
        // 1.前提条件：先进行表单的验证
        this.formRef_current.validateFields().then(async (values) => {
            // 2.隐藏Modal弹出框
            this.setState({ add_visible: false });

            // 3.从表单中搜集数据做接口参数的准备
            const { roleName } = values;
            this.formRef_current.resetFields();

            // 3.请求接口
            const result = await reqAddRole(roleName);

            if (result.status === 0) {
                // 4.判断并处理表单的更新(=>新表单)
                /* this.getRoles();
				因为上面那个又要发送一次接口请求,可尝试下列做法(即更新我们state中的对象role的值状态就能解决)：
				
				Ⅰ.新产生角色(基于原状态数据(整个)的替换)：*/
                const role = result.data;
                // const { roles } = this.state;
                // roles.push(role);
                // this.setState({ roles });

                /* 
				上面的这个方法有点bug：表单添加后要刷新页面才能看见，不能自刷新表格
				可能原因 ：push()返回的不是新数组是新数组的长度虽然是添加值进去了 
				
				概念：对象中的扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中，属于一种浅拷贝。
				浅拷贝: 简单的说, obj2复制obj1,修改obj1的值,obj2的值随之改变,就是浅拷贝。
				思考：浅拷贝很重要吧，这样不就能拿到之前全部的而且做我们的添加操作了。
				*/

                // this.setState({ roles: [...this.state.roles, role] });

                // Ⅱ.基于原本状态数据某个(修改)更新(其实上面那个setState语法是简洁形式)
                this.setState((state, props) => ({
                    roles: [...state.roles, role],
                })); // 传一个函数返回对象，返回对象的函数在add-update.jsx中也用过

                message.success("添加角色信息成功！");
            } else {
                message.error("添加角色信息失败！");
            }
        });
    };

    okUpdateModal = async () => {
        this.setState({ update_visible: false });

        const { role } = this.state;
        // 得到子组件内部最新的menus
        const menus = this.auth.current.getMenus();

        role.menus = menus;
        role.auth_time = Date.now();
        //Date.now()和new.Date().getTime()都是获取1970年1月1日截止到现在时刻的时间戳
        role.auth_name = memoryUtils.user.username;

        // 请求更新
        const result = await reqUpdateRole(role);
        if (result.status === 0) {
            // 判断是否更改的是当前用户的角色权限
            if (role._id === memoryUtils.user.role_id) {
                memoryUtils.user = {};
                storageUtils.removeUser(); // 先要清除两个地方的存储的信息

                this.props.history.replace("/login");
                message.warn("当前角色权限已发生更改,请重新登录", 5);
            } else {
                // this.getRoles();  // 不需要重新请求整个接口又去加载
                this.setState({ roles: [...this.state.roles] });
                // 我们下面右面有个指定行的方法，所以roles能看到某个role的变化，即知道改变哪个role里面的menus
                message.success("设置角色权限成功");
            }
        }
    };

    // 点击整行(不包括前面小点)
    onRow = (role, index) => {
        return {
            onClick: (e) => {
                // 点击行(按钮中算?)的回调,此函数(onRow()语法结构)的用法可参考官方文档
                console.log("onRow() click", role, index); // role:当前行对象属性
                this.setState({ role });
            },
        };
    };

    initColumns = () => {
        this.columns = [
            {
                title: "角色名称",
                dataIndex: "name",
            },
            {
                title: "创建时间",
                dataIndex: "create_time",
                render: (create_time) => formateDate(new Date(create_time)),
            },
            {
                title: "授权时间",
                dataIndex: "auth_time",
                render: (text) => formateDate(new Date(text)),
            },
            {
                title: "授权人",
                dataIndex: "auth_name",
            },
        ];
    };

    getRoles = async () => {
        this.setState({ loading: true });

        const result = await reqRoles();

        this.setState({ loading: false });

        if (result.status === 0) {
            const roles = result.data;
            this.setState({ roles });
        } else {
            message.error("获取角色列表失败！");
        }
    };

    UNSAFE_componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getRoles();
    }

    render() {
        const {
            roles,
            role,
            loading,
            add_visible,
            update_visible,
        } = this.state;
        const title = (
            <div>
                <Button type="primary" onClick={this.showAddModal}>
                    创建角色
                </Button>
                <span style={{ marginLeft: 10 }}>
                    <Button
                        type="primary"
                        disabled={!role._id}
                        onClick={() => {
                            this.setState({ update_visible: true });
                        }}
                    >
                        设置角色权限
                    </Button>
                </span>
            </div>
        );

        return (
            <Card title={title}>
                <Modal
                    title="创建角色"
                    visible={add_visible}
                    onCancel={this.cancelAddModal}
                    onOk={this.okAddModal}
                    okText="确定"
                    cancelText="取消"
                >
                    <AddForm
                        setForm={(fatherSon) => {
                            this.formRef_current = fatherSon;
                        }}
                    />
                </Modal>

                <Modal
                    title="设置角色权限"
                    visible={update_visible}
                    onCancel={() => {
                        this.setState({ update_visible: false });
                    }}
                    onOk={this.okUpdateModal}
                    okText="确定"
                    cancelText="取消"
                >
                    <UpateForm role={role} ref={this.auth} />
                </Modal>

                <Table
                    bordered
                    loading={loading}
                    rowKey="_id"
                    rowSelection={{
                        type: "radio",
                        selectedRowKeys: [role._id], // 不设置没有高亮行为不知道点选了哪个
                        onSelect: (role) => this.setState({ role }), // 这个是前面小点点的选择(他不包括在行选择中)
                    }}
                    /* 指定选中项的key数组,需要和onChange(我们用的是onRow)进行配合
					数组格式是因为兼容type：'checkbox' */
                    onRow={this.onRow}
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{
                        defaultPageSize: 5,
                        showQuickJumper: "true",
                    }}
                />
            </Card>
        );
    }
}
