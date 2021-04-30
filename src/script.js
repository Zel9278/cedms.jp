document.addEventListener("DOMContentLoaded", () => {
    wsChecker();
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