import React, { Component } from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";

// 饼图路由
export default class Line extends Component {
    // 返回饼图一的配置对象
    getOption = () => {
        return {
            backgroundColor: "#2c343c",
            height: 365,

            title: {
                text: "各品牌手机销量",
                subtext: "纯属虚构",
                left: "center",
                top: 20,
                textStyle: {
                    color: "#ccc",
                },
            },

            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)",
            },

            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1],
                },
            },
            series: [
                {
                    name: "品牌",
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "50%"],
                    data: [
                        { value: 335, name: "小米手机" },
                        { value: 310, name: "华为手机" },
                        { value: 274, name: "苹果手机" },
                        { value: 235, name: "三星手机" },
                        { value: 400, name: "荣耀手机" },
                    ].sort(function (a, b) {
                        return a.value - b.value;
                    }),
                    roseType: "radius",
                    label: {
                        color: "rgba(255, 255, 255, 0.3)",
                    },
                    labelLine: {
                        lineStyle: {
                            color: "rgba(255, 255, 255, 0.3)",
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20,
                    },
                    itemStyle: {
                        color: "#c23531",
                        shadowBlur: 200,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },

                    animationType: "scale",
                    animationEasing: "elasticOut",
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    },
                },
            ],
        };
    };

    getOptions = () => {
        this.getOption_2 = {
            title: {
                text: "各品牌手机库存",
                subtext: "纯属虚构",
                left: "center",
            },
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)",
            },
            legend: {
                orient: "vertical",
                left: "left",
                data: [
                    "小米手机",
                    "华为手机",
                    "苹果手机",
                    "三星手机",
                    "荣耀手机",
                ],
            },
            series: [
                {
                    name: "品牌",
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "60%"],
                    data: [
                        { value: 335, name: "小米手机" },
                        { value: 310, name: "苹果手机" },
                        { value: 234, name: "华为手机" },
                        { value: 135, name: "三星手机" },
                        { value: 1548, name: "荣耀手机" },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        };
    };

    UNSAFE_componentWillMount() {
        this.getOptions();
    }

    render() {
        return (
            <div>
                <Card title="饼图一">
                    <ReactEcharts option={this.getOption_2} />
                </Card>

                <Card title="饼图二">
                    <ReactEcharts option={this.getOption()} />
                </Card>
            </div>
        );
    }
}
