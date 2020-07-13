import React, { Component } from "react";
import { Card, Table, Form, Button, Space, Modal, message } from "antd";
import LinkButton from "../../components/link-button";
import { reqUser } from "../../api";
import { formateDate } from "../../utils/dateUtils";

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
                render: (role_id) =>
                    this.state.roles.find((item) => item._id === role_id).name,
            },
            {
                title: "操作",
                dataIndex: "handle",
                render: () => (
                    <Space>
                        <LinkButton>修改</LinkButton>
                        <LinkButton>修改</LinkButton>
                    </Space>
                ),
            },
        ];
    };

    getUser = async () => {
        this.setState({ loading: true });

        const result = await reqUser();

        this.setState({ loading: false });

        if (result.status === 0) {
            const { users, roles } = result.data;
            this.setState({ users, roles });
        } else {
            message.error("获取用户列表失败！");
        }
    };

    // 添加或者更新用户
    addOrUpdateUser = () => {};

    UNSAFE_componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        const { isShow, loading, users } = this.state;
        const title = (
            <Button
                type="primary"
                onClick={() => this.setState({ visible: 1 })}
            >
                创建用户
            </Button>
        );
        return (
            <Card title={title}>
                <Modal
                    title="添加用户"
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={() => this.setState({ visible: false })}
                ></Modal>
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
