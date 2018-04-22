const websocketServer = "ws://localhost:8080";

var socket = new WebSocket(websocketServer);
socket.onopen = function(event) {
}

socket.onmessage = function(event) {
  var msg = JSON.parse(event.data);

  switch(msg.action) {
  }
}
