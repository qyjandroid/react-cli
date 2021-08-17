<h1 align="center">Welcome to quanyj-react-cli 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/quanyj-react-cli" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/quanyj-react-cli.svg">
  </a>
  <img src="https://img.shields.io/badge/npm-%3E%3D6.14.6-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D12.18.4-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> react项目脚手架

### 🏠 [Homepage](https://github.com/qyjandroid/react-cli)

## Prerequisites

- npm >=6.14.6
- node >=12.18.4
  
## 项目目录结构
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

## Tips

- 项目流程：

- 检查文件夹

- 下载react-project-tmp 模板

- 拷贝文件到指定目录

- 修改项目中的package.json中的name,author 等字段

- 初始化git 

- 删除临时文件

- 安装项目依赖
  
## Install

```sh
npm install quanyj-react-cli -g
```

## Usage

```sh
react-cli create 项目名称 -f
```

## Author

👤 **quanyj <qyjandroid@163.com>**

* 掘金: https://juejin.cn/user/923245496789255
* Github: [@qyjandroid](https://github.com/qyjandroid)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/qyjandroid/react-cli/issues). You can also take a look at the [contributing guide](https://github.com.cnpmjs.org/qyjandroid/react-cli/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_