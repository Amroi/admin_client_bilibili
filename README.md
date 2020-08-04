## 项目的结构及说明：

### a. 前后台分离的项目:

    1. 后台应用负责处理前台应用提交的请求，并给前台应用返回json数据
    2. 前台应用负责展现数据，与用户交互，与后台应用交互

### b. 技术栈：
	
	1. 后台应用：...
	2. 前台数据展示/交互/组件化： react/react-router-dom/antd/redux
	3. 前台后交互：axios/jsonp/ promise/async/await 接口测试工具：postman
	4. 模块化：ES6/CommonJS
	5. 项目构建/工程化：webpack/ceate-react-app/eslint
	6. 其他：富文本编辑器：react-draft-wysiwyg 图表库：echarts

### c. 文件结构

![image.png](https://i.loli.net/2020/08/04/xgKdT3kIA7BHNbG.png)

	1. api: ajax相关
	2. assets: 公用资源
	3. components：非路由组件
	4. config：项目配置
	5. pages: 路由组件
	6. utils：工具模块
	7. App.js: 应用根组件
	8. index.js: 入口js

### d. 路由配置

![image.png](https://i.loli.net/2020/08/04/ZdoIXE3lChcGDAb.png)

### e. 项目主要界面展示

> 登陆界面(重定向路由和路由守卫)

![image.png](https://i.loli.net/2020/08/04/TgzimNb3wBqecPA.png)
 
> 主界面

![image.png](https://i.loli.net/2020/08/04/Mmc9vnrUYtblBzO.png)

> 商品管理

![image.png](https://i.loli.net/2020/08/04/1fRxMCWaS25TgAk.png)

> 角色管理

![image.png](https://i.loli.net/2020/08/04/di6AyIYZjt1Q7ru.png)

