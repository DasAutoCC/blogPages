//省略开头动画
//$(".content").addClass("contentLater");
//$(".index").remove();



//内容区域展示博客列表
function showContentBolgList(PageNumber){
	//先填充内容
	var data ;
	var currentList = $(".blogList1");
	//这里发送ajax请求当前页面的数据，并且将获取到的内容
	//的id依次修改到列表的每个div内的a标签上，每个a标签的id是博客的id
	//用来当作获取博客详情的参数
	$.get("./json/contentBlog-list.json",{"PageNumber":PageNumber},function(back){
		data = back.data;
		for(i = 0 ; i<= 7&&i<=data.length-1;i++){
			currentList.children().html(data[i].details);
			currentList.children().attr("id",data[i].id);
			currentList = currentList.next();
		}
		//判断当前页是否不满8个，如果不满8个就把除了有内容的div外的其他div进行display:none操作
		if(data.length<8){
			for(i=0;i<8-data.length ;i++){
				currentList.css("display","none")
				currentList = currentList.next();
			}
		}
	})
	//再显示内容
	$("#blogDetails").css("display","none");
	$("#listBlog").css("display","block");
}
//内容区域展示博客详情
function showContentBolgDetails(BlogID){
	//先填充内容
	//参数为当前点击事件对象的id值，调用此方法的方法会将参数传过来的
	//得到参数后就直接向服务器请求对应的内容然后填充到div中
	$.get("./json/fff.json",{"blogId":BlogID},function(data){
		$(".blogContent").html(BlogID);
	})
	//回到顶端代码
    $('body,html').animate({ 
        scrollTop:200 
    },700);
	//再显示内容
	$("#listBlog").css("display","none");
	$("#blogDetails").css("display","block");
}
//传入参数为用户点击的是上一页还是下一页
function togglePage(pageForward){
	//判断用户点击的是上一页按钮还是下一页按钮
	if(pageForward == "next"){
		//如果当前页面大于或等于总页数就提示用户到头了并直接忽略下面的所有代码
		if(currentPage >=blogPageSum){
			alert("后面已经没有了");
			//如果没有下一页就直接返回，当前页不做修改
			return;
		}
		//如果当前页不是最后一页就往下跳一页，
		//然后在最下面调用翻页方法，下一页的页码为参数传入翻页方法
		currentPage = currentPage+1;
	}
	//判断用户点击的是上一页按钮还是下一页按钮
	else{
		if(currentPage == 1){
			alert("这已经是第一页了");
			return;
		}
		currentPage = currentPage - 1;
	}
	//上面判断用户想要往第几页跳，这里直接执行
	showContentBolgList(currentPage);
}



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