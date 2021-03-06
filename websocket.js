var websocketServer = "";

if (document.location.href.match(/^https/)) {
	websocketServer = "wss://alexaslideshow.hopto.org:8080";
} else {
	websocketServer = "ws://alexaslideshow.hopto.org:8000";
}

// This is set by connectToWebSocketServer()
var socket = null;
// This is set by connectToWebSocketServer()
var connectionId;

function getWebSocketConnection() {
  return socket;
}

function getConnectionId() {
  return connectionId;
}

function connectToWebSocketServer() {
  socket = new WebSocket(websocketServer);

  socket.onopen = function(event) {
    console.log("WebSocket connection opened");
  };

  socket.onmessage = function(event) {
    console.log("WebSocket message: ", event.data);

    var msg = JSON.parse(event.data);
    var resp = {
      id: msg.id,
      action: msg.action,
      success: true
    };

    let closeConectionMadeDialog = true;

    switch (msg.action) {
      case "connected":
        connectionId = msg.connection;
        showConnectionId(connectionId);
        break;
      case "dismissDialog":
        dismissDialog();
        closeConectionMadeDialog = false;
        break;
      case "previous":
        goToPreviousSlide();
        break;
      case "next":
        goToNextSlide();
        break;
      case "goto":
        goToSlide(msg.slideNumber);
        break;
      case "up":
        resp.success = false;
        break;
      case "down":
        resp.success = false;
        break;
      case "left":
        resp.success = false;
        break;
      case "right":
        resp.success = false;
        break;
      case "status":
        resp.status = {
          mainSlides: getNumberOfMainSlides(),
          subSlides: getNumberOfSubSlides(),
          currentMainSlide: getCurrentMainSlide(),
          currentSubSlide: getCurrentSubSlide()
        };
        break;
      case "search":
        let results = searchSlides(msg.searchQuery);
        if (results.length > 0) {
          // Currently, only the first searched slide opened. In the future,
          // users will be allowed to browse through search results.
          goToSlide(results[0].mainSlide, results[0].subSlide);
        } else {
          resp.success = false;
        }
        break;
      case "mark":
        markCurrentSlide();
        break;
      case "gotoMark":
        resp.success = goToLastMarkedSlide();
        break;
      default:
        closeConectionMadeDialog = false;
        console.log("Unspported action received on websocket: ", msg.action);
        resp.success = false;
    }

    if (closeConectionMadeDialog) {
      dismissConnectionMadeDialog();
    }

    // send the response
    socket.send(JSON.stringify(resp));
  };

  socket.onclose = function(event) {
    showDisconnected();
    console.log("Error: WebSocket connection has been closed");
    socket = null;
  };
}
