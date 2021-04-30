var user;

document.addEventListener("DOMContentLoaded", () => {
  user = {
    Name: "You",
    Color: "#FFFFFF"
  };

  startImoers();

  $("#chat").on("keydown", (evt) => {
    if(evt.keyCode == 13) {
      var message = $("#chat #messagebox input[type=text]").val();
      if(message.length == 0) {
        alert("入力欄になにもない場合は送信できません。\nIf there is nothing in the field, you cannot send it.");
        $("#chat #messagebox input[type=text]").val("").blur();
      } else if(message.length <= 512) {
        messageSend(message);
        $("#chat #messagebox input[type=text]").val("").blur();
      }
      evt.preventDefault();
      evt.stopPropagation();
    } else if(evt.keyCode == 27) {
      chat.blur();
      evt.preventDefault();
      evt.stopPropagation();
    } else if(evt.keyCode == 9) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  });

  $(document).on("click", function(evt) {
    if(evt.target != $(".modal")[0]) return;
    closeModal();
  });
});

function updateMessageList(data) {
  var li = $('<li></li>');
  li.append(`<span class="name"></span>`);
  li.append(`<span class="message"></span>`);
  li.find(".name").text(`${data.Name}:`);
  li.find(".message").html(insertText(data.Text));

  li.css("color", data.Color || "white");
  $("#chat ul").prepend(li);

  var eles = $("#chat ul li").get();
  if(eles.length > 500) {
    $(eles[eles.length - 1]).remove();
  }
}

function resetMessageList() {
  $("#user ul").empty();
}

function messageSend(message) {
  updateMessageList({
    Name: user.Name,
    Color: user.Color,
    Text: message
  });
}

function insertText(text){
  var tx = text;
  tx = tx.replace(/</g,'&lt;').replace(/>/,'&gt;');
  tx = tx.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a target=_blank href="$1">$1</a>');
  return tx;
}

function startImoers() {
  var imoNames = ["いも", "おいしいいも", "ぽてと", "やきいも", "芋神", "謎の芋", "いものだし汁"];
  var imoNumbers = [...new Array(Math.floor(Math.random()*(2+1-6))+6)].map(a=>a=Math.floor(Math.random()*9));
  var imoHNs = ["いも", "VoiceMeterPotatoを使え", "石焼芋", "芋信", "おいしい", "ポテトチップス", "熱い芋おいしい"];
  var imoMsgs = ["いも", "こんにちじは、いもです", "芋はおいしい", "芋すごい", "芋は洗ってからやれ", "eating imo", "芋はおいしい"];

  var isINum = (rndBoolean())?imoNumbers[Math.floor(Math.random()*imoNumbers.length)]:"";
  var isIHN = (rndBoolean())?"@"+imoHNs[Math.floor(Math.random()*imoHNs.length)]:"";

  updateMessageList({
    Name: imoNames[Math.floor(Math.random()*imoNames.length)] + isINum + isIHN,
    Color: "#"+(Math.random()*0xFFFFFF<<0).toString(16),
    Text: imoMsgs[Math.floor(Math.random()*imoMsgs.length)]
  });

  setTimeout(startImoers, Math.floor(Math.random()*(50+1-3000))+3000);
}

function rndBoolean() {
  var b = [true, false];
  return b[Math.floor(Math.random()*b.length)];
}