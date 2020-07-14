import React, { Component } from "react";
import { Card, Table, Button, Space, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";
import { reqUser, reqDeleteUser, reqAddOrUpdateUser } from "../../api";
import { formateDate } from "../../utils/dateUtils";
import UserForm from "./user-form";

// 用户路由
export default class User extends Component {
    state = {
        isShow: false, // 是否显示Modal
        loading: false,
        users: [], // 所有用户列表
        roles: [], // 所有角色列表
    };

    initColumns = () => {
        this.columns = [
            {
                title: "用户名",
                dataIndex: "username",
            },
            {
                title: "邮箱",
                dataIndex: "email",
            },
            {
                title: "电话",
                dataIndex: "phone",
            },
            {
                title: "注册时间",
                dataIndex: "create_time",
                render: (text) => {
                    return formateDate(new Date(text));
                },
            },
            {
                title: "所属角色",
                dataIndex: "role_id",
                // render: (role_id) =>this.state.roles.find((item) => item._id === role_id).name,
                // 每一行都要去找太亢余，而且找不到会出现undefined报错界面(bug)

                render: (role_id) => this.roleNames[role_id],
                /* 创建一个对象(roleNames),key为role_id,值为name,
				改进就是事先创建只做一次的统计然后便很快能从这个对象中找到对应的。
				上面表达不可用roleNames.role_id */
            },
            {
                title: "操作",
                dataIndex: "handle",
                render: (_, user) => (
                    <Space>
                        <LinkButton
                            onClick={() => {
                                this.showUpdate(user);
                            }}
                        >
                            修改
                        </LinkButton>
                        <LinkButton
                            onClick={() => {
                                this.deleteUser(user);
                            }}
                        >
                            删除
                        </LinkButton>
                    </Space>
                ),
            },
        ];
    };

    /* 根据role的数组,生成包含所有角色名的对象
	(因为我们要根据user和role共有属性_id来匹配其所属角色,有这个对象表格不就可直接拿简单了？) */
    initRoleNames = (roles) => {
        const roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name;
            return pre;
        }, {});
        // 保存到当前组件我们在columns要用到
        this.roleNames = roleNames;
    };
    // 累加器语法：array.reduce(function(计算结束后的返回值, 当前元素), 传递函数的初始值)

    // 获取用户信息
    getUser = async () => {
        this.setState({ loading: true });
        const result = await reqUser();
        this.setState({ loading: false });

        if (result.status === 0) {
            const { users, roles } = result.data;

            this.initRoleNames(roles);

            this.setState({ users, roles });
        } else {
            message.error("获取用户列表失败！");
        }
    };

    // 删除指定用户
    deleteUser = (user) => {
        Modal.confirm({
            title: `确定要删除用户 ${user.username} 吗？`,
            icon: <ExclamationCircleOutlined />,
            onOk: async () => {
                const result = await reqDeleteUser(user._id);
                if (result.status === 0) {
                    message.success(`删除 ${user.username} 用户成功`);
                    this.getUser();
                }
            },
        }); // 这个confirm自带取消确认按钮隐藏Modal的效果
    };

    // 添加或者更新用户
    addOrUpdateUser = () => {
        this.formRef_current.validateFields().then(async (values) => {
            this.setState({ isShow: false });
            this.formRef_current.resetFields();
            // 1.收集输入数据
            const user = values;
            console.log(values);
            // 如果是更新,需要给user指定_id属性(更新自带了_id属性)
            if (this.user) {
                user._id = this.user._id;
            }

            // 2.发送添加的请求
            const result = await reqAddOrUpdateUser(user);
            if (result.status === 0) {
                message.success(`${this.user ? "更改" : "添加"}用户成功！`);
            }
            // 3.更新列表显示
            this.getUser();
        });
    };

    // 显示添加信息Modal
    showAdd = () => {
        this.user = null; // 必须先声明空(不做此操作区分添加或修改仅第一次生效,添加初始值会出现user),去除前面保存的user
        this.setState({ isShow: true });
    };

    // 显示更改信息Modal
    showUpdate = (user) => {
        this.user = user; // 暴露出来给当前组件

        this.setState({ isShow: true });
    };

    UNSAFE_componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        const { isShow, loading, users, roles } = this.state;
        const user = this.user || {};

        const title = (
            <Button type="primary" onClick={this.showAdd}>
                创建用户
            </Button>
        );
        return (
            <Card title={title}>
                <Modal
                    title={user._id ? "更改信息" : "添加信息"}
                    // _id是区分这两者的判断,因为一个存在此属性另一个没有
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={() => {
                        this.formRef_current.resetFields();
                        this.setState({ isShow: false });
                    }}
                >
                    <UserForm
                        user={user}
                        roles={roles}
                        getForm={(formEntity) => {
                            this.formRef_current = formEntity;
                        }}
                    />
                </Modal>
                <Table
                    bordered
                    columns={this.columns}
                    rowKey="_id"
                    dataSource={users}
                    loading={loading}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                />
            </Card>
        );
    }
}
