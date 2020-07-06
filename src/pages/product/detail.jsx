import React, { Component } from "react";
import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";
import { BASE_IMG_URL } from "../../utils/constants";

// 商品的详情子路由组件
export default class ProductDetail extends Component {
    render() {
        // 读取携带过来的state数据(保存在了location对象中)
        const {
            name,
            desc,
            price,
            detail,
            imgs,
        } = this.props.location.state.record;

        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.go(-1)}>
                    <ArrowLeftOutlined
                        style={{
                            color: "green",
                            marginRight: 10,
                            fontSize: 20,
                        }}
                    />
                </LinkButton>
                <span>商品详情</span>
            </span>
        );

        const content = {
            __html: detail,
        };

        return (
            <Card title={title} className="product-detail">
                <List>
                    <List.Item style={{ display: "block" }}>
                        <span className="left">商品名称：</span>
                        <span className="right">{name}</span>
                    </List.Item>
                    <List.Item style={{ display: "block" }}>
                        <span className="left">商品描述：</span>
                        <span>{desc}</span>
                    </List.Item>
                    <List.Item style={{ display: "block" }}>
                        <span className="left">商品价格：</span>
                        <span>{price}</span>
                    </List.Item>
                    <List.Item style={{ display: "block" }}>
                        <span className="left">所属分类：</span>
                        <span>xxx-->xxx</span>
                    </List.Item>
                    <List.Item style={{ display: "block" }}>
                        <span className="left">商品图片：</span>
                        {imgs.map((img) => (
                            <img
                                key={img}
                                src={BASE_IMG_URL + img}
                                className="product-img"
                                alt="img"
                            />
                        ))}
                    </List.Item>
                    <List.Item style={{ float: "left" }}>
                        <span className="left">商品详情：</span>
                        <span dangerouslySetInnerHTML={content}></span>
                        {/*dangerouslySetInnerHTML 是 React 为浏览器 DOM 提供 innerHTML 的替换方案。
						解析:'https://zh-hans.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml'
						页面报错解决:'https://blog.csdn.net/sunshinegyan/article/details/53978538'*/}
                    </List.Item>
                </List>
            </Card>
        );
    }
}
