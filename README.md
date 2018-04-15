多终端响应式资讯类网站
===
1、项目介绍
---
基于flex布局+media query的多终端响应式设计；使用Ajax技术（axios）从网络免费API接口获取新闻数据，JavaScript DOM操作和Vue计算属性方式实现新闻卡片的懒加载。

2、程序源码
---
1. main.js 入口文件
2. App.vue 根组件
*   页面头部HTML
*   资讯内容的路由出口<router-view>
*   主数据，资讯类别等
*   API接口请求JSON数据
*   主样式CSS
3. topNews组件
*   新闻卡片HTML模板
*   计算属性取得图片url
*   新闻卡片CSS

3、技术运用
---
### 3.1. 响应式设计
采用flex布局结合媒体查询media query,实现PC端和移动端的响应式设计。
```css
/* 新闻卡片盒子 */   
.news-card {
	margin: 0 0 20px 0;
	border: 1px solid #d1d0ce;
}
@media screen and (max-width: 414px) {
    /*手机端单栏新闻卡片居中*/
    #news-container {
        justify-content: center;
    }
    .news-card {
        flex: 0 1 90%;  /* 手机端单栏 */
    }
}
@media screen and (min-width: 415px) and (max-width: 1024px) {
    .news-card {
        flex: 0 1 45%;  /* pad端双栏 */
    }
}
@media screen and (min-width: 1025px) {
    .news-card {
        flex: 0 1 30%;  /* PC端双栏 */
    }
}
```
```css
/*标题、类别响应式*/
#news-classify {
    text-align: center;
}
#news-classify h2 {
    display: inline-block;
    line-height: 30px;
}
@media screen and (max-width:414px) {
    #news-classify h2 {
        display: block;
    }
}
.news-select {
    width: 300px;
    height: 30px;
    border: 1px solid #b62;
    cursor: pointer;
    outline: none;
}
@media screen and (max-width:720px) {
    .news-select {
        width: 150px;
    }
}
```

### 3.2. axios跨域请求

从聚合数据免费API接口获取JSON。跨域请求，axios不支持跨域。学习了解跨域请求的多种方法，包括JSONP、CORS、HTML5的window。postMessage方法。

Vue可以通过Vue-cli配置webpack,在config/index.js中的proxyTabl选项，实现跨域。 
```javascript
proxyTable: {
    '/api': {
        target: 'http://v.juhe.cn',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/'
        }
    }
}
```
调试过程踩坑不少，总结如下：
* 注意target只是域名(可以不包含端口)
* 配置完后要重新启动npm run dev 
* 组件中用axios进行get传递的url要把域名替换为api
```javascript
// 注意url用/api/rewrite
const juheBaseUrl = '/api/toutiao/index?type=';
```
调试技巧：
* 充分利用浏览器的开发者工具，在Network查看http的request和response状态和数据
* 利用Vue-loader查看组件，是否获取JSON数据

### 3.3 前、后端数据的对接
该API接口的请求参数（资讯类别）是拼音，返回不同类别的资讯JSON数据。

在页面头部选择资讯类别的选项卡，如果用v-for指令遍历请求参数数组，渲染的文本是拼音，体验很不好。解决方案：建立一个对象，键（key）为请求参数，值（value）为对应的中文，用v-for遍历对象，v-model绑定key,v-text绑定value。

### 3.4 组件和路由
资讯内容卡片的单文件组件：可复用，从而渲染多个板块的资讯。

### 3.5 内容不定高多行多列卡片设置等高的CSS布局
------更新-----  
使用flex布局 + max-width和min-width简易实现响应式布局，有了flex布局，内容不定高多行多列设置等高的问题就不再是问题了。  
以下为原文：
>由于资讯内容是随机的，长短不一，所以资讯卡片的高度如果为默认auto，卡片高度不一，要采用瀑布流布置。  
我倾向用等高盒模型，对于这里的内容不定高多行多列卡片设置等高的CSS布局，[点击](http://blog.csdn.net/alcantara/article/details/77416133 '【更新--多行多列解决方案】不定高多栏设置等高的方法（正padding+负margin）')看我的博客专栏。

### 3.6 计算属性为添加图片url，map()与forEach()方法使用区别
对原始数组results的每一项添加图片URL。  
map()方法
```javascript
computed: {
	processedPosts() {
	// 给每一项添加img_url
	let posts = this.result;
	return posts.map(post => {
		       let url = post.thumbnail_pic_s;
		       post.img_url = url?url:'http://placehold.it/300x200?text=N/A';
		       return post;  // 注意一定要返回post
	       });
	}
}
```
forEach()方法
```javascript
computed: {
	processedPosts() {
	// 给每一项添加img_url
	let posts = this.result;
	posts.forEach(post => {
	       let url = post.thumbnail_pic_s;
	       post.img_url = url?url:'http://placehold.it/300x200?text=N/A';
	       return post;  // 注意一定要返回post
    });
    return posts;  // 注意，对原数组posts进行了更改，最后返回这个新的数组
	}
}
```