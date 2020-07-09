import React, { Component } from "react";
import PropTypes from "prop-types";
//富文本编辑器库官方文档解析见:'https://jpuri.github.io/react-draft-wysiwyg/#/demo';
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

// 用于商品详情的富文本编辑器组件
export default class RichTextEditor extends Component {
    static propTypes = {
        detail: PropTypes.string,
    };

    constructor(props) {
        super(props);
        const html = this.props.detail;
        if (html) {
            // 如果有值,根据HTML格式字符串创建一个对应的(富文本)编辑对象
            const contentBlock = htmlToDraft(html); // (转换)html语言标签文本
            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
            );
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        } else {
            this.state = {
                editorState: EditorState.createEmpty(), // 创建一个没有内容的编辑对象
            };
        }
    }

    // 输入过程中实时的回调
    onEditorStateChange = (editorState) => {
        // console.log("onEditorStateChange()");
        this.setState({
            editorState,
        });
    };

    getDetail = () => {
        // 返回输入数据对应的html格式的文本(return后的值官方demo在textarea的value中)
        return draftToHtml(
            convertToRaw(this.state.editorState.getCurrentContent())
        );
    };

    uploadImageCallBack = (file) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "http://39.100.225.255:5000/manage/img/upload");
            const data = new FormData();
            data.append("image", file);
            xhr.send(data);
            xhr.addEventListener("load", () => {
                const response = JSON.parse(xhr.responseText);
                const url = response.data.url; // 得到图片的url
                resolve({
                    data: {
                        link: url.replace(
                            "localhost:5000",
                            "39.100.225.255:5000"
                        ),
                    },
                });
            });
            xhr.addEventListener("error", () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                editorStyle={{
                    border: "1px solid black",
                    minHeight: 200,
                    paddingLeft: 10,
                }}
                toolbar={{
                    image: {
                        uploadCallback: this.uploadImageCallBack,
                        alt: { present: true, mandatory: true },
                    },
                }}
                onEditorStateChange={this.onEditorStateChange}
            />
        );
    }
}
