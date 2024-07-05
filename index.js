xxx = document.getElementById("card_1");

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