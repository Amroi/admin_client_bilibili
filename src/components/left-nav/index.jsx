import React, { Component } from "react";
import logo from "../../assets/images/logo.png";
import "./index.less";
import { Link, withRouter } from "react-router-dom";
import menuList from "../../config/menuConfig";
import { Menu } from "antd";
import { Icon } from "@ant-design/compatible"; // 4.0已经废弃，但能兼容
const { SubMenu } = Menu; // 菜单下的菜单项

// 左侧导航的组件
class LeftNav extends Component {
    /* 
	根据menu的数据数组生成对应的标签数组,使用map() + 递归调用。
	 (相比下面的，动态生成结构，只是antd4.0图标的表示方法不能这么表示了(组件方式),
	 未能想到用于此方法怎么表示图标)
	 */
    getMenuNodes_map = (menuList) => {
        return menuList.map((item) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            {item.title}
                        </Link>
                    </Menu.Item>
                );
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} /> {item.title}
                            </span>
                        }
                    >
                        {this.getMenuNodes_map(item.children)}
                        {/*递归调用,这里根据children数组去生成*/}
                    </SubMenu>
                );
            }
        });
    };

    /*
	另一种实现方法reduce()累加器方法,reduce() + 递归调用,实现结果相同。
	(以后可根据个人熟练程度选择方法实现)
	*/
    getMenuNodes_reduce = (menuList) => {
        // 得到当前请求路径
        const path = this.props.location.pathname;

        return menuList.reduce((pre, item) => {
            // 原理：pre初始设定为[](空数组),每次向里面填加标签(push()方法),一次结束时并返回pre
            // 一样地。判断后,向pre填加<Menu.Item></Menu.Item>
            if (!item.children) {
                pre.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            {item.title}
                        </Link>
                    </Menu.Item>
                );
            } else {
                // 查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find((cItem) => cItem.key === path);
                // 如果存在,说明当前的item子列表需要打开
                if (cItem) {
                    this.openKey = item.key;
                }

                // 向pre添加<SubMenu></SubMenu>
                pre.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} /> {item.title}
                            </span>
                        }
                    >
                        {this.getMenuNodes_reduce(item.children)}
                        {/*递归调用,这里根据children数组去生成*/}
                    </SubMenu>
                );
            }
            return pre; // 不断地返回pre
        }, []);
    };

    /*
	 这个生命周期函数,在第一次render()之前执行一次,为第一次render()准备数据(是同步准备)。
	 Why use？因为我们在render()里面的变量openKey是在下面这个方法中产生的,
	 不先使用下面的方法会是undefined结果,在render()先使用必然会出现多次渲染,都不是很好的处理。
	*/
    componentWillMount() {
        this.menuNodes = this.getMenuNodes_reduce(menuList);
    }

    render() {
        // 得到当前请求的路由路径
        const path = this.props.location.pathname;

        const openKey = this.openKey;
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo" />
                </Link>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    {this.menuNodes}
                </Menu>
            </div>
        );
    }
}

export default withRouter(LeftNav);
