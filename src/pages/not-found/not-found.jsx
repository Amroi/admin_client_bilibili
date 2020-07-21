import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import "./not-found.less";

import { connect } from "react-redux";
import { setHeadTitle } from "../../redux/actions";

/*
前台404页面
*/
class NotFound extends Component {
    gohome = () => {
        this.props.history.replace("/home");
        this.props.setHeadTitle("首页");
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

export default connect(null, { setHeadTitle })(NotFound);
