// 拖動div，成功，原始碼來自網路

itemDragged = document.getElementById("card_1");

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