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

  chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
      // Check if the revealjsInjected variable has been defined
      code: 'typeof revealjsInjected === "undefined"'
    }, function(results) {
      if (results[0]) {
        // Define the revealjsInjected variable so that it can be used to
        // ensure that scripts are injected only once
        chrome.tabs.executeScript({
          code: 'var revealjsInjected = true;'
        });
        chrome.tabs.executeScript({
          file: 'lib/jquery-3.3.1.js'
        });
        chrome.tabs.executeScript({
            file: 'addcss.js'
        });
        chrome.tabs.executeScript({
          file: 'lib/jquery.modal.js'
        });
        chrome.tabs.executeScript({
          file: 'revealjsctrl.js'
        });
        chrome.tabs.executeScript({
          file: 'websocket.js'
        });
      }
    });
  });
});
