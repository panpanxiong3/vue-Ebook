# vue-Ebook
基于Vue3.0制作的小说阅读器 webapp


<h3>项目技术难点分析</h3>
<p>
一、阅读器开发：分页算法、全文搜索算法、引入Web字体、主题设置 <br/>
二、离线存储缓存机制：LocalStorage + IndexedDB <br/>
三、实现各种复杂手势 + 交互动画、 如何兼容手势 + 鼠标操作 <br/>
四、利用vuex + mixin 实现组件复用 + 解耦，大大精简代码量 <br/>
五、利用es6 优雅的实现数据结构变化 <br/>
六、科大讯飞api在线语音合成API开发 <br/>
</p>

<h4>项目准备</h4>
<p>
* 字体准备 <br/>
* 项目依赖包下载 + 项目配置  <br/>
* 准备Web 字体 <br/>
* viewport 配置 <br/>
* rem 设置 + 自适应布局实现思路 <br/>
* global.scss + reset.scss <br/>
* 引入Vuex <br/>  
</p>

<h4>搭建静态资源服务器</h4>

<p>
* Nginx 安装 <br/>
* 配置文件 <br/>
* 常见问题及处理方法 <br/>
</p>

<h2>需求分析</h2>
阅读器-> 解析分析 -> 字号 + 字体 -> 主题 -> 进度 -> 目录 -> 搜索 -> 书签 -> 页眉 + 页脚 -> 分页（难点）

<h3>技术难点</h2>
1.epub.js <br/>
2.vuex + mixin <br/>
3.vue-i18n 实现国际化 <br/>
4.动态切换主题 + 书签操作手势


