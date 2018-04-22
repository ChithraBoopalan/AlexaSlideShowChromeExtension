const websocketServer = "ws://ec2-35-153-209-22.compute-1.amazonaws.com:8000";

var socket = new WebSocket(websocketServer);

socket.onopen = function(event) {
  console.log("WebSocket connection opened");
}

socket.onmessage = function(event) {
  console.log("WebSocket message: ", event.data);

  var msg = JSON.parse(event.data);

  switch (msg.action) {
    case "next":
      break;
    case "previous":
      break;
    case "goto":
      break;
    case "up":
      break;
    case "down":
      break;
    case "status":
      break;
    default:
      console.log("Unspported action received on websocket: ", msg.action);
  }
}

socket.onclose = function(event) {
  console.log("Error: WebSocket connection has been closed");
}
