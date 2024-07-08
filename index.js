// 拖動div事件函數，輸入字串形式的div之ID
function dragItem (itemID) {
    // 拖動div，成功，原始碼來自網路
    let item = document.getElementById(itemID);

    item.addEventListener("mousedown", function(divEvent){
        document.onmousemove = function(ev){
            item.style.left = ev.clientX - divEvent.offsetX + "px";
            item.style.top = ev.clientY - divEvent.offsetY + "px";
        }
    
        item.onmouseup = function(){
            document.onmousemove = null;
        }
        // 原作者說為避免bug所以多做一次 null
        document.onmouseup = function(){
            document.onmousemove = null;
        }
    }
    )
}

// 設定card_1拖動div事件
dragItem('card_1');



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
    var cardS = document.getElementById("cardS");
    // 將cardS使用outerHTML完全替換成我指定的模板
    cardS.outerHTML = 
    '<div id="card_2" class="card absolute">'+
            '<div class="cardBorder"></div>'+
            '<div>'+
                '<img class="cardPic absolute" draggable="false" src="img/card/1.png">'+
            '</div>'+
            '<div class="description">'+
                csvJson[3].description+
            '</div>'+
            '<div class="cardName textCenterHorizontally">'+
                '<img class="cardNamePic absolute" src="img/card/2.png" draggable="false">'+
                '<div class="cardNameText">'+
                    csvJson[3].name+
                '</div>'+
            '</div>'+
            '<div class="mana">'+
                '<img class="manaPic absolute" src="img/card/mana.png" draggable="false">'+
                '<div class="manaText">'+csvJson[3].cost+'</div>'+
            '</div>'+
            '<div class="cardType">'+
                '<img class="cardTypePic absolute" src="img/card/mana.png" draggable="false">'+
                '<div class="cardTypeText">'+csvJson[3].type+'</div>'+
            '</div>'+
            '<div class="cardBack"></div>'+
            '<!-- 這個clearTrigger很重要，要放在想拖動的div裡面最底下，因為想拖動的div裡面任何東西使用absolute+left or top修改位置後，這個組件會有飄移bug，使用clearTrigger阻擋點擊到那些修改位置的組件 -->'+
            '<div id="clearTrigger" class="absolute"></div>'+
        '</div>';
    
    // 設定card_1拖動div事件
    dragItem('card_2');
  });
