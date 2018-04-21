var rule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      css: ["div.reveal"]
    })
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()]
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule]);
  });
  chrome.storage.sync.set({
    color: '#3aa757'
  }, function() {
    console.log("The color is green.");
  });

  chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
      file: 'jquery-3.3.1.js'
    });
    chrome.tabs.executeScript({
      file: 'revealjsctrl.js'
    });
  });

  /*
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            hostEquals: 'revealjs.com'
          },
        })],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  */
});
