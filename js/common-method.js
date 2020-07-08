//省略开头动画
$(".content").addClass("contentLater");
$(".index").remove();

//发送异步ajax请求获取博客列表
function showBolgList(){
	$.get("./json/bolg-list.json","",function(data){
		data = data.data;
		var html;
		for(var i = 0 ; i<data.length ; i++) {
			html = data[i]+"<br />"+html;
		}
		$(".innerContentLeft").html(html);
	})
}
//内容区域展示博客列表
function showContentBolgList(){
	//先填充内容
	
	$(".blogNavigationBar").css("display","none")
	$(".blogContent").css("display","none")
	$(".contentList").css("display","block")
}
//内容区域展示博客详情
function showContentBolgDetails(){
	//先填充内容
	
	$(".blogNavigationBar").css("display","block")
	$(".blogContent").css("display","block")
	$(".contentList").css("display","none")
}
					

//这里直接调用方法获取博客的方法了，先获取到用来直接展示
showBolgList();

//主动隐藏页面遮罩函数
function init(){
	$(".index").addClass("hiddenIndex");
	$(".content").addClass("contentLater");
	setTimeout(function(){
		$(".index").remove();
	},2000);
}
//收起或展开博客列表
function hiddenBolgList(){
	$(".innerContentLeft").toggleClass("innerContentLeftFrames");
	$(".innerContentRight").toggleClass("innerContentRightFrames");
	if(isHidden){
		$("#gasga").html("展开博客列表");
		isHidden = false;
	}else{
		$("#gasga").html("收起博客列表");
		isHidden = true;
	}
}