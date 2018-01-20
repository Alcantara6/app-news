                             Vue/axios打造资讯类网站
==================================================================================
1、项目介绍
---
本项目使用Vue-cli脚手架构建单页资讯网页，利用axios从免费API接口获取资讯，实时更新。

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
### 3.1. axios跨域请求

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
由于资讯内容是随机的，长短不一，所以资讯卡片的高度如果为默认auto，卡片高度不一，要采用瀑布流布置。

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