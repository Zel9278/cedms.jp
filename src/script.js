document.addEventListener("DOMContentLoaded", () => {
    wsChecker();
    changeLangageStr(document.getElementById("comment"), {
        ja: "プログラミングや耳コピなどをしてる人です、結構長くスランプに悩まされています。",
        sus_ja: "プロゲうシソゲや耳コピなどをレてゑ人てず、结构长ㄑヌうソプに悩まされていまず。",
        en:"I'm a programming and making midi guy, and I've been suffering from a slump for quite a while."
    });
    document.getElementById("age").innerText = getBirthday("2003/4/25");
});

function wsChecker() {
    const ws = new WebSocket("wss://mpp.cedms.jp:8443");
    const ws_img = document.getElementById("ws");
    ws_img.src = "src/images/icons/ws/wait.png";
    ws.onopen = (e) => {
        ws_img.src = "src/images/icons/ws/check.png";
    }    
    ws.onclose = (e) => {
        ws_img.src = "src/images/icons/ws/close.png";
        console.warn("websocket has been disconnected for some reason, will reconnect in a second...");
        setTimeout(() => {
            wsChecker();
        }, 1000);
    }
    ws.onerror = (e) => {
        ws_img.src = "src/images/icons/ws/close.png";
        ws.close();
    }
}

function changeLangageStr(elem, texts) {
    var lang = window.navigator.language.toLocaleLowerCase();

    switch (lang) {
        case "ja":
            if(texts.sus_ja && `${(new Date().getMonth()+1)}/${new Date().getDate()}` === "4/1") return elem.innerText = texts.sus_ja;
            elem.innerText = texts.ja;
            break;
    
        default:
            elem.innerText = texts.en;
            break;
    }
}

function getBirthday(data) {
    var splitData = data.split("/");
    var birthday = new Date(splitData[0], splitData[1]-1, splitData[2]);
    var today = new Date();
    var thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
    var age = today.getFullYear() - birthday.getFullYear();

    return (today < thisYearBirthday) ? age-1 : age;
}