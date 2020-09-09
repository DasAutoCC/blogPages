// 省略开头动画
$(".content").addClass("contentLater");
$(".index").remove();
function addLoginMsgToDom() {
	//登录人昵称
	if(isLogin!=""){
		if(isLogin.respCode==200){
			$("#indexDivSpan1").html(isLogin.data.userName+",欢迎回来");
			//渲染用户登录信息
			$("#loginArea").html("<div id='userHeaderDiv'><img id='userHeader' src="+isLogin.data.userHeader+"></div><div id='userNameDiv'>"+isLogin.data.userName+"</div>");
			$("#write").attr("placeholder","赠人玫瑰，手有余香")
		}
	}
}
//向dom中添加欢迎语
function addWelcomeMsgToDom(){
	//欢迎语
	$.get("./json/welcone.json",{},function(data){
		if(data.respCode==200){
			welcome = data.data;
		} 
		$("#indexDivSpan2").html(welcome);
	}); 
}
//内容区域展示博客列表
function showContentBolgList(pageNumber,isScroll,scrollTime){

	
	//先填充内容
	var data ;
	var currentList = $(".blogList1");
	//这里发送ajax请求当前页面的数据，并且将获取到的内容
	//的id依次修改到列表的每个div内的a标签上，每个a标签的id是博客的id
	//用来当作获取博客详情的参数
	$.get(restUrl.获取博客列表,{"pageNumber":pageNumber},function(back){
		if(back.respCode!=200){
			alert(back.message)
			return;
		}
		// $('body,html').animate({
		//     scrollTop:200 
		// },800);
		data = back.data;
		for(i = 0 ; i<= 7&&i<=data.length-1;i++){
			
			var createTime = new Date(data[i].createTime).toLocaleString()
			var ind = createTime.indexOf(" ");
			var tim = createTime.substring(0,ind);
			var isTop = '';
			var updLoc = '';
			if(data[i].isTop>0){
				isTop='置顶文章';
			}
			if(isLogin!=''){
				if(isLogin.respCode==200&&isLogin.data.userId==1){
					var updLoc = "更新此文章"
				}
			}
			currentList.children().html('<div class="contentsTheListContent"> <span style="font-size: 25px;">'+data[i].header+'</span>'+"<br>"+"<span style='font-size: 18px;'>"+data[i].preview+"</span> </div><div class = 'contentsTheListTime'><a href=/upd-article?articleId="+data[i].id+">"+updLoc+"</a> <span class='isTopSpan'>"+isTop+"</span> <span class = 'listDate'>Post："+tim+"</span> </div>");
			currentList.children().attr("id",data[i].id);
			currentList = currentList.next();
		}
		//判断当前页是否不满8个，如果不满8个就把除了有内容的div外的其他div进行display:none操作
		if(data.length<8){
			for(i=0;i<8-data.length ;i++){
				currentList.css("display","none")
				currentList = currentList.next();
			}
		}else{
			$(".contentList").css("display","block");
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
	// $.get("./json/fff.json",{"blogId":BlogID},function(data){
	// 	
	// 	$(".blogContent").html(BlogID);
	// })
	//这里用editor.md解析数据，然后填充到html
	showMarkdown(BlogID);
	showComment(BlogID);

	//再显示内容
	$("#listBlog").css("display","none");
	$("#blogDetails").css("display","block");
	//回到顶端代码
	$('body,html').animate({ 
	    scrollTop:200 
	},800);
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
	$('body,html').animate({
	    scrollTop:200 
	},700);
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
//新增评论
function addComment(){
	var replyFor = $("#write").attr("replyFor");
	var replyContent = $("#write").val();
	var currentBlogId = $("#markDownArea").attr("name")
	alert("将要回复id为："+replyFor+"的评论，当前评论内容为"+replyContent+"当前博客id为："+currentBlogId)
	var dataForSend = {
		"blogId" : currentBlogId,
		"replyFor" : replyFor,
		"commentContent" : replyContent
	}
	$.post(restUrl.添加评论,dataForSend,function(result){
		if(result.respCode == 200){
			alert("评论已提交，将在过滤后显示，感谢您的支持！")
		}else{
			alert(result.message);
		}
		
	})
}
function commentChange(){
	var  writeText= $("#write").val();
	var commentIdForUpdate =$(this).attr("id");
	var commentNameForPlaceHolder =$(this).parent().parent().parent().parent().attr("userName");
	var placeholderMsg = "登陆之后可以进行评论";
	$("#write").attr("replyFor",null);
	placeholderMsg = "赠人玫瑰，手有余香"
	$("#write").attr("placeholder",placeholderMsg);
	$("#underCommentMsg").text("")
}