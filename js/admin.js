
var rp = $(".rp")[0],
    lp = $(".lp")[0],
    fullScreen = $(".bigscreen")[0],
    colWidth = $(".itemRow")[0],
    ul = $(".items")[0],
    ulli = ul.getElementsByTagName("li"),
    blank = $(".blank")[0],
    winBody = $("body")[0],
    shuzi = true,
    count = 0,
    selclr = "#ff5700";//此颜色用来显示此时页面的标题

function bodySize(theWidth, theHeight) {
    if (theWidth >= 700 && theHeight >= 825) {
        winBody.style.width = theWidth + "px";
        rp.style.width = theWidth - lp.offsetWidth - 20 + "px";
       // fullScreen.style.width = theWidth + "px";
        rp.style.height = theHeight + "px";
        lp.style.height = theHeight + "px";
        blank.style.width = colWidth.offsetWidth - 62 + "px";
        winBody.style.overflow = "hidden";
    } else {
        if (theHeight < 825 && theWidth >= 700) {
            bodySize(theWidth, 825);
            winBody.style.overflowY = "scroll";
            winBody.style.overflowX = "hidden";            
        } else {
            if (theHeight >= 825 && theWidth < 700){
                bodySize(700, theHeight);
                winBody.style.overflowX = "scroll";
                winBody.style.overflowY = "hidden";
            } else {
                bodySize(700, 825);
                winBody.style.overflow = "scroll";
            }
        }
    }
    var myMenu = $("#menu")[0];
    myMenu.style.height = lp.offsetHeight - 140 + "px";
}




function itemFunc(getM) {
    var chiNode = getM.getElementsByTagName("div")[0].innerText,
        rul = $("#iTtl ul")[0],
        rli = rul.getElementsByTagName("li"),
        myIndex = getM.getAttribute("lindex");
    //阻止冒泡
    if(event.stopPropagation){
       event.stopPropagation() 
    }else{
        event.cancelBubble = true;
    }
    //add:0628
    $(".item").css("background","#e54e3b");
    //
    $(".mainPage").css("display","none");
    if (myIndex == 1 && myIndex == ulli.length - 1){
        $("#myPage").css("display","block");
        $(".item:eq(0)").css("background",selclr)
    } else {
        if (myIndex == ulli.length - 1) {
            var thePageId = ulli[myIndex - 1].getAttribute("pname");
            showMainPageId(thePageId);
            $(ulli[myIndex - 1]).css("background",selclr);
        } else {            
            for (reIndex = 0; reIndex < ulli.length; reIndex++) {
                if (ulli[reIndex].getAttribute("lindex") > myIndex) {
                    var newIndex = parseInt(ulli[reIndex].getAttribute("lindex")) - 1;
                    ulli[reIndex].setAttribute("lindex",newIndex);
                } 
            }
            var lastPageId = ulli[ulli.length - 1].getAttribute("pname");
            showMainPageId(lastPageId);
            $(ulli[ulli.length - 1]).css("background",selclr);
        }
    }
    //减去右边相应栏目
    $(getM).remove();
    for (ittl = 0; ittl < rli.length; ittl++) {
        if (rli[ittl].innerText == chiNode) {
            $(rli[ittl]).remove();
            count --;            
        }
    }
    
    //栏目条的左右移动
    if (ul.offsetWidth < blank.offsetWidth) {
        ul.style.left = "0px";
    } else {
        ul.style.left = ul.offsetLeft + 162 + "px";
    }
}

function showItem(myself) {
    var getMyId = myself.getAttribute("pname");
    showMainPageId(getMyId);
    $(".item").css("background","#e54e3b");
    $(myself).css("background",selclr);
}

function iTtlLi(liPage) {    
    var liPageId = liPage.getAttribute("pname");
    showMainPageId(liPageId);
    $(".item").css("background","#e54e3b");
    for (clri = 0; clri < ulli.length; clri++) {
        if (liPageId == ulli[clri].getAttribute("pname")){
            $(ulli[clri]).css("background",selclr);
        }
    }
};

