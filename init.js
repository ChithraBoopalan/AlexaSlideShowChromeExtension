// This is the 'main' javascript file which starts things on the web page

function pageActionClicked() {
  if (getWebSocketConnection() == null) {
    connectToWebSocketServer();
  } else {
    showConnectionId(getConnectionId());
  }
}

pageActionClicked();
