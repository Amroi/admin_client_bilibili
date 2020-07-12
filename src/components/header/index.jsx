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
        currentTime: "", // 当前时间字符串
        weather: "", // 天气文本
        dayPictureUrl: "", // 白天天气图片url
        nightPictureUrl: "", // 夜间天气图片url
    };

    getTime = () => {
        this.timer = setInterval(() => {
            const currentTime = formateDate(new Date());
            this.setState({ currentTime });
        }, 1000);
    };

    getWeather = async () => {
        // 调用接口请求异步获取数据
        const { weather, dayPictureUrl, nightPictureUrl } = await reqWeather(
            "东莞"
        );
        this.setState({ weather, dayPictureUrl, nightPictureUrl });
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
                const cItem = item.children.find(
                    (cItem) => path.indexOf(cItem.key) === 0
                );
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
	一般在这个生命周期函数内执行异步操作。如：发送ajax请求/启动定时器。
	*/
    componentDidMount() {
        this.getTime();
        this.getWeather();
    }

    // 当前组件卸载(死亡)之前调用（就比如此页面有个退出按钮的之后）
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const {
            currentTime,
            weather,
            dayPictureUrl,
            nightPictureUrl,
        } = this.state;
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
                        <span className="time">{currentTime}</span>
                        <span>
                            <img src={dayPictureUrl} alt="白天天气" />
                        </span>
                        <span>
                            <img src={nightPictureUrl} alt="夜间天气" />
                        </span>
                        <span className="weather">{weather}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
