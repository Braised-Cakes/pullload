# pullload

上拉加载更多

组件只判断是否加载更多， 业务逻辑由使用者编写

如果body高度小于可视区高度时，会重复调用pullload，使用者不需要关心回调数据过少的情况

## demo

[点击demo查看](https://braisedcakes666.github.io/pullload/index.html)

![demo地址](./qrcode.png)

## Install

```
npm install pullload --save-dev
```

## Usage

```javascript
//支持amd，cmd，umd等方式调用

import { pullload } from 'pullload'
const { pullload } = require('pullload')

new pullload({

    //onScrollEnd 为 加载更多时的回调
    onScrollEnd : function(pullload){
    }
})
```

## Options

Name     | Default | Description
:------- | :------ | -------------------------
distance | 30      | 加载下一屏的判定条件（距离页面底部距离）,单位px

## Methods

Method | Description
:----- | :----------
stop   | 停止
start  | 启动
tick   | 业务逻辑执行完毕

## Example

```javascript
var page = 1;
new pullload({
    onScrollEnd : function(pullload){
        $.ajax({
            url: 'http://cmnt.sina.cn/aj/v2/index?page=' + page++,
            success: function(rs) {
                if(rs.data.length == 0){
                    pullload.stop();
                }
                var str = '';
                rs.data.forEach(function(item, index) {
                    str += '<div></div>';
                })
                $('body').append(str);
                //当dom操作执行完毕后， 需要运行该方法， 以允许下一次判断
                pullload.tick();
            }
        })
    }
})
```
