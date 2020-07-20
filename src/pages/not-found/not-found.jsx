import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import "./not-found.less";

/*
前台404页面
*/
export default class NotFound extends Component {
    gohome = () => {
        this.props.history.replace("/home");
    };

    render() {
        return (
            <Row className="not-found">
                <Col span={12} className="left"></Col>
                <Col span={12} className="right">
                    <h1>404</h1>
                    <h2>抱歉，你访问的页面不存在</h2>
                    <div>
                        <Button type="primary" onClick={this.gohome}>
                            回到首页
                        </Button>
                    </div>
                </Col>
            </Row>
        );
    }
}
