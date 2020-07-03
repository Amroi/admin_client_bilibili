import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { reqWeather } from "../../api";
import { formateDate } from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import "./index.less";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import menuList from "../../config/menuConfig";
import LinkButton from "../link-button";

class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()), // 当前时间字符串
        text_day: "", // 天气文本
    };

    getTime = () => {
        this.timer = setInterval(() => {
            const currentTime = formateDate(Date.now());
            this.setState({ currentTime });
        }, 1000);
    };

    getWeather = async () => {
        // console.log("reqWeather()", reqWeather());
        const { text_day } = await reqWeather(441900);
        this.setState({ text_day });
        // console.log("text_day", text_day);
    };

    getTitle = () => {
        const path = this.props.location.pathname;
        let title;
        menuList.forEach((item) => {
            if (item.key === path) {
                // 如果当前的item对象的key与path一样，item的title就是需要显示的title
                title = item.title;
            } else if (item.children) {
                // 在所有子item中查找匹配的
                const cItem = item.children.find((cItem) => cItem.key === path);
                //  这里能用find()方法了是因为只有一层数组了，上面用forEach()不用这个是因为有子item
                if (cItem) {
                    //如果有值才说明有匹配的，然后取出他的title
                    title = cItem.title;
                }
            }
        });
        return title;
    };

    logout = () => {
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: "确定要退出吗？",
            onOk: () => {
                this.props.history.replace("/login");
            },
            okText: "确定",
            cancelText: "取消",
        });
    };

    /*
	第一次render()之后执行一次
	一般在这个生命周期函数内执行异步操作如：发送ajax请求/启动定时器。
	*/
    componentDidMount() {
        this.getTime();
        this.getWeather();
    }

    // 当前组件卸载之前调用（就比如此页面有个退出按钮的之后）
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { currentTime, text_day } = this.state;
        const name = memoryUtils.user.username;

        // 得到当前需要显示的title
        const title = this.getTitle();

        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{name}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        {/* <img
                            src="http://api.map.baidu.com/images/weather/day/qing.png"
                            alt="weather"
                        /> */}
                        <span>{text_day}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
