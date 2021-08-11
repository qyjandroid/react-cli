#!/usr/bin/env node
const path = require('path');
const ora = require('ora');
const fs = require('fs-extra');
const download = require('download-git-repo');
const { copyFiles, parseCmdParams, getGitUser, runCmd, log,checkInstallCnpm,checkInstallYarn} = require('../util');
const { exit } = require('process');
const inquirer = require('inquirer');
const { InquirerConfig, RepoPath } = require('../util/config');


/**
 * class 项目创建命令
 *
 * @description
 * @param {} source 用户提供的文件夹名称
 * @param {} destination 用户输入的create命令的参数
 */
class Creator {
  constructor(source, destination, ops = {}) {
    this.source = source;
    this.cmdParams = parseCmdParams(destination);
    this.RepoMaps = Object.assign({
      repo: RepoPath,
      temp: path.join(__dirname, '../../__temp__'),
      target: this.genTargetPath(this.source)
    }, ops);
    this.gitUser = {};
    this.spinner = ora();
    this.init();
  }

  // 生成目标文件夹的绝对路径
  genTargetPath(relPath = 'react-ts-template') {
    return path.resolve(process.cwd(), relPath);
  }

  // 初始化函数
  async init() {
    try {
      //检查文件夹是否存在
      await this.checkFolderExist();
      //下载github 项目
      await this.downloadRepo();
      //拷贝文件
      await this.copyRepoFiles();
      //更新package.json
      await this.updatePkgFile();
      //初始化git
      await this.initGit();
      //清除临时文件
      await this.clearTempFile();
      //运行app
      await this.runApp();
    } catch (error) {
      console.log('')
      log.error(error);
      exit(1)
    } finally {
      this.spinner.stop();
    }
  }

  // 监测文件夹是否存在
  checkFolderExist() {
    return new Promise(async (resolve, reject) => {
      const { target } = this.RepoMaps
      // 如果create附加了--force或-f参数，则直接执行覆盖操作
      if (this.cmdParams.force) {
        await fs.removeSync(target)
        return resolve()
      }
      try {
        // 否则进行文件夹检查
        const isTarget = await fs.pathExistsSync(target)
        if (!isTarget) return resolve()

        const { recover } = await inquirer.prompt(InquirerConfig.folderExist);
        if (recover === 'cover') {
          await fs.removeSync(target);
          return resolve();
        } else if (recover === 'newFolder') {
          const { inputNewName } = await inquirer.prompt(InquirerConfig.rename);
          this.source = inputNewName;
          this.RepoMaps.target = this.genTargetPath(`./${inputNewName}`);
          return resolve();
        } else {
          exit(1);
        }
      } catch (error) {
        log.error(`[rta]Error:${error}`)
        exit(1);
      }
    })
  }

  // 下载repo资源
  downloadRepo() {
    this.spinner.start('正在拉取项目模板...');
    const { repo, temp } = this.RepoMaps
    return new Promise(async (resolve, reject) => {
      await fs.removeSync(temp);
      download(repo, temp, async err => {
        if (err) return reject(err);
        this.spinner.succeed('模版下载成功');
        return resolve()
      })
    })
  }

  // 拷贝repo资源
  async copyRepoFiles() {
    const { temp, target } = this.RepoMaps
    await copyFiles(temp, target, ['./git', './changelogs']);
  }

  async clearTempFile(){
    this.spinner.start('正在清除临时文件...');
    const { temp } = this.RepoMaps
    await fs.removeSync(temp);
    this.spinner.succeed('临时文件清除成功'); 
  }

  // 更新package.json文件
  async updatePkgFile() {
    this.spinner.start('正在更新package.json...');
    const pkgPath = path.resolve(this.RepoMaps.target, 'package.json');
    const unnecessaryKey = ['keywords', 'license', 'files']
    const { name = '', email = '' } = await getGitUser();

    const jsonData = fs.readJsonSync(pkgPath);
    unnecessaryKey.forEach(key => delete jsonData[key]);
    Object.assign(jsonData, {
      name: this.source,
      author: name && email ? `${name} ${email}` : '',
      provide: true,
      version: "1.0.0"
    });
    await fs.writeJsonSync(pkgPath, jsonData, { spaces: '\t' })
    this.spinner.succeed('package.json更新完成！');
  }

  // 初始化git文件
  async initGit() {
    this.spinner.start('正在初始化Git管理项目...');
    await runCmd(`cd ${this.RepoMaps.target}`);
    process.chdir(this.RepoMaps.target);
    await runCmd(`git init`);
    this.spinner.succeed('Git初始化完成！');
  }

  // 安装依赖
  async runApp() {
      let name="npm";
    try {
        const yarnName=await checkInstallYarn();
        const cnpmName=await checkInstallCnpm();
        this.spinner.start('正在安装项目依赖文件，请稍后...');
        if(yarnName==="yarn"){
            name=yarnName;
            await runCmd(`yarn install --registry=https://registry.npm.taobao.org`);
        }else if(cnpmName=="cnpm"){
            await runCmd(`cnpm install`);
        }else{
            await runCmd(`npm install --registry=https://registry.npm.taobao.org`);
        }
        this.spinner.succeed('依赖安装完成！'); 
        console.log('请运行如下命令启动项目吧：\n');
        log.success(`   cd ${this.source}`);
        log.success(`   ${name} start`);
    } catch (error) {
      console.log('项目安装失败，请运行如下命令手动安装：\n');
      log.success(`   cd ${this.source}`);
      log.success(`   ${name} install`);
    }
  }

}

module.exports = Creator;
