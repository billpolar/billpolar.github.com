window.onload = function() {
  toBanner();


}

function toBanner() {
  var oBan = document.getElementById("banner");
  var oPrev = oBan.children[0];
  var oNext = oBan.children[1];
  var aBtn = oBan.children[2].children;
  var oUl = oBan.children[3];
  var aLi = oUl.children;
  var timer = setInterval(next, 4000);

  oUl.appendChild(aLi[0].cloneNode(true));

  oUl.style.width = aLi[0].offsetWidth * aLi.length + "px";
  var iNow = 0;
  var bReady = true;
  for (var i = 0; i < aBtn.length; i++) {
    (function(index) {
      aBtn[i].onmouseover = function() {

        iNow = index;
        tab();
      };
    })(i);
  }

  oPrev.onclick = function() {
    if (!bReady) return;
    bReady = false;
    iNow--;
    if (iNow == -1) {
      oUl.style.left = -aLi[0].offsetWidth * aLi.length + "px";
      iNow = 1;
    }
    tab();
  };

  oNext.onclick = function() {

    next();
  };

  function next() {
    if (!bReady) return;
    bReady = false;
    iNow++;
    if (iNow == aLi.length - 1) {
      iNow = 0;
    }
    tab();
  }

  oBan.onmouseover = function() {
    oPrev.style.display = "block";
    oNext.style.display = "block";
    clearInterval(timer);
  };
  oBan.onmouseout = function() {
    oPrev.style.display = "none";
    oNext.style.display = "none";
    timer = setInterval(next, 4000);
  };


  function tab() {
    for (var i = 0; i < aBtn.length; i++) {
      aBtn[i].className = "";
    }
    if (iNow == aLi.length - 1) {
      aBtn[0].className = "active";

    } else {
      aBtn[iNow].className = "active";
    }

    move(oUl, {
      left: -aLi[0].offsetWidth * iNow
    }, {
      complete: function() {
        bReady = true;
        if (iNow == aLi.length - 1) {
          oUl.style.left = "0";
          iNow = 0;
        }
      }
    });
  }
}


