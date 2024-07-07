// 拖動div，成功，原始碼來自網路

itemDragged = document.getElementById("imgDiv");

itemDragged.addEventListener("mousedown", function(divEvent){
    document.onmousemove = function(ev){
        itemDragged.style.left = ev.clientX - divEvent.offsetX + "px";
        itemDragged.style.top = ev.clientY - divEvent.offsetY + "px";
    }

    itemDragged.onmouseup = function(){
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