#### 1.用户名/密码的合法性要求：

    1). 必须输入
    2). 必须大于4位
    3). 必须小于12位
    4). 必须是英文、数字或者下划线组成

![image.png](https://i.loli.net/2020/06/25/7IrM6CAyxNRfovq.png)
####### 注：里面的一些方法是antd3.0时候的了，如getFieldDecorator方法，避免使用！知道有这三种方式就行了。

#### 2.async和await 
    1）作用？
    简化promise对象的使用：不用再使用then()来指定成功/失败的回调函数，
    以同步编码（没有回调函数了）方式实现异步流程

    2）哪里写await？
    在返回promise的表达式左侧写await：不想要promise，
    想要promise异步执行的成功的value数据
    
    3）哪里写async？
    await所在函数（最近的）定义的左侧写async