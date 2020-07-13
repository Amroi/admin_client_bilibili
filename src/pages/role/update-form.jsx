import React, { Component } from "react";
import { Tree, Input, Form } from "antd";
import PropTypes from "prop-types";
import menuList from "../../config/menuConfig";

const { Item } = Form;
const { TreeNode } = Tree;

export default class UpdateForm extends Component {
    static propTypes = {
        role: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        const { menus } = this.props.role;

        // 根据传入的角色menus生成初始状态
        this.state = {
            checkedKeys: menus,
        };
    }

    // 为父组件提供获取最新的menus(这个checkKeys状态改变完全内部自己实现不依赖父组件,所以父组件拿需要定义ref)
    getMenus = () => this.state.checkedKeys;

    getTreeNode = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNode(item.children) : null}
                </TreeNode>
            ); // 跟左侧导航栏差不多的(做)写法，但是要简单点因为它只有TreeNode标签

            return pre;
        }, []);
    };

    // 选中某个node时的回调
    onCheck = (checkedKeys) => {
        console.log("onCheck", checkedKeys);
        this.setState({ checkedKeys }); // 改变所有选中node的状态
    };

    componentWillMount() {
        this.treeNode = this.getTreeNode(menuList);
    }

    /* 当组件接受到新的props时自动调用(render前做准备)
	解决二次打开默认选择初始值不更新的问题 */
    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps", nextProps);
        const menus = nextProps.role.menus;
        this.setState({ checkedKeys: menus });
        // this.state.checkedKeys = menus;
    }

    render() {
        console.log("render");
        const { role } = this.props;
        const { checkedKeys } = this.state;

        return (
            <div>
                <Item
                    label="角色名称"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Input value={role.name} disabled />
                </Item>

                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                >
                    <TreeNode title="平台权限" key="all">
                        {this.treeNode}
                    </TreeNode>
                </Tree>
            </div>
        );
    }
}
