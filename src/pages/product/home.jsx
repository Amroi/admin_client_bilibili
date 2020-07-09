import React, { Component } from "react";
import { Button, Card, Input, Table, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";
import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../api";
import { PAGE_SIZE } from "../../utils/constants";

const { Option } = Select;

// 商品的默认子路由组件
export default class ProductHome extends Component {
    state = {
        loading: false,
        products: [], // 商品的数组(表格里)
        total: 0, // 商品的总数量
        searchName: "", // 搜索的关键字
        searchType: "productName", // 跟据哪个类型搜索
    };

    // 初始化table的列的数组
    initColumns = () => {
        this.columns = [
            {
                title: "商品名称",
                dataIndex: "name",
            },
            {
                title: "商品描述",
                dataIndex: "desc",
            },
            {
                title: "价格",
                dataIndex: "price",
                render: (text) => <span>￥{text}</span>,
            },
            {
                title: "状态",
                width: 100,
                dataIndex: "status",
                render: (_, record) => {
                    const { _id, status } = record;
                    const currentStatus = status === 1 ? 2 : 1;
                    return (
                        <span>
                            <Button
                                type="primary"
                                onClick={() =>
                                    this.updateStatus(_id, currentStatus)
                                }
                            >
                                {record.status === 1 ? "下架" : "上架"}
                            </Button>
                            <span>
                                {record.status === 1 ? "在售" : "已下架"}
                            </span>
                        </span>
                    );
                },
            },
            {
                title: "操作",
                width: 100,
                render: (_, record) => (
                    <span>
                        <LinkButton
                            onClick={
                                () =>
                                    this.props.history.push("/product/detail", {
                                        record,
                                    }) // 将所有(product里的)对象使用state传递给目标路由组件,指定为state中的对象属性名,所以包裹{}
                            }
                        >
                            详情
                        </LinkButton>
                        <LinkButton
                            onClick={() =>
                                this.props.history.push(
                                    "product/addupate",
                                    record
                                )
                            }
                        >
                            修改
                        </LinkButton>
                    </span>
                ),
            },
        ];
    };

    // 更新指定商品的状态
    updateStatus = async (productId, status) => {
        const result = await reqUpdateStatus(productId, status); // 两个状态为需要更改的商品id和状态
        // console.log(result);  // { status : 0 }
        if (result.status === 0) {
            message.success("更新商品状态成功");
            this.getProducts(this.pageNum);
        }
    };

    // 获取指定页码的列表数据显示
    getProducts = async (pageNum) => {
        this.pageNum = pageNum; // 保存pageNum,让其他在当前页面的操作能够调用
        this.setState({ loading: true });

        const { searchName, searchType } = this.state;
        // 如果搜索的关键字有值,说明我们要发起搜索分页的请求,不然就是一般打开页面的请求
        let result;
        if (searchName) {
            result = await reqSearchProducts({
                pageNum,
                pageSize: PAGE_SIZE,
                searchName,
                searchType,
            });
        } else {
            result = await reqProducts(pageNum, PAGE_SIZE);
        }

        this.setState({ loading: false });

        if (result.status === 0) {
            // 取出分页数据，更新状态并显示分页列表
            const { total, list } = result.data;
            this.setState({ total, products: list });
        }
    };

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        // 页面加载默认只显示一页的数据，点击页码设置了onchange方法再调用
        this.getProducts(1);
    }
    render() {
        const { products, total, loading, searchName, searchType } = this.state;

        const title = (
            <span>
                <Select
                    value={searchType}
                    style={{ width: 200 }}
                    onChange={(value) => this.setState({ searchType: value })} // 受控组件的特性,必须搜集和监控value
                >
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input
                    value={searchName}
                    placeholder="关键字"
                    style={{ width: 200, margin: "0 15px" }}
                    onChange={(e) =>
                        this.setState({ searchName: e.target.value })
                    }
                />
                <Button
                    type="primary"
                    onClick={() => this.getProducts(this.pageNum)}
                >
                    搜索
                </Button>
            </span>
        );

        const extra = (
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => this.props.history.push("/product/addupate")}
            >
                添加
            </Button>
        );
        return (
            <Card title={title} extra={extra}>
                <Table
                    loading={loading}
                    rowKey="_id"
                    dataSource={products}
                    columns={this.columns}
                    bordered
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE, // 与Ajax里请求的pagesize应保持一致(将这个变量保存设定在一个通用模块中是不错的做法,方便且易于管理)
                        showQuickJumper: true,
                        // onChange: (pageNum) => {this.getProducts(pageNum)}
                        onChange: this.getProducts, // 简写，onchange传递的实参就是我们需要的参数
                    }}
                ></Table>
            </Card>
        );
    }
}
