// --------準備所需物件、函數及變數--------
// 正式運行遊戲在物件裡：runningGame.run

// initGame物件：初始化遊戲
let initGame = {
  // 常用變數在這邊一次設定
  canvas: document.getElementById("canvas"),

  // canvas置中函數：bodyTop設定高度，讓canvas垂直置中
  canvasMidVertically: function() {
    let clientHeight = document.documentElement.scrollHeight; // 頁面高度
    let canvas = document.getElementById("canvas");
    let bodyIop = document.getElementById("bodyTop");
    let canvasHeight = canvas.offsetHeight; // canvas高度
    bodyIop.style.height = (clientHeight-canvasHeight)/2+"px"; // 設定bodyTop高度
  },

  init: function() {
    this.canvasMidVertically(); // 讓canvas垂直置中
  },
}



// 拖動div事件函數，輸入字串形式的div之ID
function dragItem(itemID) {
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



// 從output.json讀取卡片資料
fetch("gameData/output.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    console.log(myJson);
    const csvJson = myJson;
    // csvJson就是卡片資料陣列，在這邊使用吧。
    // 因為非同步的關係，只能在這裡調用，就算宣告成全域變數，在這之外的代碼直接調動不生效，因為同步還沒跑完

    // 卡片產生函數：輸入卡片編號產生卡片
    function cardGenerator(number) {
        let arrayOrder = number-1;
        let divId = "card_"+number.toString(); // 這裡之後再改，直接用number可能會有問題

        // 卡片模板
        var cardTemplate = 
        '<div id="'+divId+'" class="card absolute">'+
                '<div class="cardBorder"></div>'+
                '<div>'+
                    '<img class="cardPic absolute" draggable="false" src="img/card/1.png">'+
                '</div>'+
                '<div class="description">'+
                    csvJson[arrayOrder].description+
                '</div>'+
                '<div class="cardName textCenterHorizontally">'+
                    '<img class="cardNamePic absolute" src="img/card/2.png" draggable="false">'+
                    '<div class="cardNameText">'+
                        csvJson[arrayOrder].name+
                    '</div>'+
                '</div>'+
                '<div class="mana">'+
                    '<img class="manaPic absolute" src="img/card/mana.png" draggable="false">'+
                    '<div class="manaText">'+csvJson[arrayOrder].cost+'</div>'+
                '</div>'+
                '<div class="cardType">'+
                    '<img class="cardTypePic absolute" src="img/card/mana.png" draggable="false">'+
                    '<div class="cardTypeText">'+csvJson[arrayOrder].type+'</div>'+
                '</div>'+
                '<div class="cardBack"></div>'+
                '<!-- 這個clearTrigger很重要，要放在想拖動的div裡面最底下，因為想拖動的div裡面任何東西使用absolute+left or top修改位置後，這個組件會有飄移bug，使用clearTrigger阻擋點擊到那些修改位置的組件 -->'+
                '<div id="clearTrigger" class="absolute"></div>'+
            '</div>';

    // 產生新的div
    let newDiv = document.createElement("div");

    // 將newDiv放到canvas裡面
    document.getElementById('canvas').appendChild(newDiv);

    // 將newDiv使用outerHTML完全替換成我指定的模板 
    newDiv.outerHTML = cardTemplate;
    
    // 設定card_model拖動div事件
    dragItem(divId);
    }

    // 用函數產生卡片
    cardGenerator(1);
    cardGenerator(2);
    cardGenerator(3);
    cardGenerator(4);
    cardGenerator(5);
    cardGenerator(6);
    cardGenerator(7);
  });



// 切換全螢幕函數
function toggleFullScreen() {
    if (
      !document.fullscreenElement && // alternative standard method
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT,
        );
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
}
// 切換全螢幕事件：EventToggleFullScreen，輸入button id(字串)，綁定切換螢幕事件
function EventToggleFullScreen(buttonId) {
  let button = document.getElementById(buttonId);
  // 綁定函數到按鈕：toggleFullScreen => button
  button.addEventListener(
      "click",
      function () {
          toggleFullScreen();
    },
  );
}



// 更改背景函數：輸入檔案名稱及副檔名，字串！
// 
function changeBackground(fileName) {
  const img = new Image(); // Create new img element
  img.src = "./img/backGroundScene/" + fileName; // Set source path
}



// 開始畫面物件
// 應該包含清除上個場景背景跟所有物件(圖片、文字、按鈕) / 設定場景 / 設定所有物件
let openingScene = {
  run: function() {
    changeBackground("bg_openingScene.png");
  }
}



// --------運行遊戲--------

initGame.init(); // 初始化


let runningGame = {
  gameData: "遊戲資料等待讀取",
  run: async function() {
    // 請求後端取得遊戲資料Json檔gameData
    // 所有需要await fetch的都在這邊執行，方便管理
    response  = await fetch("gameData/output.json");
    this.gameData = await response.json();
    
    console.log("開始執行async/await底下的代碼")
    console.log("await讀取的gameData：");
    console.log(this.gameData);
    
    // ----------所有遊戲中函數及操作在這裡執行----------
  
    // 因為很多地方需要gameData，而且非同步的關係，只能在這裡調用gameData
    // 就算宣告成全域變數，在這之外的代碼直接調動不生效，因為同步還沒跑完，試過很多方法了，await只能在有標註async的函數裡使用
    // 除非遇到懂得人問她，不然不要再花時間搞這個！！！！！
  
    // 設定card_model拖動div事件
    dragItem('card_model'); 


  
    // 綁定切換全螢幕事件函數到按鈕
    EventToggleFullScreen("buttonToggleFullScreen"); 
    // 設定事件，螢幕切換後必須重新置中canvas
    document.addEventListener("fullscreenchange", initGame.canvasMidVertically);
  
    openingScene.run()
  
  
  
  
  }
}

runningGame.run();


console.log("index.js同步運行完成")