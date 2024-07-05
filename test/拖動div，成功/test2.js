// $('p').css("border", "1px solid #000")

// kkk = document.getElementById("p01");
// kkk.addEventListener("click", function(){
//     document.getElementById("p01").innerHTML = "Hello World";
// });

xxx = document.getElementById("imgDiv");

xxx.addEventListener("mousedown", function(divEvent){
    document.onmousemove = function(ev){
        xxx.style.left = ev.clientX - divEvent.offsetX + "px";
        xxx.style.top = ev.clientY - divEvent.offsetY + "px";
    }

    xxx.onmouseup = function(){
        document.onmousemove = null;
    }

    document.onmouseup = function(){
        document.onmousemove = null;
    }
}
)



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
