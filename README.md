# react-cli
react项目脚手架，与react-project-tmp 配合使用

### 项目目录结构
```markdown
react-cli
├──  src
│ │  ├──index.js # 源码导出
│ │  ├──commands # 命令集合
│ │  │  └──CreateCommand.js # 项目命令类
│ │  ├──utils #  命令工具目录
│ │  │  ├──index.js # 命令工具包集合
│ │  │  └──config.js # 项目模板git目录配置以及交互命令配置
├── yarn.lock # 锁定 npm 包依赖版本文件
├── package.json
└──  README.md
```

### tips

- 项目流程：

- 检查文件夹

- 下载react-project-tmp 模板

- 拷贝文件到指定目录

- 修改项目中的package.json中的name,author 等字段

- 初始化git 

- 删除临时文件

- 安装项目依赖
  

### 安装

```js
    npm install quanyj-react-cli -g
```

### 使用

```js
    react-cli create 项目名称 -f
```