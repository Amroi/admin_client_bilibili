import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductHome from "./home";
import ProductAddUpate from "./add-update";
import ProductDetail from "./detail";
import "./product.less"; // 可以控制所有子组件(上三)样式

// 商品路由(搭建路由分布)(一般最好都要独立一个界面)
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/product" component={ProductHome} />
                {/* 必须设置路径完全匹配，不然下两个没法执行 */}
                <Route path="/product/addupate" component={ProductAddUpate} />
                <Route path="/product/detail" component={ProductDetail} />
                <Redirect to="/product" />
                {/* 路由的匹配原则是一层层匹配过来的,一个 / 为一层,而exact精准匹配和
				Redirect重定向匹配很好的体现了这点*/}
            </Switch>
        );
    }
}
