document.addEventListener("DOMContentLoaded", () => {
    const ws = new WebSocket("wss://mpp.cedms.jp:8443");
    const ws_img = document.getElementById("ws");
    ws.onopen= function (e) {
        ws_img.src = "src/images/icons/ws/check.png";
    }    
    ws.onclose = function (e) {
        ws_img.src = "src/images/icons/ws/close.png";
    }
});
