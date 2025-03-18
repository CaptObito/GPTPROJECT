const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    document.getElementById('price').innerText = `$${parseFloat(data.p).toFixed(2)}`;
};