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

        let jsFiles = [
          'lib/jquery-3.3.1.js',
          'lib/jquery-ui-1.12.1.js',
          'addcss.js',
          'ui.js',
          'revealjsctrl.js',
          'revealjsctrl.js',
          'websocket.js'
        ];

        // Add all Javascript files to the page
        jsFiles.forEach(function(file) {
          chrome.tabs.executeScript({ file: file });
        });
      }
    });
  });
});
