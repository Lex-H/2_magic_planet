xxx = document.getElementById("imgDiv");

xxx.addEventListener("mousedown", function(divEvent){
    document.onmousemove = function(ev){
        xxx.style.left = ev.clientX - divEvent.offsetX + "px";
        xxx.style.top = ev.clientY - divEvent.offsetY + "px";
    }

    xxx.onmouseup = function(){
        document.onmousemove = null;
    }
    // 原作者說為避免bug所以多做一次 null
    document.onmouseup = function(){
        document.onmousemove = null;
    }
}
)


// 以下是從網路上抄有三個bug的原始碼
// $("#imgDiv").addEventListener("mousedown", function(divEvent){
//     document.onmousemove = function(ev){
//         $("#imgDiv").style.left = ev.clientX - divEvent.offsetX + "px";
//         $("#imgDiv").style.top = ev.clientY - divEvent.offsetY + "px";
//     }

//     $("#imgDiv").onmouseup = function(){
//         document.onmousemove = null;
//     }

//     document.onmouseup = function(){
//         document.onmousemove = null;
//     }
// }
// )