let changeColor = document.getElementById('changeColor');
let connectToWebsocket = document.getElementById('connectWebSocket');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id, {
        code: 'console.log(document.getElementsByClassName("navigate-right")[0].click())'
      });
  });
};

connectToWebsocket.onclick = function(element) {
  var socket = new WebSocket("ws://localhost:8000");
  socket.onopen = function(event) {
    socket.send("Hi");
  }

  socket.onmessage = function(event) {
    if(event.data == "next") {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id, {
            code: 'console.log(document.getElementsByClassName("navigate-right")[0].click())'
          });
      });
    }
  }
}
