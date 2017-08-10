# pullload

上拉加载更多

组件只判断是否加载更多， 业务逻辑由使用者编写

## Install

```
npm install pullload --save-dev
```

## Usage

```javascript
new Pullload({
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
new Pullload({
    container : '#main',
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
