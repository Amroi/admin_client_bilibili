import React, { Component } from "react";
import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";
import { BASE_IMG_URL } from "../../utils/constants";
import { reqCategory } from "../../api";
import memoryUtils from "../../utils/memoryUtils";

// 商品的详情子路由组件
export default class ProductDetail extends Component {
    state = {
        cName_1: "", // 一级分类中的商品的名称
        cName_2: "", // 二级分类中的商品的名称
    };

    async componentDidMount() {
        const { pCategoryId, categoryId } = memoryUtils.product;
        if (pCategoryId === "0") {
            // 一级分类下的商品
            const result = await reqCategory(categoryId);
            const cName1 = result.data.name;
            this.setState({ cName_1: cName1 });
        } else {
            // 二级分类下的商品
            /*
            // 通过多个await方式发多个请求：后面一个请求是在前一个请求成功返回之后才发
            const result_1 = await reqCategory(pCategoryId); // 获取一级分类中某项
            const result_2 = await reqCategory(categoryId); // 获取二级分类中某项
            const cName1 = result_1.data.name;
			const cName2 = result_2.data.name;
			*/
            /* 一次性发送多个请求发送多个请求，只有都成功了，才正常处理
			(es6语法：const p = Promise.all([p1, p2, p3]); )*/
            const results = await Promise.all([
                reqCategory(pCategoryId),
                reqCategory(categoryId),
            ]);
            const cName1 = results[0].data.name;
            const cName2 = results[1].data.name;
            this.setState({ cName_1: cName1, cName_2: cName2 });
        }
    }

    // 在卸载之前清楚保存的数据
    componentWillUnmount() {
        memoryUtils.product = {};
    }

    render() {
        // 读取携带过来的state数据(保存在了location对象中)
        const { name, desc, price, detail, imgs } = memoryUtils.product;
        const { cName_1, cName_2 } = this.state;

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
                        <span>
                            {cName_1}
                            {cName_2 ? "👉👉👉" + cName_2 : null}
                        </span>
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
						(因为content里有元素标签,这样写才能解析字符串下的元素标签,类似'<p></p>')
						解析:'https://zh-hans.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml'
						页面报错解决:'https://blog.csdn.net/sunshinegyan/article/details/53978538'*/}
                    </List.Item>
                </List>
            </Card>
        );
    }
}
