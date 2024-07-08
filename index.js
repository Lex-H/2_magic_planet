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


// 從output.json讀取卡片資料

fetch("parseCsv/output.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    console.log(myJson);
    const csvJson = myJson;
    // csvJson就是卡片資料陣列，在這邊使用吧。
    // 因為非同步？的關係，只能在這裡調用，就算宣告成全域變數，在這之外的代碼直接調動不一定生效，因為非同步？還沒跑完
    // 或者是將csvJson設定為全域變數(不加const)，然後後面要用到的地方設定計時器，網頁載入兩三秒後再讀取
    var el = document.getElementById("testCsv");
    el.innerHTML = "<h1>"+csvJson[0].health+"</h1>";
  });
