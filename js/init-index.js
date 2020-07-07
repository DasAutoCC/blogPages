//在页面加载前进行一些初始化的工作

var isLogin  = "朋友"; //公共变量，存储用户登录数据
var welcome  ="海内存知己,天涯若比邻"; //欢迎词,从服务端获取,如果获取不到就默认用这个
var isHidden = false; //博客列表是否是收起状态


$.get("./json/login.json",{},function(data){
	if(data.respCode==1){
		isLogin = data.data;
	}
});

$.get("./json/welcone.json",{},function(data){
	if(data.respCode==1){
		welcome = data.data;
	}
});

