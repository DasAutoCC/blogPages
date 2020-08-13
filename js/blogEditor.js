function showMarkdown(blogId){
	var testEditor;
	$.get("./json/blog-details.json",{"blogId":blogId},function(data){
		testEditor = editormd.markdownToHTML("markDownArea",{
			  markdown        : data.data.articleContent ,//+ "\r\n" + $("#append-test").text(),
			  //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
			  htmlDecode      : "style,script,iframe",  // you can filter tags decode
			  //toc             : false,
			  tocm            : true,    // Using [TOCM]
			  //tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
			  //gfm             : false,
			  //tocDropdown     : true,
			  // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
			  emoji           : true,
			  taskList        : true,
			  tex             : true,  // 默认不解析
			  flowChart       : true,  // 默认不解析
			  sequenceDiagram : true,  // 默认不解析
		});
		$("#markDownArea").attr("name",blogId)
	})
}
//将数据封装成html然后返回
function addCommentToDom(comment){
	var html = '';
	var htp = '<div class="realComment">';
	var htb = '</div>';
	var commentHtml = '';
	var repliesHtml = '';
	var userName=comment.nickName == null ? "游客"  :comment.nickName ;
	var userContent = comment.commentContent;
	commentHtml = '<div class="topLevelComment">'+userName+':'+userContent+'</div>';
	html = htp + commentHtml;
	if(comment.replies == null || comment.replies.length == 0){
		html = html + htb;
		return html;
	}
	for(var i = 0 ;i < comment.replies.length ;i++){
		repliesHtml = repliesHtml + '<div class="reply">'+(comment.replies[i].nickName == null ? "游客" : comment.replies[i].nickName)+':'+comment.replies[i].commentContent+'</div>';
	}
	html = html + repliesHtml + htb;
	return html;
}
//将数据循环封装成html用于直接向dom中添加
function showComment(blogId){
	var html = '';
	$.get("./json/selComment.json",{"blogId":blogId},function(result){
		if(result.respCode != 200){
			alert(result.message)
		};
		var data = result.data;
		for(var i = 0 ;i<data.length ;i++){
			rep = addCommentToDom(data[i]);
			html = html + rep;
		}
		$("#commentInstence").html(html);
	})
} 