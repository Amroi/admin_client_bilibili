import React, { Component } from "react";
import { Tree, Input, Form } from "antd";
import PropTypes from "prop-types";

const { Item } = Form;
const { TreeNode } = Tree;

export default class UpdateForm extends Component {
    static propTypes = {
        role: PropTypes.object.isRequired,
    };

    render() {
        const { role } = this.props;
        return (
            <div>
                <Item
                    label="角色名称"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Input value={role.name} disabled />
                </Item>

                <Tree>
                    <TreeNode title="平台权限"></TreeNode>
                </Tree>
            </div>
        );
    }
}
