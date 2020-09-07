function extractionLoc(locationHash){
	var index = locationHash.indexOf("#");
	var nextIndex = locationHash.indexOf("?");
	if(nextIndex == -1){
		return locationHash;
	}
	var loc = locationHash.substring(index,nextIndex);
	return loc;
} 
function extractionArgm(locationHash){
	var locInd = locationHash.indexOf("?");
	if(locInd==-1){
		return null;
	}
	var argmIns = locationHash.substring(locInd+1,locationHash.length);
	var eqIndex = argmIns.indexOf("=");
	var argmName = argmIns.substr(0,eqIndex);
	var argmValue = argmIns.substr(eqIndex+1,argmIns.length);
	var res = {[argmName]:argmValue}
	return res;
}


function changePage(){
	var hash = location.hash;
	var loc = extractionLoc(hash);
	var argm = extractionArgm(hash)
	// blogPageSum是获取到的总页数
	if(loc == "#list" && argm.pageNum !=null){
		showContentBolgList(argm.pageNum,true);
	}
	if(loc == "#details" && argm.articleId !=null){
		showContentBolgDetails(argm.articleId);
	}
}

$(window).bind("hashchange", function() {
	changePage();
});
