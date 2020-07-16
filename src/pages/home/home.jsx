import React, { Component } from "react";
import "./home.less";
import { LineChart, Chart, Interval, Tooltip } from "bizcharts";
import { Card, Statistic, DatePicker, Row, Col, Timeline } from "antd";
import {
    QuestionCircleOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    RedoOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { RangePicker } = DatePicker;

// 首页路由
export default class Home extends Component {
    state = {
        currentKey: "1",
    };

    getInit = () => {
        this.data = [
            {
                month: "Jan",
                mobile: "小米",
                sale: 5.2,
            },
            {
                month: "Jan",
                mobile: "华为",
                sale: 3.1,
            },
            {
                month: "Jan",
                mobile: "苹果",
                sale: 2.2,
            },
            {
                month: "Feb",
                mobile: "小米",
                sale: 6.9,
            },
            {
                month: "Feb",
                mobile: "华为",
                sale: 4.2,
            },
            {
                month: "Feb",
                mobile: "苹果",
                sale: 3.2,
            },
            {
                month: "Mar",
                mobile: "小米",
                sale: 9.5,
            },
            {
                month: "Mar",
                mobile: "华为",
                sale: 5.7,
            },
            {
                month: "Mar",
                mobile: "苹果",
                sale: 3.7,
            },
            {
                month: "Apr",
                mobile: "小米",
                sale: 14.5,
            },
            {
                month: "Apr",
                mobile: "华为",
                sale: 8.5,
            },
            {
                month: "Apr",
                mobile: "苹果",
                sale: 6.5,
            },
            {
                month: "May",
                mobile: "小米",
                sale: 18.4,
            },
            {
                month: "May",
                mobile: "华为",
                sale: 11.9,
            },
            {
                month: "May",
                mobile: "苹果",
                sale: 8.9,
            },
            {
                month: "Jun",
                mobile: "小米",
                sale: 21.5,
            },
            {
                month: "Jun",
                mobile: "华为",
                sale: 15.2,
            },
            {
                month: "Jun",
                mobile: "苹果",
                sale: 12.2,
            },
            {
                month: "Jul",
                mobile: "小米",
                sale: 25.2,
            },
            {
                month: "Jul",
                mobile: "华为",
                sale: 17,
            },
            {
                month: "Jul",
                mobile: "苹果",
                sale: 13,
            },
            {
                month: "Aug",
                mobile: "小米",
                sale: 26.5,
            },
            {
                month: "Aug",
                mobile: "华为",
                sale: 16.6,
            },
            {
                month: "Aug",
                mobile: "苹果",
                sale: 19.6,
            },
            {
                month: "Sep",
                mobile: "小米",
                sale: 23.3,
            },
            {
                month: "Sep",
                mobile: "华为",
                sale: 14.2,
            },
            {
                month: "Sep",
                mobile: "苹果",
                sale: 23.2,
            },
            {
                month: "Oct",
                mobile: "小米",
                sale: 18.3,
            },
            {
                month: "Oct",
                mobile: "华为",
                sale: 10.3,
            },
            {
                month: "Oct",
                mobile: "苹果",
                sale: 25.3,
            },
            {
                month: "Nov",
                mobile: "小米",
                sale: 13.9,
            },
            {
                month: "Nov",
                mobile: "华为",
                sale: 6.6,
            },
            {
                month: "Nov",
                mobile: "苹果",
                sale: 28.6,
            },
            {
                month: "Dec",
                mobile: "小米",
                sale: 9.6,
            },
            {
                month: "Dec",
                mobile: "华为",
                sale: 4.8,
            },
            {
                month: "Dec",
                mobile: "苹果",
                sale: 33.8,
            },
        ];

        this.data_2 = [
            { mouth: "1 月", 访客: 38 },
            { mouth: "2 月", 访客: 52 },
            { mouth: "3 月", 访客: 61 },
            { mouth: "4 月", 访客: 45 },
            { mouth: "5 月", 访客: 48 },
            { mouth: "6 月", 访客: 38 },
            { mouth: "7 月", 访客: 12 },
            { mouth: "9 月", 访客: 23 },
            { mouth: "10 月", 访客: 32 },
            { mouth: "11 月", 访客: 46 },
            { mouth: "12 月", 访客: 70 },
        ];

        this.data_3 = [
            { mouth: "1 月", 点击: 38 },
            { mouth: "2 月", 点击: 20 },
            { mouth: "3 月", 点击: 61 },
            { mouth: "4 月", 点击: 30 },
            { mouth: "5 月", 点击: 48 },
            { mouth: "6 月", 点击: 38 },
            { mouth: "7 月", 点击: 80 },
            { mouth: "9 月", 点击: 23 },
            { mouth: "10 月", 点击: 58 },
            { mouth: "11 月", 点击: 60 },
            { mouth: "12 月", 点击: 70 },
        ];

        this.tabListNoTitle = [
            {
                key: "0",
                tab: "访问量",
            },
            {
                key: "1",
                tab: "点击量",
            },
        ];
    };

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    UNSAFE_componentWillMount() {
        this.getInit();
    }

    render() {
        const contentListNoTitle = {
            "0": (
                <Chart
                    height={280}
                    autoFit
                    data={this.data_2}
                    interactions={["active-region"]}
                    padding={[30, 30, 30, 50]}
                >
                    <Interval color={["#6998FA"]} position="mouth*访客" />
                    <Tooltip shared />
                </Chart>
            ),

            "1": (
                <Chart
                    height={280}
                    autoFit
                    data={this.data_3}
                    interactions={["active-region"]}
                    padding={[30, 30, 30, 50]}
                >
                    <Interval color={["#5DD9A8"]} position="mouth*点击" />
                    <Tooltip shared />
                </Chart>
            ),
        };

        const { currentKey } = this.state;
        return (
            <div className="home">
                <div className="home-header">
                    <Card
                        title="商品总量"
                        extra={<QuestionCircleOutlined />}
                        style={{
                            width: 250,
                            height: 220,
                            margin: "30px 150px 0 30px",
                        }}
                    >
                        <Statistic
                            value={1128163}
                            suffix="个"
                            valueStyle={{ fontSize: 26, fontStyle: "bold" }}
                        />

                        <p>
                            周同比
                            <Statistic
                                value={15.12}
                                precision={2}
                                valueStyle={{ color: "#3f8600" }}
                                suffix={
                                    <span>
                                        <span style={{ paddingRight: " 5px" }}>
                                            %
                                        </span>
                                        <ArrowUpOutlined />
                                    </span>
                                }
                            />
                        </p>

                        <p>
                            日同比
                            <Statistic
                                value={10.09}
                                precision={2}
                                valueStyle={{ color: "#cf1322" }}
                                suffix={
                                    <span>
                                        <span style={{ paddingRight: " 5px" }}>
                                            %
                                        </span>
                                        <ArrowDownOutlined />
                                    </span>
                                }
                            />
                        </p>
                    </Card>

                    <LineChart
                        width={800}
                        height={300}
                        data={this.data}
                        label={{
                            formatter: (val) => `${val}万台`,
                        }}
                        title={{
                            visible: true,
                            text: "销量趋势",
                        }}
                        smooth
                        point={{
                            shape: "hollow-circle",
                            visible: true,
                            style: () => {},
                        }}
                        xField="month"
                        yField="sale"
                        seriesField="mobile"
                    />
                </div>

                <div className="home-footer">
                    <Card
                        style={{ margin: 20, width: "100%" }}
                        activeTabKey={currentKey}
                        tabList={this.tabListNoTitle}
                        tabBarExtraContent={
                            <RangePicker
                                defaultValue={[
                                    moment("2019-01-01", "YYYY-MM-DD"),
                                    moment("2020-01-01", "YYYY-MM-DD"),
                                ]}
                            />
                        }
                        onTabChange={(key) => {
                            this.onTabChange(key, "currentKey");
                        }}
                    >
                        <Row>
                            <Col span={16}>
                                <Card
                                    title={
                                        currentKey === "1"
                                            ? "点击趋势"
                                            : "访问趋势"
                                    }
                                    extra={<RedoOutlined />}
                                    style={{ width: 730 }}
                                >
                                    {contentListNoTitle[currentKey]}
                                </Card>
                            </Col>

                            <Col span={8}>
                                <Card
                                    title="任务"
                                    extra={<RedoOutlined />}
                                    style={{ width: 400 }}
                                >
                                    <Timeline mode="left">
                                        <Timeline.Item
                                            label="2019-09-01"
                                            color="green"
                                        >
                                            新版本迭代会
                                        </Timeline.Item>
                                        <Timeline.Item color="green">
                                            完成网站设计初版
                                        </Timeline.Item>
                                        <Timeline.Item color="red">
                                            <p>联调接口</p>
                                            <p>功能验收</p>
                                        </Timeline.Item>
                                        <Timeline.Item label="2020-12-31 23:59:59">
                                            <p>登陆功能设计</p>
                                            <p>权限验证</p>
                                        </Timeline.Item>
                                        <Timeline.Item
                                            color="green"
                                            label="2019-12-25 14:20"
                                        >
                                            <p>交付上线测试</p>
                                        </Timeline.Item>
                                    </Timeline>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        );
    }
}
