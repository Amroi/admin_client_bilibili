import React from "react";
import PropTypes from "prop-types";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqDeleteImg } from "../../api";
import { BASE_IMG_URL } from "../../utils/constants";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

// 用于图片上传的组件
export default class PicturesWall extends React.Component {
    static propTypes = {
        imgs: PropTypes.array, //这次是不用加required了,因为此组件下有可能是增加商品
    };

    constructor(props) {
        // constructor函数里定义的初始值(state)对象可以先做一些预处理
        super(props);
        let fileList = [];

        // 若是(父级)有imgs属性传入
        const { imgs } = this.props;
        if (imgs && imgs.length > 0) {
            fileList = imgs.map((img, index) => ({
                uid: -index, // 每个file文件都有自己唯一的id
                name: img, // 图片文件名
                status: "done", // 图片状态: done-已上传,uploading-正在上传中,removed-已删除
                url: BASE_IMG_URL + img, // 图片地址
            }));
        }
        this.state = {
            previewVisible: false, //是否显示大图预览Modal的标识
            previewImage: "", // 预览Modal中大图的url
            fileList, // 所有已上传图片的数组
        };
    }

    // 获取所有已上传图片文件名的数组
    getImgs = () => {
        return this.state.fileList.map((file) => file.name);
    };

    // (取消按钮)隐藏预览图片的Modal
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async (file) => {
        console.log("handlePreview()", file); // 单个图片文件
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        // 显示指定file对应的大图
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    /* 监视上传过程的函数
	file: 当前操作的图片文件(上传/删除)
	fileList: 所有已上传图片文件对象的数组 */
    handleChange = async ({ file, fileList }) => {
        console.log("handleChange()", file.status, fileList.length, file);

        // 一旦上传成功,将当前上传的file的信息修正(name,url)(因为要跟接口参数保持一致)
        if (file.status === "done") {
            const result = file.response; // =>{status:0,data:{name:'xxx.jpg',url:'图片地址'}}
            if (result.status === 0) {
                message.success("上传图片成功!");
                const { name, url } = result.data;
                file = fileList[fileList.length - 1]; // 要指定某个对应好,不然都不知道下面两个属性传递给哪个file
                file.name = name;
                file.url = url;
            } else {
                message.error("上传图片失败!");
            }
        } else if (file.status === "removed") {
            const result = await reqDeleteImg(file.name);
            if (result.status === 0) {
                message.success("删除图片成功!");
            } else {
                message.error("删除图片失败!");
            }
        }

        // 在操作(上传/删除)过程中更新fileList状态,让界面(图片)渲染
        this.setState({ fileList });
    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div>上传</div>
            </div>
        );

        return (
            <div>
                <Upload
                    action="http://39.100.225.255:5000/manage/img/upload" // 上传图片的接口地址
                    accept="image/*" // 只接受图片格式
                    listType="picture-card" // 展示为卡片样式
                    name="image" // 请求参数名
                    fileList={fileList} // 所有已上传图片文件对象的数组
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>

                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage}
                    />
                </Modal>
            </div>
        );
    }
}
