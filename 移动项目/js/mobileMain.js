// JavaScript Document
function id(obj) {
    return document.getElementById(obj);
}
function bind(obj, ev, fn) { 
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
function addClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

function fnLoad(){
	var iTime = new Date().getTime();
	var oW = id("welcome");
	var arr = [""];
	var bImgLoad = true;
	var bTime = false;
	var oTimer = 0;
	bind(oW,"webkitTransitionEnd",end)
	bind(oW,"transitionend",end);
	oTimer=setInterval(function(){
		if (new Date().getTime()-iTime>=3000) {
			bTime =true;
		}
		if (bImgLoad&&bTime) {
			clearInterval(oTimer);
			oW.style.opacity = 0;
			
		}
	},1000)
	function end(){
		removeClass(oW,"pageShow");
		fnTab();
	}	
}
/*bind(document,"touchmove",function(ev){
	ev.preventDefault();
});*/
function fnTab(){
	var oTab = id("tabPic");
	var oList = id("picList");
	var aNav1 = oTab.getElementsByTagName("nav")[0].children;
	var aNav = oTab.getElementsByTagName("nav")[1].children;
	//alert(aNav.length);
	var iNow = 0;
	var iX = 0;
	var iW = view().w;
	var oTimer = null;
	var iStartTouchX =0;
	var iStartX = 0;
	auto();
	fnScore();
	
	function auto(){
		oTimer =setInterval(function(){
			iNow++;
			iNow=iNow%aNav.length;
			tab();
		},2000);
	}
	bind(oTab,"touchstart",fnStart);
	bind(oTab,"touchmove",fnMove);
	bind(oTab,"touchend",fnEnd);
	
	
	function fnStart(ev){
		oList.style.WebkitTransition = oList.style.transition = "none";
		ev = ev.changedTouches[0];
		iStartTouchX = ev.pageX;
		iStartX = iX;
		clearInterval(oTimer);
		
	}
	function fnMove(ev){
		ev = ev.changedTouches[0];
		var iDis = ev.pageX - iStartTouchX;
		iX = iStartX + iDis;
		oList.style.WebkitTransform=oList.style.transform = "translateX("+iX+"px)";
	}
	function fnEnd(){
		  iNow = iX/iW;
		  iNow = -Math.round(iNow);
		  if (iNow<0) {
		  	iNow=0;
		  }
		  iNow=iNow%aNav.length;
		  if (iNow>aNav.length-1) {
		  	iNow=aNav.length-1;
		  }
		  tab();
		  auto();
	}
	
	function tab(){
		iX = -(iNow*iW);
		oList.style.WebkitTransition = oList.style.transition = "0.5s";
		oList.style.WebkitTransform=oList.style.transform = "translateX("+iX+"px)";
		for (var i = 0;i<aNav.length;i++) {
			removeClass(aNav[i],"active");
			removeClass(aNav1[i],"active");
			
		}
		 addClass(aNav1[iNow],"active");
		 
		 addClass(aNav[iNow],"active");
	}
}
function fnScore() {
	var oScore = id("score");
	var aLi = oScore.getElementsByTagName("li");
	var arr = ["很失望","很一般","一般吧","良好","很好"];
	for (var i =0;i<aLi.length;i++) {
		fn(aLi[i]);
	}
	function fn (oLi) {
		var aNav = oLi.getElementsByTagName("a");
		var oInput = oLi.getElementsByTagName("input")[0];
		
		for (var i =0;i<aNav.length;i++) {
			aNav[i].index = i;
			bind(aNav[i],"touchstart",function(){
				for (var i =0;i<aNav.length;i++) {
					if(i<=this.index){
						addClass(aNav[i],"active");
					}else{
						removeClass(aNav[i],"active");
					}
				}
				oInput.value=arr[this.index];
				console.log(oInput.value);
			});
		}
	}
	fnIndex();
}
function fnInfo(oInfo,sInfo) {
	oInfo.innerHTML = sInfo;
	oInfo.style.WebkitTransform = "scale(1)";
	oInfo.style.transform = "scale(1)";
	oInfo.style.opacity = 1;
	setTimeout(function(){
		oInfo.style.WebkitTransform = "scale(0)";
		oInfo.style.transform = "scale(0)";
		oInfo.style.opacity = 0;
	},1000)
	
}
function fnIndex() {
	var oIndex = id("index");
	var oBtn = oIndex.getElementsByClassName("btn")[0];
	var oInfo = oIndex.getElementsByClassName("info")[0];
	var bscore = false;
	var bTag = false;
	
	bind(oBtn,"touchend",fnEnd);
	
	function fnEnd(){
		bscore=fnScoreChecked();
		bTag  = fnTag();
		
		if(bscore){
			if (bTag) {
				fnIndexOut();
			}else{
				fnInfo(oInfo,"请给风景添加标签");
			}
		}else{
			
			fnInfo(oInfo,"请给风景评分");
		}
	} 
	function fnScoreChecked () {
		var oScore = id("score");
		var aInput = oScore.getElementsByTagName("input");
		for (var i = 0; i<aInput.length;i++) {
			if(aInput[i].value==0){
				return false;
			}
		}
		return true;
	}
	function fnTag(){
		var oIndexTag = id("indexTag");
		var aInput = oIndex.getElementsByTagName("input");
		for (var i = 0; i < aInput.length; i++) {
			if (aInput[i].checked) {
				
				return true;
			}
		}
		return false;
	}
	function fnIndexOut() {
		var oMask = id("mask");
		var oIndex = id("index");
		var oNews = id("news");
		
		addClass(oMask,"pageShow"); 
		addClass(oNews,"pageShow");
		fnNews();
		setTimeout(function(){
			oMask.style.opacity = 1;
			oIndex.style.filter = "blur(4px)";
			oIndex.style.WebkitFilter = "blur(4px)";
		},17);
		setTimeout(function(){
			removeClass(oMask,"pageShow");
    		oNews.style.WebkitTransition = "0.5s";
    		oNews.style.transition = "0.5s";
			oMask.style.opacity = 0;
			oIndex.style.filter = "blur(0px)";
			oIndex.style.WebkitFilter = "blur(0px)";
			oNews.style.opacity= 1;
		},3000)
	}
}

function fnNews() {
	var oNews = id("news");
	var oInfo = oNews.getElementsByClassName("info")[0];
	var aInput = oNews.getElementsByTagName("input");
	aInput[0].onchange = function(){
		console.log(this.files);
		if (this.files[0].type.split("/")[0] == "video") {
			fnNewsOut();
			this.value = "";
		}else{
			fnInfo(oInfo,"请上传视频");
			
		}
	}
	aInput[1].onchange = function(){
		console.log(this.files);
		if (this.files[0].type.split("/")[0] == "image") {
			fnNewsOut();
			this.value = "";
			
		}else{
			fnInfo(oInfo,"请上传图片");
			
		}
	}
}
function fnNewsOut(){
	var oForm = id("form");
	var oNews = id("news"); 
	addClass(oForm,"pageShow");
	oNews.style.cssText = "";
	removeClass(oNews,"pageShow");
	formIn();	
}
function formIn() {
	var oForm = id("form");
	var oBtn = oForm.getElementsByClassName("btn")[0];
	var bOff = false;
	var oOverPage = id("overPage");
	var aFormLabel = id("formTag").getElementsByTagName("label");
	for (var i = 0; i < aFormLabel.length; i++) {
		bind(aFormLabel[i],"touchend",function(){
			bOff = true;
			addClass(oBtn,"submit");
		});
	}
	bind(oBtn,"touchend",function(){
		if (bOff) {
			for(var i=0;i<aFormLabel.length;i++){
				aFormLabel[i].getElementsByTagName("input")[0].checked = false;
			}
			bOff = false;
			addClass(oOverPage,"pageShow");
			removeClass(oForm,"pageShow");
			removeClass(oBtn,"submit");
			overPage();
		}
	});
}
function overPage() {
	var oOverPage = id("overPage");
	var oIndex = id("index");
	var oBtn = oOverPage.getElementsByClassName("btn")[0];
	bind(oBtn,"touchend",function(){
		removeClass(oOverPage,"pageShow");
	
	});

}































































function function_name () {
	
}