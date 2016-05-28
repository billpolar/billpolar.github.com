window.onload = function(){
      toBanner();
      fade_In_out();
      work_fade_In_out();

    }
    function toBanner(){
      var oBan = document.getElementById("banner");
      var oPrev = oBan.children[0];
      var oNext = oBan.children[1];
      var aBtn  = oBan.children[2].children;
      var oUl   = oBan.children[3];
      var aLi   = oUl.children;
      var timer = setInterval(next, 3600);

      oUl.appendChild(aLi[0].cloneNode(true));

      oUl.style.width = aLi[0].offsetWidth*aLi.length + "px";      
      var iNow = 0;
      var bReady = true;
      for(var i = 0; i < aBtn.length; i++){
        (function(index){
          aBtn[i].onmouseover = function(){

            iNow = index;
            tab();
          };
        })(i);
      }

      oPrev.onclick = function(){
        if(!bReady) return;
        bReady = false;
        iNow--;
        if(iNow == -1){
          oUl.style.left = -aLi[0].offsetWidth*aLi.length + "px";
          iNow = 1;
        } 
        tab();
      };

      oNext.onclick = function(){
        
        next();
      };
      function next(){
        if(!bReady) return;
        bReady = false;
        iNow++;
        if (iNow == aLi.length-1) {
            iNow = 0;
        }
        tab();
      }

      oBan.onmouseover = function(){
        oPrev.style.display = "block";
        oNext.style.display = "block";
        
        clearInterval(timer);
      };
      oBan.onmouseout = function(){
        oPrev.style.display = "none";
        oNext.style.display = "none";
          timer = setInterval(next, 3000);
      };


      function tab(){
        for(var i = 0; i < aBtn.length; i++){
          aBtn[i].className = ""; 
        }
        if(iNow == aLi.length-1){
          aBtn[0].className = "active";

        } else {
          aBtn[iNow].className = "active";
        }

        move(oUl,{left:-aLi[0].offsetWidth*iNow},{
          complete:function(){
            bReady = true;            
            if(iNow == aLi.length-1){
              oUl.style.left = "0";
              iNow = 0;
            } 
          } 
        }); 
      }
    }
    function fade_In_out(){
      var oContent = document.getElementById("content");
      var oUl1 = oContent.children[1];
      var aLi1 = oUl1.children;
      var oUl2 = oContent.children[2];
      var aLi2 = oUl2.children;
      //var iNow = 0;
      for(var i = 0; i < aLi1.length; i++){
        (function(index){
          aLi1[i].onmouseover = function(){
           move(aLi1[index],{"opacity":0},{duration:1000,easing:"ease-out"});
           //tab(aLi1[index]);      
          };
        })(i);
      }
      for(var i = 0; i < aLi1.length; i++){
        (function(index){
          aLi1[i].onmouseout = function(){
            for(var i = 0; i < aLi1.length; i++){
              move(aLi1[i],{"opacity":0.7},{duration:300,easing:"ease-out"});
            }      
          };
        })(i);
      }

      for(var i = 0; i < aLi2.length; i++){
        (function(index){
          aLi2[i].onmouseover = function(){
           move(aLi2[index],{"opacity":0},{duration:1000,easing:"ease-out"});
           //tab(aLi1[index]);      
          };
        })(i);
      }
      for(var i = 0; i < aLi2.length; i++){
        (function(index){
          aLi2[i].onmouseout = function(){
            for(var i = 0; i < aLi2.length; i++){
              move(aLi2[i],{"opacity":0.7},{duration:300,easing:"ease-out"});
            }      
          };
        })(i);
      }
    }

    function work_fade_In_out(){
      var oWork = document.getElementById("work");
      var oUl = oWork.children[1];
      var aLi = oUl.children;
      
      for (var i = 0; i < aLi.length; i++) {
         (function(index){
          aLi[i].onmouseover = function(){
            addClass(aLi[index],'active');
          }
        })(i);
      }
      for (var i = 0; i < aLi.length; i++) {
        (function(index){
          aLi[i].onmouseout = function(){
            removeClass(aLi[index],'active');
          }
        })(i);
      }
    }
    function removeClass(obj,sClass){
      var re=new RegExp('\\b'+sClass+'\\b');  
      if(re.test(obj.className)){
        obj.className=obj.className.replace(re,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
        if(!obj.className){
          obj.removeAttribute('class');
        }
      }
    }
    function addClass(obj,sClass){
      var re=new RegExp('\\b'+sClass+'\\b');
      if(!re.test(obj.className)){
        if(obj.className){
          obj.className=obj.className+' '+sClass;
        }else{
          obj.className=sClass; 
        }
      }
    }