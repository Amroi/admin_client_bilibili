import React, { Component } from "react";
import { Card, Button } from "antd";
import ReactEcharts from "echarts-for-react";

// 柱状图路由
export default class Bar extends Component {
    state = {
        sales: [13, 18, 66, 24, 78, 50], // 初始销量的数据
        stores: [77, 55, 105, 66, 50, 80], // 初始库存的数据
    };

    // 更新改变柱状图里的data
    update = () => {
        this.setState((state) => ({
            sales: state.sales.map((item) => item + 1),
            stores: state.stores.reduce((pre, store) => {
                pre.push(store - 1);
                return pre;
            }, []),
        }));
    };

    // 返回柱状图的配置对象
    getOption = (sales, stores) => {
        return {
            grid: {
                //布局排版
                height: "74%",
            },
            title: {
                // 标题
                text: "各品牌手机销量和库存量",
                subtext: "纯属虚构",
            },
            tooltip: {
                // 提示框
                trigger: "axis",
                axisPointer: {
                    // 坐标轴指示器,触碰柱形触发
                    type: "shadow", // 行为。shadow|line
                },
            },
            legend: {
                // 图例
                data: ["销量", "库存"],
                right: "10%",
            },
            xAxis: {
                // x轴信息
                data: ["小米", "华为", "三星", "苹果", "OPPO", "荣耀"],
            },
            yAxis: {}, // y轴信息
            series: [
                {
                    name: "销量",
                    type: "bar",
                    data: sales,
                    itemStyle: {
                        normal: { color: "#37A2DA" },
                    },
                },
                {
                    name: "库存",
                    type: "bar",
                    data: stores,
                    itemStyle: {
                        normal: { color: "#FFD85C" },
                    },
                },
            ],
        };
    };

    render() {
        const { sales, stores } = this.state;
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.update}>
                        更新
                    </Button>
                </Card>

                <Card title="柱状图">
                    <ReactEcharts option={this.getOption(sales, stores)} />
                </Card>
            </div>
        );
    }
}
