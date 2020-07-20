import React, { Component } from "react";
import { Card, Form, Input, Cascader, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";
import { reqCategorys, reqAddOrUpdateProduct } from "../../api";
import PicturesWall from "./pictures-wall";
import RichTextEditor from "./rich-text-editor";
import memoryUtils from "../../utils/memoryUtils";

const { Item } = Form;
const { TextArea } = Input;

// 商品的添加和更新的子路由
export default class ProductAddUpate extends Component {
    // formRef = React.createRef();

    constructor(props) {
        super(props);
        // 创建用来保存ref标识的标签对象的容器
        this.pw = React.createRef();
        this.rte = React.createRef();
    }

    state = {
        options: [],
    };

    // 验证价格的自定义验证函数
    validatePrice = (_, value) =>
        value * 1 > 0 ? Promise.resolve() : Promise.reject("价格必须大于0");

    // 表格提交
    handSubmit = async (values) => {
        // 1. 搜集数据,并封装成product对象
        const { name, desc, price, categoryIds } = values;
        let pCategoryId, categoryId;
        if (categoryIds.length === 1) {
            categoryId = categoryIds[0];
        } else {
            pCategoryId = categoryIds[0];
            categoryId = categoryIds[1];
        }
        const imgs = this.pw.current.getImgs();
        const detail = this.rte.current.getDetail();

        const product = {
            name,
            desc,
            price,
            imgs,
            detail,
            pCategoryId,
            categoryId,
        };
        // console.log("product", product);
        // 如果是更新,需要添加_id属性
        if (this.isUpdate) {
            product._id = this.product._id;
        }

        // 2. 调用接口请求函数去添加/更新
        const result = await reqAddOrUpdateProduct(product);
        // 3.根据结果提示
        if (result.status === 0) {
            message.success(`${this.isUpdate ? "更新" : "添加"}商品成功！`);
            this.props.history.goBack();
        } else {
            message.error(`${this.isUpdate ? "更新" : "添加"}商品失败！`);
        }
    };

    initOptions = async (categorys) => {
        // 根据categorys生成(初始state中的)options数组
        const options = categorys.map((item) => ({
            value: item._id,
            label: item.name,
            isLeaf: false,
        })); // 对象外层的小括号不能少(丢)

        // 解决修改商品界面二级分类商品级联的初始值不显示子项的问题(即我们要做二级项的数据加载才能显示)
        const { pCategoryId } = this.product;
        if (this.isUpdate && pCategoryId !== "0") {
            // 获取对应的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId);
            // 生成二级下拉列表的子项(options)
            const childOptions = subCategorys.map((item) => ({
                //遍历二级各项到显示，跟一级遍历处理操作相同
                value: item._id,
                label: item.name,
                isLeaf: true,
            }));

            // 先找到当前初始值商品对应的一级option对象
            const initOption = options.find(
                (option) => option.value === pCategoryId
            );
            // 然后关联到对应初始显示的一级的option上
            initOption.children = childOptions;
        }

        // (有数据当然要更新原来空的options状态)更新options状态
        this.setState({ options });
        // 不要这么写options : [...options],因为此时options已是由我们前面创建的全新数组
    };

    /* 异步获取级联一级/二级分类列表并显示
	async函数的返回值是一个新的promise对象,promise的结果和值由async的结果来决定*/
    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId);

        if (result.status === 0) {
            const categorys = result.data;
            if (parentId === "0") {
                // 如果是一级列表
                this.initOptions(categorys);
            } else {
                // 如果是二级列表
                return categorys; // 返回二级列表 =>即当前async函数返回的promise就会走resolve且value为categorys
            }
        }
    };

    // 用于(点选中时)加载下一级列表的回调函数
    loadData = async (selectedOptions) => {
        // 得到(当前)选择的option对象
        const targetOption = selectedOptions[0]; // 一级项
        targetOption.loading = true; // 显示右侧的loading效果

        // 根据选中的(一级)分类,请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value);
        targetOption.loading = false; // 隐藏loading

        if (subCategorys && subCategorys.length > 0) {
            const childOptions = subCategorys.map((item) => ({
                //遍历二级各项到显示，跟一级遍历处理操作相同
                value: item._id,
                label: item.name,
                isLeaf: true,
            }));
            // 关联到当前一级选中的option上
            targetOption.children = childOptions;
        } else {
            // 当前选中的分类没有下一级分类子项
            targetOption.isLeaf = true;
            /* 这里说的是有些一级项没有二级子项就做'去除'叶子(叶子:右边的箭头)的处理,
			因为一开始我们遍历不知道是否有,都给了有,查了发现没有去除*/
        }

        // 更新options状态
        this.setState({
            options: [...this.state.options],
        });
    };

    componentDidMount() {
        this.getCategorys("0"); // 无前置事件监听所以要先准备数据
    }

    UNSAFE_componentWillMount() {
        // 取出上一级路由跳转携带的state,但我们添加和更新用的是同一个路由,如果添加有值,更新没值
        const record = memoryUtils.product;
        this.isUpdate = !!record._id; // 保存是否是更新的标识,这个运算符可以把表达式强行转换为 逻辑值。
        // (或许会问为啥不用！?? undefined也是有值吧,而这个属性也是固有属性，!!可达到快速判断值非空的目的)
        this.product = record || {}; // 取出并保存到本地以便能调用,做对应处理可能为空
    }

    // 在卸载之前清楚保存的数据
    componentWillUnmount() {
        memoryUtils.product = {};
    }

    render() {
        const { isUpdate, product } = this;
        const { pCategoryId, categoryId, imgs, detail } = product;
        // 用来接收级联分类id的数组
        const categoryIds = [];
        if (isUpdate) {
            if (pCategoryId === "0") {
                // 商品是一个一级分类商品
                categoryIds.push(categoryId);
            } else {
                // 商品是一个二级分类商品
                categoryIds.push(pCategoryId);
                categoryIds.push(categoryId);
            }
        }
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined
                        style={{
                            color: "green",
                            marginRight: 10,
                            fontSize: 20,
                        }}
                    />
                </LinkButton>
                <span>{isUpdate ? "修改商品" : "添加商品"}</span>
            </span>
        );

        const itemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        };

        return (
            <Card title={title}>
                <Form
                    {...itemLayout}
                    // ref={this.formRef}
                    onFinish={this.handSubmit}
                >
                    <Item
                        name="name"
                        initialValue={product.name}
                        label="商品名称"
                        rules={[
                            {
                                required: true,
                                message: "请输入商品名称!！",
                            },
                        ]}
                    >
                        <Input placeholder="请输入商品名称" />
                    </Item>
                    <Item
                        name="desc"
                        initialValue={product.desc}
                        label="商品描述"
                        rules={[
                            {
                                required: true,
                                message: "请输入商品描述!！",
                            },
                        ]}
                    >
                        <TextArea
                            placeholder="请输入商品描述"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                        ></TextArea>
                    </Item>
                    <Item
                        label="商品价格"
                        name="price"
                        initialValue={product.price}
                        rules={[
                            {
                                required: true,
                                message: "请指定商品的价格区间!！",
                            },
                            { validator: this.validatePrice },
                        ]}
                    >
                        <Input
                            type="number"
                            placeholder="请输入商品价格"
                            addonAfter="元"
                        />
                    </Item>
                    <Item
                        label="商品分类"
                        name="categoryIds"
                        initialValue={categoryIds}
                        rules={[
                            { required: true, message: "请指定商品的分类!！" },
                        ]}
                    >
                        <Cascader
                            placeholder="请指定商品分类"
                            options={this.state.options} //需要显示的列表数据数组
                            loadData={this.loadData} //当选择某个列表项,加载下一级列表的监听回调
                        />
                    </Item>
                    <Item label="商品图片">
                        <PicturesWall ref={this.pw} imgs={imgs} />
                    </Item>
                    <Item
                        label="商品详情"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <RichTextEditor ref={this.rte} detail={detail} />
                    </Item>
                    <Item style={{ marginLeft: 30 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Item>
                </Form>
            </Card>
        );
    }
}
