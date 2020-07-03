import React from "react";
import "./index.less";

/* 
通用组件：外形像链接的按钮
(不然编辑器控制台总是警告！)
*/
export default function LinkButton(props) {
    return <button {...props} className="link-button"></button>;
}