function showMainPageId(myPageId) {
    $(".mainPage").css("display","none");
    document.getElementById(myPageId).style.display = "block";    
}



$(function () {
    var sWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth,
        sHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight,
        idIt = document.getElementById("iTtl"),
        idMenu = $("#menu")[0];
    bodySize(sWidth, sHeight);
    //初始值
    idIt.style.display = "none";
    idMenu.style.display = "block";
    $("#fr .fakeA:eq(1)").bind("click", function () {
        $("#xgmima").css("display","block");
    })
     $("#fr .fakeA:eq(0)").bind("click", function () {
        $("#wangluo").css("display","block");
    })
     $(".last .btn").bind("click", function () {
         $(".wlxxsz").css("display","none");
     })
    //onresize
    window.onresize = function () {
        var nSWidth = window.innerWidth 
            || document.body.clientWidth
            || document.documentElement.clientWidth,
            nSHeight = window.innerHeight
            || document.body.clientHeight
            || document.documentElement.clientHeight;
        bodySize(nSWidth, nSHeight);
    };
    
    //B:打开或关闭菜单
    $("#mainMenu").bind("click", function () {       
        if (idMenu.style.display == "block") {
            $("#menu").css("display", "none");
            $("#memb").css("display", "none");
        } else {
            $("#menu").css("display", "block");
            $("#memb").css("display", "block");
        }                     
    });
    //E:打开或关闭菜单    
    //B:选择项目
    $("#menu dl dt").bind("click", function () {       
        var theDl = this.parentNode,
            dlHeight = lp.offsetHeight - 450 + "px",
            dtOn = $(".on")[0],
            dlOn;
        if (dtOn) {
            dlOn = dtOn.parentNode;
        } else {
            dlOn = null;
        }
        if (this.className == "on") {            
            $(theDl).animate({height: "40px"}, 1000, function () {
                $(".on").removeAttr("class");
            });
        } else {
            $(dlOn).animate({height: "40px"}, 1000);
            $(dtOn).removeAttr("class");
            this.className = "on";
            $(theDl).animate({height: dlHeight}, 1000);
        }
    });
    $("#menu dl dd").bind("click", function () {
        shuzi = true;        
        $("#menu dl dd").css({"color": "white", "background-color": "transparent"});
        this.style.color = "blue";
        this.style.backgroundColor = "#e54e3b";
        var txt = this.innerText,
            ncount = count + 1,
            myNode = "<li class='item' pname='" + this.getAttribute("pname") + "' lindex='" + ncount + "'  onclick='showItem(this)' style='background:#ff5700;'><div class='itemTtl'>" + txt + "</div><div class='closeItem' onclick='itemFunc(this.parentNode)'></div></li>",
            oldNodes = $(".itemTtl"),
            rightLi = "<li  pname = '" + this.getAttribute("pname") + "' onclick='iTtlLi(this)'>" + txt + "</li>",
            rightUl = $("#iTtl ul")[0],
            pageId = this.getAttribute("pname");
        
        showMainPageId(pageId);
        
        $(".item").css("background","#e54e3b");
        for (i = 0; i < oldNodes.length; i++) {
            if (oldNodes[i].innerText == txt) {
                shuzi = false;                
                $(oldNodes[i].parentNode).css("background",selclr);
            }  
        }
        if (shuzi) {
            count ++;
            $(myNode).appendTo(ul);
            $(rightLi).appendTo(rightUl);
            if (ul.offsetWidth >= blank.offsetWidth) {
                ul.style.left = ul.offsetLeft - 162 + "px";
            }
        }
    });
    //E:选择项目    
    //B:右部导航栏箭头
    $(".toBot").bind("click", function () {
        if (idIt.style.display == "none"){
            this.style.backgroundColor = "#e54e3b";
            idIt.style.display = "block";
        }else{
            this.style.backgroundColor = "white";
            idIt.style.display = "none" ;
        }
    })
    //E:右部导航栏箭头 
});

