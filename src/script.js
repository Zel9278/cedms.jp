document.addEventListener("DOMContentLoaded", () => {
    wsChecker();
    changeLangageStr(document.getElementById("comment"), {
        ja: "プログラミングや耳コピなどをしてる人です、結構長くスランプに悩まされています。",
        en:"I'm a programming and making midi guy, and I've been suffering from a slump for quite a while."
    });
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
            elem.innerText = texts.ja;
            break;
    
        default:
            elem.innerText = texts.en;
            break;
    }
}