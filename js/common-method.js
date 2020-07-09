//省略开头动画
//$(".content").addClass("contentLater");
//$(".index").remove();

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
function showContentBolgList(currentPage){
	var data ;
	var currentList = $(".blogList1");
	$.get("./json/contentBlog-list.json",{"currentPage":currentPage},function(back){
		data = back.data;
		for(i = 0 ; i<= 7&&i<=data.length-1;i++){
			currentList.children().html(data[i].details);
			currentList.children().attr("id",data[i].id)
			currentList = currentList.next();
		}
		if(data.length<8){
			for(i=0;i<8-data.length+2;i++){
				currentList.css("display","none")
				currentList = currentList.next();
			}
		}
	})
	//先填充内容
	$("#blogDetails").css("display","none");
	$("#listBlog").css("display","block");
}
//内容区域展示博客详情
function showContentBolgDetails(BlogID){
	
	$(".blogContent").html(BlogID);
	
    $('body,html').animate({ 
        scrollTop:200 
    },700);
	//先填充内容
	$("#listBlog").css("display","none");
	$("#blogDetails").css("display","block");
	
	
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